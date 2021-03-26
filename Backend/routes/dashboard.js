var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var connection = require("./config/index");

router.post("/getHomeDetails", function (req, res, next) {
  jwt.verify(
    req.headers["authorization"],
    toString(req.body.userid),
    function (err, data) {
      if (err) {
        res.send({ status: 403, msg: "Forbidden" });
      } else {
        var d = new Date();
        var Obj = {
          Users: [],
          Banks: [],
          Transaction: [],
          Accounts: [],
        };
        connection.query(
          "SELECT COUNT(*) AS Users FROM user_details WHERE role='user' AND YEAR(created_at) ='" +
            d.getFullYear() +
            "'AND MONTH(created_at)='" +
            d.getMonth() +
            "'",
          function (err, rows) {
            if (!err) Obj.Users.push(rows[0].Users);
            connection.query(
              "SELECT COUNT(*) AS Banks FROM registered_bank WHERE YEAR(created_at) ='" +
                d.getFullYear() +
                "'AND MONTH(created_at)='" +
                d.getMonth() +
                "'",
              function (err, rows) {
                if (!err) Obj.Banks.push(rows[0].Banks);
                connection.query(
                  "SELECT COUNT(*) AS Transaction FROM transaction_details WHERE YEAR(performed_date) ='" +
                    d.getFullYear() +
                    "'AND MONTH(performed_date)='" +
                    d.getMonth() +
                    "'",
                  function (err, rows) {
                    if (!err) Obj.Transaction.push(rows[0].Transaction);
                    connection.query(
                      "SELECT COUNT(*) AS Accounts FROM user_bank_mapping WHERE YEAR(created_at) ='" +
                        d.getFullYear() +
                        "'AND MONTH(created_at)='" +
                        d.getMonth() +
                        "'",
                      function (err, rows) {
                        if (!err) Obj.Accounts.push(rows[0].Accounts);
                        res.send({
                          status: 200,
                          data: Obj,
                          msg: "getAccounts Successfully",
                        });
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    }
  );
});

router.post("/getBankSpecificUserList", function (req, res, next) {
  jwt.verify(
    req.headers["authorization"],
    toString(req.body.userid),
    function (err, data) {
      if (err) {
        res.send({ status: 403, msg: "Forbidden" });
      } else {
        connection.query(
          `SELECT bank.bank,COUNT(admin.id) AS count
      FROM bank_admin_bank_mapping admin
      INNER JOIN registered_bank bank
        ON admin.bank_id = bank.id`,
          function (err, admin) {
            if (err) res.send({ status: 500, err: err });
            else {
              connection.query(
                `SELECT bank.bank,COUNT(user.id) AS count
          FROM user_bank_mapping user
          INNER JOIN registered_bank bank
            ON user.bank_id = bank.id`,
                function (err, user) {
                  if (err) res.send({ status: 500, err: err });
                  else
                    res.send({
                      status: 200,
                      data: { admin, user },
                      msg: "Bank Specific User List Fetched Successfully",
                    });
                }
              );
            }
          }
        );
      }
    }
  );
});

module.exports = router;
