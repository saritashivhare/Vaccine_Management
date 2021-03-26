const { json } = require("body-parser");
var express = require("express");
var router = express.Router();
const checksum_lib = require("./checksum/checksum.js");
const config = require("./checksum/config.js");
var connection = require("./config/index");

/* GET home page. */
router.post("/payment", function (req, res, next) {
  var params = {};
  params["MID"] = "vGyBYF82217420538912";
  params["WEBSITE"] = "WEBSTAGING";
  params["CHANNEL_ID"] = "WEB";
  params["INDUSTRY_TYPE_ID"] = "Retail";
  params["ORDER_ID"] = "TEST_" + new Date().getTime();
  params["CUST_ID"] = req.body.userid;
  params["TXN_AMOUNT"] = "250.00";
  params["CALLBACK_URL"] =
    "http://localhost:3000/payment/callback/" + req.body.userid;
  params["EMAIL"] = req.body.email;
  params["MOBILE_NO"] = req.body.mobile;

  checksum_lib.genchecksum(
    params,
    "U1xr9%6Y17#_CXW4",
    function (err, checksum) {
      res.send({ status: 200, data: params, checksum: checksum });
    }
  );
});

router.post("/callback/:id", (req, res) => {
  console.log(req.body);

  var result = checksum_lib.verifychecksum(
    req.body,
    config.PaytmConfig.key,
    req.body.CHECKSUMHASH
  );
  return new Promise((resolve, reject) => {
    if (result) {
      resolve(req.body);
      // res.send(req.body)
       console.log("---------------------------------------------------");
       console.log(req.params.id)
      var a = connection.query(
        "INSERT INTO  transaction_details " +
          "( user_id, transaction_id, bank_txn_id, order_id, amount, " +
          "status, txn_type, gateway_name, response_code, response_msg, bank_name, mid, payment_mode, " +
          "refund_amount, transaction_date ) " +
          "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ",
        [
          req.params.id,
          req.body.TXNID,
          req.body.BANKTXNID,
          req.body.ORDERID,
          req.body.TXNAMOUNT,
          req.body.STATUS,
          req.body.TXNTYPE,
          req.body.GATEWAYNAME,
          req.body.RESPCODE,
          req.body.RESPMSG,
          req.body.BANKNAME,
          req.body.MID,
          req.body.PAYMENTMODE,
          req.body.REFUNDAMT,
          req.body.TXNDATE,
        ]

        // function (err, rows) {
        //   // console.log(a.sql)
        //   if (err) {
        //     // throw err

        //   } else {
        //     res.redirect('http://localhost:8080/#/payment/200');
        //   }
        // }
      );

      if (req.body.STATUS == "TXN_SUCCESS") {
        return res.redirect("http://localhost:8080/#/payment/200");
      } else {
        return res.redirect("http://localhost:8080/#/payment/500");
      }
    } else {
      // console.log("checksum not match");
      return reject("ERROR");
    }
  });
});

module.exports = router;
