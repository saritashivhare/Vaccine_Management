var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var connection = require("./config/index");
var uuid = require("uuid");

router.post("/getRegisteredUserList", function (req, res, next) {
  jwt.verify(
    req.headers["authorization"],
    toString(req.body.userid),
    function (err, data) {
      if (err) {
        res.send({ status: 403, msg: "Forbidden" });
      } else {
        if (req.body.months != "") {
          var e = new Date();
          var getDate = e.getDate();
          var getMonth = e.getMonth() + 1;
          var getFullYear = e.getFullYear();

          var y = e.getFullYear(),
            m = e.getMonth() + 1 - req.body.months;
          if (m <= 0) {
            m = m + 12;
            y = y - 1;
          }

          //var a = connection.query("SELECT user_sport_mapping.user_id as id,user_details.first_name,user_details.email,user_details.mobile ,user_sport_mapping.years_age,sports_master.name FROM user_sport_mapping INNER JOIN user_details on user_details.id=user_sport_mapping.user_id INNER JOIN sports_master on sports_master.id=user_sport_mapping.sport_id and user_sport_mapping.created_date between '"+y+"-"+m+"-"+ getDate+"' and '"+ getFullYear+"-"+ getMonth+"-"+ getDate+"'",
          var a = connection.query(
            //  "SELECT vaccine_details.first_name,vaccine_details.last_name,user_id,age,user_id,mobile,email,vname,company_name, DATE_FORMAT(vaccine_details.created_date,'%d-%m-%y') as cddate FROM (((vaccine_details INNER JOIN user_details ON vaccine_details.user_id=user_details.id) INNER JOIN  company_master ON  vaccine_details.company_id=company_master.id) INNER JOIN virus_details ON vaccine_details.vaccine_id=virus_details.id )WHERE DATE(vaccine_details.created_date)BETWEEN '" +
            "SELECT vaccine_details.first_name,vaccine_details.last_name,user_id,age,user_id,mobile,email,vname,company_name, DATE_FORMAT(vaccine_details.created_date,'%d-%m-%y') as cddate FROM ((((vaccine_details INNER JOIN user_details ON vaccine_details.user_id=user_details.id) INNER JOIN  company_master ON  vaccine_details.company_id=company_master.id) INNER JOIN virus_details ON vaccine_details.vaccine_id=virus_details.id ) INNER JOIN comp_admin_mapping ON vaccine_details.company_id=comp_admin_mapping.uid) WHERE DATE(vaccine_details.created_date)BETWEEN '" +
            y +
            "-" +
            m +
            "-" +
            getDate +
            "' and '" +
            getFullYear +
            "-" +
            getMonth +
            "-" +
            getDate +
            "'and comp_admin_mapping.uid=?"
            ,
            [req.body.userid],

            function (err, rows) {
              if (err) {
                res.send({ status: 500, data: a.sql });
              } else {
                res.send({
                  status: 200,
                  data: rows,
                  msg: "List Fetched Successfully ",
                  sql: a.sql,
                });
              }
            }
          );
        } else {
          var e1 = new Date();
          var getDate1 = e1.getDate();
          var getMonth1 = e1.getMonth();

          var getFullYear1 = e1.getFullYear();

          var y1 = e1.getFullYear();
          var m1 = e1.getMonth() + 1;

          var a = connection.query(
            // "SELECT vaccine_details.first_name,vaccine_details.last_name,user_id,age,user_id,mobile,email,vname,company_name, DATE_FORMAT(vaccine_details.created_date,'%d-%m-%y') as cddate FROM (((vaccine_details INNER JOIN user_details ON vaccine_details.user_id=user_details.id) INNER JOIN  company_master ON  vaccine_details.company_id=company_master.id) INNER JOIN virus_details ON vaccine_details.vaccine_id=virus_details.id )WHERE DATE(vaccine_details.created_date)BETWEEN '" +
            "SELECT vaccine_details.first_name,vaccine_details.last_name,user_id,age,user_id,mobile,email,vname,company_name, DATE_FORMAT(vaccine_details.created_date,'%d-%m-%y') as cddate FROM ((((vaccine_details INNER JOIN user_details ON vaccine_details.user_id=user_details.id) INNER JOIN  company_master ON  vaccine_details.company_id=company_master.id) INNER JOIN virus_details ON vaccine_details.vaccine_id=virus_details.id ) INNER JOIN comp_admin_mapping ON vaccine_details.company_id=comp_admin_mapping.uid) WHERE DATE(vaccine_details.created_date)BETWEEN '" +
            y1 +
            "-" +
            getMonth1 +
            "-" +
            getDate1 +
            "' and '" +
            getFullYear1 +
            "-" +
            m1 +
            "-" +
            getDate1 +
            "'and comp_admin_mapping.uid=?", [req.body.userid],
            function (err, rows) {
              if (err) {
                res.send({ status: 500, data: {} });
              } else {
                if (typeof rows != "undefined" && rows != "" && rows != null) {
                  res.send({
                    status: 200,
                    data: rows,
                    msg: "Listsssssssssssssssssssss Fetched Successfully",
                  });
                } else {
                  res.send({ status: 500, data: {} });
                }
              }
            }
          );
        }
      }
    }
  );
});

router.post("/contact", function (req, res, next) {
  var a = connection.query(
    "INSERT INTO  contact_details " +
    " (	name, email, message, added_on)" +
    "VALUES (?,?,?,now())",
    [req.body.cname, req.body.cemail, req.body.cmessage],
    function (error, innerRows) {
      console.log(a.sql);
      if (error) {
        res.send({ status: 500, data: error });
      } else {
        res.send({
          status: 200,
          data: innerRows,
          msg: "Message Sent Successfully",
        });
      }
    }
  );
});

router.post("/upload", function (req, res, next) {
  const birthdate = new Date(req.body.date);
  var getDate = birthdate.getDate();
  var getMonth = birthdate.getMonth() + 1;
  var getFullYear = birthdate.getFullYear();
  if (req.body.update) {
    jwt.verify(
      req.headers["authorization"],
      toString(req.body.userId),
      function (err, data) {
        if (err) {
          res.send({ status: 403, msg: "Forbidden" });
        } else {
          // if (req.files != null) {
          //   var imageName=req.body.profile+".jpg"
          //   const file = req.files.file;
          //   if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/jpg" ){
          //       file.mv(`${__dirname}/../public/uploads/${imageName}`, err => {
          //           if (err) {
          //             console.error(err);
          //             res.send({status:500 , data:{msg:"Image Not Uploaded"}});
          //           }
          //       });
          //   } else {
          //       message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
          //       res.send({status:500 , data:{msg:message}});
          //   }
          // }

          var s =
            "UPDATE user_details SET " +
            "email='" +
            req.body.email +
            "', mobile='" +
            req.body.mobileNo +
            "', alternate_mobile='" +
            req.body.alternateMobileNo +
            "',first_name='" +
            req.body.firstName +
            "', middle_name='" +
            req.body.middleName +
            "', last_name='" +
            req.body.lastName +
            "', address='" +
            req.body.address +
            "', city='" +
            req.body.city +
            "', state='" +
            req.body.state +
            "',country='" +
            req.body.country +
            "', zip_code='" +
            req.body.zip +
            "', date_of_birth='" +
            getDate +
            "',month_of_birth='" +
            getMonth +
            "', year_of_birth='" +
            getFullYear +
            "',modified_at =now() where id='" +
            req.body.userid +
            "'";
          var a = connection.query(s, function (err, rows) {
            if (err) {
              res.send({ status: 500, data: { error: err } });
            } else {
              res.send({
                status: 200,
                data: rows,
                msg: "User Updated Successfully",
              });
            }
          });
        }
      }
    );
  } else {
    const profileID = uuid.v4();
    // if (req.files != null) {
    //   var file = req.files.file;
    //   var imageName=profileID+".jpg"
    //   var imageSize="20X20"
    //   var imageUrl="http://localhost:3000/uploads/"+imageName
    //   if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/jpg" ){
    //       file.mv(`${__dirname}/../public/uploads/${imageName}`, err => {
    //         if (!err) {
    //           var sql = "INSERT INTO `user_profiles`(`id`,`size`,`image`,`url`) VALUES ('" + profileID + "','" + imageSize + "','" + imageName + "','" + imageUrl + "')";
    //           var query = connection.query(sql);
    //         }
    //       });
    //   }
    // }

    var a = connection.query(
      "INSERT INTO  user_details " +
      "( profile, email, password, mobile, alternate_mobile, " +
      "first_name, middle_name, last_name, address, city, state,country, zip_code, date_of_birth, " +
      "month_of_birth, year_of_birth, role, is_active, is_blocked, last_login, created_at,modified_at ) " +
      "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,0,now(),now(),now()) ",
      [
        profileID,
        req.body.email,
        req.body.password,
        req.body.mobileNo,
        req.body.alternateMobileNo,
        req.body.firstName,
        req.body.middleName,
        req.body.lastName,
        req.body.address,
        req.body.city,
        req.body.state,
        req.body.country,
        req.body.zip,
        getDate,
        getMonth,
        getFullYear,
        req.body.role,
      ],
      function (err, rows) {
        if (err) {
          res.send({
            status: 500,
            data: { sql: a.sql, msg: "Enter Corrent Information" },
          });
        } else {
          res.send({ status: 200, msg: "User Registered Successfully" });
        }
      }
    );
  }
});

router.post("/submitRegisteredUser", function (req, res, next) {
  jwt.verify(
    req.headers["authorization"],
    toString(req.body.userid),
    function (err, data) {
      if (err) {
        res.send({ status: 403, msg: "Forbidden" });
      } else {
        var a = connection.query(
          "SELECT * from user_details where id = ?",
          [req.body.userid],
          function (err, rows) {
            if (err) res.send({ status: 500, data: {} });
            else {
              if (typeof rows != "undefined" && rows != "" && rows != null) {
                if (req.body.block == true) {
                  var s =
                    "UPDATE user_details SET is_blocked='1', is_active='0' where id='" +
                    req.body.userid +
                    "'";
                  connection.query(s, function (err, rows) {
                    if (err) res.send({ status: 500, data: { error: err } });
                    else
                      res.send({
                        status: 200,
                        data: rows,
                        msg: "block User Updated Successfully",
                      });
                  });
                } else if (req.body.verify == true) {
                  var s =
                    "UPDATE user_details SET is_blocked='0', is_active='1' where id='" +
                    req.body.userid +
                    "'";
                  connection.query(s, function (err, rows) {
                    if (err) res.send({ status: 500, data: { error: err } });
                    else
                      res.send({
                        status: 200,
                        data: rows,
                        msg: "verify User Updated Successfully",
                      });
                  });
                } else res.send({ status: 200, data: { rows } });
              } else {
                res.send({ status: 500, data: {} });
              }
            }
          }
        );
      }
    }
  );
});

router.post("/submitBankDetailsByUser", function (req, res, next) {
  jwt.verify(
    req.headers["authorization"],
    toString(req.body.userId),
    function (err, data) {
      if (err) {
        res.send({ status: 403, msg: "Forbidden" });
      } else {
        var a = connection.query(
          "INSERT INTO  user_bank_mapping " +
          " (	user_id, bank_id, account_no, is_active, created_at, modified_at)" +
          "VALUES (?,?,?,1,now(),now())",
          [req.body.userId, req.body.bank, req.body.accountNo],
          function (error, innerRows) {
            console.log(a.sql);
            if (error) {
              res.send({ status: 500, data: error });
            } else {
              res.send({
                status: 200,
                data: innerRows,
                msg: "Bank Details Added Successfully",
              });
            }
          }
        );
      }
    }
  );
});

router.post("/getRegisteredUsersBankList", function (req, res, next) {
  jwt.verify(
    req.headers["authorization"],
    toString(req.body.userId),
    function (err, data) {
      if (err) {
        res.send({ status: 403, msg: "Forbidden" });
      } else {
        var a = connection.query(
          "SELECT ubm.id, ubm.is_active, rb.bank, ubm.account_no from user_bank_mapping ubm INNER JOIN registered_bank rb ON ubm.bank_id = rb.id where ubm.user_id = ?",
          [req.body.userId],
          function (err, rows) {
            if (err) {
              res.send({ status: 500, data: {} });
            } else {
              if (typeof rows != "undefined" && rows != "" && rows != null) {
                res.send({
                  status: 200,
                  data: rows,
                  msg: "User Bank List Fetched Successfully",
                });
              } else {
                res.send({ status: 500, data: {} });
              }
            }
          }
        );
      }
    }
  );
});

router.post("/getMasterBankList", function (req, res, next) {
  jwt.verify(
    req.headers["authorization"],
    toString(req.body.userid),
    function (err, data) {
      if (err) {
        res.send({ status: 403, msg: "Forbidden" });
      } else {
        var a = connection.query(
          "SELECT * from registered_bank where is_active = 1",
          function (err, rows) {
            if (err) {
              res.send({ status: 500, data: {} });
            } else {
              if (typeof rows != "undefined" && rows != "" && rows != null) {
                res.send({
                  status: 200,
                  data: rows,
                  msg: "Bank List Fetched Successfully",
                });
              } else {
                res.send({ status: 500, data: {} });
              }
            }
          }
        );
      }
    }
  );
});

router.post("/getState", (req, res, next) => {
  connection.query("SELECT * FROM state_master ", function (err, rows) {
    if (err) {
      res.send({ status: 500, data: {} });
    } else {
      res.send({ status: 200, data: rows, msg: "get Successfully" });
    }
  });
});

router.post("/getCountry", function (req, res, next) {
  connection.query("SELECT * FROM country_master", function (err, rows) {
    if (err) {
      res.send({ status: 403, data: {} });
    } else {
      res.send({ status: 200, data: rows, msg: "getcountrysuccessfull" });
    }
  });
});

router.post("/getCompany", (req, res, next) => {
  //   connection.query("SELECT * FROM company_master where id=?",
  //     [req.body.id],
  //     function (err, rows) {
  //       if (err) {
  //         res.send({ status: 500, data: {} });
  //       } else {
  //         res.send({ status: 200, data: rows, msg: "get Successfully" });
  //       }
  //     });
  // });
  jwt.verify(req.headers['authorization'], toString(req.body.userid), function (err, data) {
    if (err) {
      res.send({ status: 403, msg: 'Forbidden' });
    } else {
      if (req.body.id) {
        connection.query('SELECT * FROM company_master where id = ?', [req.body.id],
          function (err, rows) {
            if (err) {
              res.send({ status: 500, data: {} });
            } else {
              res.send({ status: 200, data: rows, msg: 'getAccounts Successfully' });
            }
          })
      }
      else {
        connection.query('SELECT * FROM company_master',
          function (err, rows) {
            if (err) {
              res.send({ status: 500, data: {} });
            } else {
              res.send({ status: 200, data: rows, msg: 'getAccounts Successfully' });
            }
          })
      }

    }
  })
});

/*

  router.post('/getRegisteredUserList', function(req, res, next) {
    jwt.verify(req.headers['authorization'],toString(req.body.userid),function(err,data){
      if(err){
        res.send({status:403 , msg: 'Forbidden'});
      }else{
      
          if(req.body.months!=""){
            var e=new Date();
            var getDate =e.getDate()
            var getMonth =e.getMonth()+1
            var getFullYear =e.getFullYear()
    
            var y=e.getFullYear(),m=e.getMonth()-req.body.months
            if(m<=0){
              m=m+12
              y=y-1
            }
     // var a = connection.query(` SELECT  user_details.id,user_details.first_name,user_details.middle_name,user_details.last_name,user_details.email,user_details.mobile,user_sport_mapping.years_age,user_sport_mapping.months_age,sports_master.name,specialization_master.name as sname FROM (((user_details INNER JOIN user_sport_mapping ON user_details.id=user_sport_mapping.user_id) INNER JOIN sports_master ON sports_master.id=user_sport_mapping.sport_id) INNER JOIN specialization_master ON specialization_master.sport_id=user_sport_mapping.sport_id)WHERE DATE(created_date)=?`[req.body.months] `GROUP BY user_sport_mapping.id`,
     var a=connection.query(`SELECT  user_details.id,user_details.first_name,user_details.middle_name,user_details.last_name,user_details.email,user_details.mobile,user_sport_mapping.years_age,user_sport_mapping.months_age,sports_master.name,specialization_master.name as sname FROM (((user_details INNER JOIN user_sport_mapping ON user_details.id=user_sport_mapping.user_id) INNER JOIN sports_master ON sports_master.id=user_sport_mapping.sport_id) INNER JOIN specialization_master ON specialization_master.sport_id=user_sport_mapping.sport_id)  GROUP BY user_sport_mapping.id`, 
     function (err, rows) {
          if (err) {
            res.send({status:500 , data:{}});
          } else {
            if(typeof rows != 'undefined' &&  rows != '' &&  rows != null) {
               res.send({status:200 , data: rows, msg: 'Bank List Fetched Successfully'}); 
            }else{
              res.send({status:500 , data:{}});
            }
          }
      })
      }
    }})
  
  });

*/
router.post("/upload1", function (req, res, next) {
  jwt.verify(
    req.headers["authorization"],
    toString(req.body.userId),
    function (err, data) {
      if (err) {
        res.send({ status: 403, msg: "Forbidden" });
      } else {
        var a = connection.query(
          "INSERT INTO  vaccine_details " +
          " (user_id,first_name,last_name,age,address,company_id,vaccine_id,Total_available_count,Amount_per_dose,Total_quantity,Final_amount,gender,created_date,is_active)" +
          "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,now(),1)",
          [req.body.usrid, req.body.firstname, req.body.lastname, req.body.age, req.body.address, req.body.cname, req.body.vname, req.body.vaccine_count, req.body.vaccine_amount, req.body.total_dose, req.body.setFinalamt, req.body.gender],
          function (error, innerRows) {
            console.log(a.sql);
            if (error) {
              res.send({ status: 500, data: error });
            } else {
              res.send({
                status: 200,
                data: innerRows,
                msg: "vaccine details Added Successfully",
              });
            }
          }
        );
      }
    }
  );
});


module.exports = router;
