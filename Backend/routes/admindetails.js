var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var connection = require("./config/index");
var uuid = require("uuid");

router.post("/registerBankByAdmin", function (req, res, next) {
  jwt.verify(
    req.headers["authorization"],
    toString(req.body.userid),
    function (err, data) {
      if (err) {
        res.send({ status: 403, msg: "Forbidden" });
      } else {
        var a = connection.query(
          "INSERT INTO user_sport_mapping " +
            "( user_id, sport_id, years_age, months_age, specialization_id, " +
            "is_active, created_date, updated_date,role_id ) " +
            "VALUES (?,?,?,?,?,1,now(),now(),?) ",
          [
            req.body.userid,
            req.body.sport,
            req.body.years,
            req.body.months,
            req.body.spetialization,
            req.body.role,
          ],
          function (err, rows) {
            if (err) {
              res.send({ status: 500, data: err });
            } else {
              res.send({ status: 200, msg: "User Registered Successfully" });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
