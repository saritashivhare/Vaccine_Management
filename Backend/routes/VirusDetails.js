var express = require("express");
var router = express.Router();
var uuid = require("uuid");
var jwt = require("jsonwebtoken");
var connection = require("./config/index");
var nodemailer = require("nodemailer");
var config = require("./mailconfig");
router.post("/submitTransferMoneyDetails", (req, res, next) => {
  jwt.verify(
    req.headers["authorization"],
    toString(req.body.userid),
    function (err, data) {
      if (err) {
        res.send({ status: 403, msg: "Forbidden" });
      } else {
        var fromBal, toBal;
        var transactionId = uuid.v4();

        connection.query(
          "INSERT INTO transaction_details " +
            "( transaction_id,  mode_of_transfer, type_of_transfer,from_account,to_account, amount,from_bank_id,  to_bank_id, from_user_id, to_user_id, performed_date, is_pending, is_cancelled, is_approved,  performed_by ) " +
            "VALUES (?,?,0,?,?,?,?,?,?,?,now(),1,0,0,?) ",
          [
            transactionId,
            req.body.mode,
            req.body.from,
            req.body.to,
            req.body.amount,
            req.body.frombankid,
            req.body.tobankid,
            req.body.userid,
            req.body.touserid,
            req.body.userid,
          ],
          function (err, rows) {
            if (err) res.send({ status: 500, data: { err } });
            else {
              connection.query(
                "SELECT * FROM user_bank_mapping where user_id = ? and  account_no=?",
                [req.body.userid, req.body.from],
                function (err, row) {
                  if (err) res.send({ status: 500, data: err });
                  else {
                    if (row[0].available_balance > req.body.amount)
                      fromBal =
                        parseInt(row[0].available_balance) -
                        parseInt(req.body.amount);
                    connection.query(
                      "SELECT * FROM user_bank_mapping where account_no = ?",
                      [req.body.to],
                      function (err, row2) {
                        if (err) res.send({ status: 500, data: err });
                        else {
                          toBal =
                            parseInt(row2[0].available_balance) +
                            parseInt(req.body.amount);
                          var fromsql =
                            "UPDATE user_bank_mapping SET available_balance='" +
                            fromBal +
                            "' WHERE account_no='" +
                            req.body.from +
                            "'";
                          var tosql =
                            "UPDATE user_bank_mapping SET available_balance='" +
                            toBal +
                            "' WHERE account_no='" +
                            req.body.to +
                            "'";
                          var transactionsql =
                            "UPDATE transaction_details SET is_pending='0', is_cancelled='0',  is_approved='1' WHERE transaction_id='" +
                            transactionId +
                            "'";
                          connection.query(fromsql, function (err) {
                            if (err) res.send({ status: 500, data: err });
                            else
                              connection.query(tosql, function (err) {
                                if (err) res.send({ status: 500, data: err });
                                else
                                  connection.query(
                                    transactionsql,
                                    function (err) {
                                      if (err)
                                        res.send({ status: 500, data: err });
                                      else
                                        res.send({
                                          status: 200,
                                          data: {},
                                          msg:
                                            "transaction_details Successfully",
                                        });
                                    }
                                  );
                              });
                          });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

router.post("/getAccounts", (req, res, next) => {
  jwt.verify(
    req.headers["authorization"],
    toString(req.body.userid),
    function (err, data) {
      if (err) {
        res.send({ status: 403, msg: "Forbidden" });
      } else {
        connection.query(
          "SELECT * FROM user_bank_mapping where user_id = ?",
          [req.body.userid],
          function (err, rows) {
            if (err) {
              res.send({ status: 500, data: {} });
            } else {
              res.send({
                status: 200,
                data: rows,
                msg: "getAccounts Successfully",
              });
            }
          }
        );
      }
    }
  );
});

router.post("/searchAccount", (req, res, next) => {
  jwt.verify(
    req.headers["authorization"],
    toString(req.body.userid),
    function (err, data) {
      if (err) {
        res.send({ status: 403, msg: "Forbidden" });
      } else {
        connection.query(
          "SELECT * FROM user_bank_mapping where account_no = ?",
          [req.body.accno],
          function (err, rows) {
            console.log(rows.length);
            if (err || rows.length == 0) {
              res.send({ status: 500, data: {} });
            } else {
              res.send({
                status: 200,
                data: rows,
                msg: "searchAccount Successfully",
              });
            }
          }
        );
      }
    }
  );
});

router.post("/getMysport", (req, res, next) => {
  jwt.verify(
    req.headers["authorization"],
    toString(req.body.userid),
    function (err, data) {
      if (err) {
        res.send({ status: 403, msg: "Forbidden" });
      } else {
        var a = connection.query(
          `SELECT sports_master.name, specialization_master.name as sname, DATE_FORMAT(user_sport_mapping.created_date,'%d-%m-%y') as cddate  FROM ((specialization_master INNER JOIN user_sport_mapping ON specialization_master.id=user_sport_mapping.specialization_id) INNER JOIN sports_master ON specialization_master.sport_id=sports_master.id) WHERE user_id=?`,
          [req.body.userid],
          function (err, rows) {
            console.log("!!!!!!!!!!!!!1");
            console.log(a.sql);
            if (err) {
              res.send({ status: 500, data: {} });
            } else {
              res.send({
                status: 200,
                data: rows,
                msg: "getMysport Successfully",
              });
            }
          }
        );
      }
    }
  );
});

router.post("/getSports", (req, res, next) => {
  jwt.verify(
    req.headers["authorization"],
    toString(req.body.userid),
    function (err, data) {
      if (err) {
        res.send({ status: 403, msg: "Forbidden" });
      } else {
        connection.query("SELECT * FROM sports_master", function (err, rows) {
          if (err) {
            res.send({ status: 500, data: {} });
          } else {
            res.send({
              status: 200,
              data: rows,
              msg: "getAccounts Successfully",
            });
          }
        });
      }
    }
  );
});

router.post("/getVirus", (req, res, next) => {
  jwt.verify(
    req.headers["authorization"],
    toString(req.body.userid),
    function (err, data) {
      if (err) {
        res.send({ status: 403, msg: "forbidden" });
      } else {
        connection.query("SELECT * FROM virus_details", function (err, rows) {
          if (err) {
            res.send({ status: 500, data: {} });
          } else {
            res.send({
              status: 200,
              data: rows,
              msg: "Virus Fetched successfully",
            });
          }
        });
      }
    }
  );
});

// router.post("/getcompany", (req, res, next) => {
//   connection.query("SELECT * FROM company_master where id=?", [req.body.id], function (err, rows) {
//     if (err) {
//       res.send({ status: 500, data: {} });
//     } else {
//       res.send({ status: 200, data: rows, msg: "get Successfully" });
//     }
//   });
// });

router.post("/getSpetialization", (req, res, next) => {
  jwt.verify(
    req.headers["authorization"],
    toString(req.body.userid),
    function (err, data) {
      if (err) {
        res.send({ status: 403, msg: "Forbidden" });
      } else {
        if (req.body.sport_id) {
          connection.query(
            "SELECT * FROM specialization_master where sport_id = ?",
            [req.body.sport_id],
            function (err, rows) {
              if (err) {
                res.send({ status: 500, data: {} });
              } else {
                res.send({
                  status: 200,
                  data: rows,
                  msg: "getAccounts Successfully",
                });
              }
            }
          );
        } else {
          connection.query(
            "SELECT * FROM specialization_master",
            function (err, rows) {
              if (err) {
                res.send({ status: 500, data: {} });
              } else {
                res.send({
                  status: 200,
                  data: rows,
                  msg: "getAccounts Successfully",
                });
              }
            }
          );
        }
      }
    }
  );
});
router.post("/getVcount", (req, res, next) => {
  connection.query(
    "SELECT available_count,amount_per_dose from vaccine_available_count where vaccine_id=? ",
    [req.body.vid],
    //[req.body.id],
    function (err, rows) {
      if (err) {
        res.send({ status: 500, data: {} });
      } else {
        res.send({ status: 200, data: rows, msg: "get Successfully" });
      }
    }
  );
});
router.post("/getList", (req, res, next) => {
  connection.query(
    "Select vname,company_name,Total_quantity,Final_amount, DATE_FORMAT(vaccine_details.created_date,'%d-%m-%y') as cddate  FROM ((vaccine_details INNER JOIN  company_master ON  vaccine_details.company_id=company_master.id) INNER JOIN virus_details ON vaccine_details.vaccine_id=virus_details.id) WHERE user_id=?",
    [req.body.userid],
    //[req.body.id],
    function (err, rows) {
      if (err) {
        res.send({ status: 500, data: {} });
      } else {
        res.send({ status: 200, data: rows, msg: "get Successfully" });
      }
    }
  );
});

router.post("/Paymentmail", (req, res, next) => {
  let amt = req.body.final_amount;
  let amtperdose = req.body.amountperdose;
  if (req.body.userid) {
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: config.Mailconfig.emailid,
        pass: config.Mailconfig.passwd,
      },
    });
    var mailOptions = {
      from: config.Mailconfig.emailid,
      to: req.body.email,
      subject: "order vaccine Request",
      html: `<p>Hi,<br/>
              your vaccine order submitted Total amount ${amt} and amountper dose is ${amtperdose} </p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        console.log("CANNOT SENTTTTT");
        //res.send({ status: 500, data: {} });
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    data1 = "Successfull";
    res.send({ status: 200, data: data1, msg: "Successssssssssssssssss" });
  } else {
    res.send({
      status: 400,
      data: data1,
      msg: "nottttttttttttttttttSuccessssssssssssssssss",
    });
  }
});
module.exports = router;
