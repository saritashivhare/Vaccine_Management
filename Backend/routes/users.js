var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var connection = require("./config/index");
var nodemailer = require("nodemailer");
var config = require("./mailconfig");
var uuid = require("uuid");

router.post("/validateUser", function (req, res, next) {
  connection.query(
    "SELECT * from user_details where email = ? and password = ? ",
    [req.body.username, req.body.password],
    function (err, rows) {
      if (err) {
        res.send({ status: 500, data: {}, valid_user: false });
      } else {
        if (typeof rows != "undefined" && rows != "" && rows != null) {
          var token = jwt.sign(JSON.stringify(rows[0]), toString(rows[0].id));
          res.send({
            status: 200,
            data: rows[0],
            valid_user: true,
            token: token,
          });
        } else {
          res.send({ status: 500, data: {}, valid_user: false });
        }
      }
    }
  );
});

router.post("/forgetPassword", function (req, res, next) {
  connection.query(
    "SELECT TIMESTAMPDIFF(SECOND ,pudate,NOW()) as tm  from user_details where email = ? and mobile = ?",
    // [req.body.email],
    //connection.query(`SELECT TIME_TO_SEC(pudate) as tm from user_details where email = ? `,
    // connection.query(`SELECT TIME_TO_SEC (pudate) as timee from user_details where email = ? `,
    [req.body.email, req.body.mobile],

    function (err, rows) {
      console.log(req.body.email);
      console.log(req.body.mobile);
      if (err) {
        res.send({
          status: 500,
          data: {},
          msg: "Please provide valid Email and Password",
        });
        console.log(err);
      } else {
        console.log(rows);
        var rs = JSON.parse(JSON.stringify(rows[0]) || "{}");
        console.log(rs.tm);

        // if ((rs.tm >= 1800) == true) {
        if (typeof rows != "undefined" && rows != "" && rows != null) {
          if (rs.tm >= 1800 == true) {
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
            var generator = require("generate-password");

            var password = generator.generate({
              length: 8,
              numbers: true,
            });
            console.log(password);

            // var d = new Date();
            // var link = "http://localhost:8080/#/forgot-password/" + uuid.v4() + "$" + rows[0].id + "$" + d.getHours() + "-" + d.getMinutes() + "$" + d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear()
            var mailOptions = {
              from: "",
              to: req.body.email,
              subject: "Forgot Password Request",
              html: `<p>Hi,<br/>
                      your passwd ${password} </p>`,
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
                console.log("CANNOT SENTTTTT");
                //res.send({ status: 500, data: {} });
              } else {
                console.log("Email sent: " + info.response);
                connection.query(
                  "UPDATE user_details SET password = ? , pudate=now() where email = ?",
                  [password, req.body.email],

                  function (err, rows) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("password success");
                      //res.send({ status: 200, data: rows, msg: 'password updated Successfully' });
                    }
                  }
                );
                res.send({
                  status: 200,
                  data: rows,
                  msg: "Password get success",
                });
                //console.log("SUCCESSSS")
              }
            });

            // } else {
            //   res.send({ status: 500, data: {}, msg: "already sent" });
            // }
          } else {
            res.send({ status: 500, data: {}, msg: "wait for 30 mins an" });
            //console.log("WAIT FOR 30 min after getting passwd ")
          }
        } else {
          res.send({ status: 406, data: {}, msg: "invalid inp" });
        }
      }
    }
  );
});

router.post("/resetPassword", function (req, res, next) {
  if (req.body.changePassword) {
    connection.query(
      "SELECT * from user_details where id = ? ",
      [req.body.userid],
      function (err, rows) {
        if (err) res.send({ status: 500, data: {} });
        else {
          if (typeof rows != "undefined" && rows != "" && rows != null) {
            if (rows[0].password == req.body.oldpassword) {
              connection.query(
                "UPDATE user_details SET password = ? where id = ?",
                [req.body.password, req.body.userid],
                function (err, rows) {
                  if (err) res.send({ status: 500, data: {} });
                  else {
                    if (
                      typeof rows != "undefined" &&
                      rows != "" &&
                      rows != null
                    )
                      res.send({ status: 200, data: {} });
                    else res.send({ status: 500, data: {} });
                  }
                }
              );
            } else res.send({ status: 500, data: {} });
          } else res.send({ status: 500, data: {} });
        }
      }
    );
  } else if (req.body.forgotPassword) {
    connection.query(
      "UPDATE user_details SET password = ? where id = ?",
      [req.body.password, req.body.userid],
      function (err, rows) {
        if (err) res.send({ status: 500, data: {} });
        else {
          if (typeof rows != "undefined" && rows != "" && rows != null)
            res.send({ status: 200, data: {} });
          else res.send({ status: 500, data: {} });
        }
      }
    );
  }
});

router.post("/checkPasswordDate", function (req, res, next) {
  connection.query(
    "SELECT * from user_details  ",

    function (err, rows) {
      if (err) {
        res.send({ status: 403, data: {} });
        console.log("ERROR");
      } else {
        res.send({ status: 200, data: rows, msg: "getdatesuccess" });
      }
    }
  );
});

module.exports = router;
