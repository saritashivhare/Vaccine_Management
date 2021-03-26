import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { payment, Paymentmail } from "../../actions";
import { useHistory } from "react-router";
import {
  Input,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import { Form } from "react-bootstrap";

export default function Payment({ payment, paymentParams, Paymentmail, Paymentmailsuccess }) {
  const [sport, setSport] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [spetialization, setSpetialization] = useState("");
  // const [location, setLocation] = useState("");
  const [paymentFail, setPaymentFail] = useState("notsuccess");
  const [paymentsuccess, setPaymentsuccess] = useState("Success");

  var paybutton,
    history = useHistory();
  if (history.location.pathname == "/payment/500") {
    paybutton = (
      <Card className="bg-danger shadow card-stats mb-4 mb-xl-0">
        <CardBody>
          <Row>
            <div className="col">
              <CardTitle
                tag="h5"
                className="text-white text-center text-uppercase text-muted mb-0"
              >
                PAYMENT UNSUCSSESFULL
                <br />
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleSubmit}
                >
                  Try Again
                </button>
              </CardTitle>
            </div>
          </Row>
        </CardBody>
      </Card>

    )

    localStorage.setItem("paymentin", paymentFail);
  } else if (history.location.pathname == "/payment/200") {
    paybutton = (
      //   <button
      //   type="button"
      //   className="btn btn-dark"
      //   disable
      // >
      //   Payment Sucssesfull
      // </button>
      <Card className="bg-success shadow card-stats mb-4 mb-xl-0">
        <CardBody>
          <Row>
            <div className="col">
              <CardTitle
                tag="h5"
                className="text-white text-center text-uppercase text-muted mb-0"
              >
                PAYMENT SUCSSESFULL
              </CardTitle>
            </div>
          </Row>
        </CardBody>
      </Card>

    )

    //  alert(JSON.stringify(pdata1))


    setPaymentsuccess("success")
    localStorage.setItem('paymentin', paymentsuccess);
    history.push('/list');

  } else {
    paybutton = (
      <button type="button" className="btn btn-dark" onClick={handleSubmit}>
        Pay Rs.250 Only
      </button>
    );
  }

  var validateMsgValid = (
    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
  );
  var validateMsgInvalid = (
    <Form.Control.Feedback type="invalid">
      Please provide a valid Input.
    </Form.Control.Feedback>
  );

  function handleSubmit(e) {
    e.preventDefault();
    // var txn_url = "https://securegw-stage.paytm.in/order/process";
    var data = {
      userid: localStorage.getItem("userid"),
      email: localStorage.getItem("email"),
      mobile: localStorage.getItem("mobile"),
    };

    payment(data, localStorage.getItem("token"));

  }

  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  function isObj(val) {
    return typeof val === "object";
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  }

  function buildForm({ action, params }) {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  }

  function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  }

  useEffect(() => {
    if (paymentParams) {
      var parametrs = paymentParams.data;
      parametrs["CHECKSUMHASH"] = paymentParams.checksum;
      var details = {
        action: "https://securegw-stage.paytm.in/order/process",
        params: parametrs,
      };
      post(details);
    }
  }, [paymentParams]);




  const [isSubmit, setIsSubmit] = useState();
  const [Class, SetClass] = useState();
  const [Msg, SetMsg] = useState();
  const [Notification, SetNotification] = useState(false);
  const NotificationClose = () => SetNotification(false);
  const NotificationShow = () => SetNotification(true);
  function NotificationModel(Class, Msg) {
    SetClass(Class);
    SetMsg(Msg);
    NotificationShow();
    setTimeout(function () {
      NotificationClose();
    }, 5000);
  }

  React.useEffect(() => { }, []);

  return (
    <div className="py-5 " style={{ "background-color": "#333333" }}>
      <Container className="mt-5">
        <Row>
          <Col lg="12">
            <Card
              className="shadow card-stats mb-4 mb-xl-0"
              style={{ "background-color": "#E92929" }}
            >
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-white text-uppercase text-muted mb-0"
                    >
                      Users Details
                    </CardTitle>
                    <hr />
                    <span className="mt-3 text-white font-weight-bold mb-0">
                      {"Username : " + localStorage.getItem("firstname")}
                      {/* {" " + localStorage.getItem("middle_name")} */}
                      {" " + localStorage.getItem("lastname")}
                      <br />
                      {"Email : " + localStorage.getItem("email")}
                      <br />
                      {"Mobile : " + localStorage.getItem("mobile")}
                      <br />
                    </span>
                  </div>
                  <hr />
                  {paybutton}
                </Row>
                {/* <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-white text-nowrap">Since last month</span>
                      </p> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapDispatchToProps = {
  payment: payment,
  Paymentmail: Paymentmail
};

const mapStateToProps = (state) => ({
  paymentParams: state.paymentParams,
  Paymentmailsuccess: state.Paymentmailsuccess
});

Payment = connect(mapStateToProps, mapDispatchToProps)(Payment);
