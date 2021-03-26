import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  registerBankByAdmin,
  getState,
  getVirus,
  getSports,
  getSpetialization,
  submitRegisteredUser,
  getCompany,
  getVcount,
  payment,
  Paymentmail
} from "../../actions";
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
import Cardv from "../Vaccinecarddetails/index";

export default function VaccineDetails({
  registerBankByAdmin,
  registeredBankDetailsByAdmin,
  getVirus,
  getVirussuccess,
  getSports,
  getSportsSucsses,
  getSpetializationSucsses,
  getSpetialization,
  submitRegisteredUser,
  submitRegisteredUserSucsses,
  getState,
  getstatesucces,
  getCompany,
  getcompanysuccess,
  getVcount, getVcountsuccess,
  Paymentmail, Paymentmailsuccess
}) {
  const [sport, setSport] = useState("");
  const [role, setRole] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [spetialization, setSpetialization] = useState("");
  const [showcard, setshowcard] = useState(false);
  const [cname, setCname] = useState("");

  let vaccine_count = {};
  let vaccine_amount = {};

  // const [location, setLocation] = useState("");
  var history = useHistory();
  var validateMsgValid = (
    // <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    <div></div>
  );
  var validateMsgInvalid = (
    <Form.Control.Feedback type="invalid">
      Please provide a valid Input.
    </Form.Control.Feedback>
  );

  useEffect(() => {
    getSports(
      { userid: localStorage.getItem("userid") },

      localStorage.getItem("token")
    );
    submitRegisteredUser(
      { userid: localStorage.getItem("userid") },
      localStorage.getItem("token")
    );
    getVirus(
      { userid: localStorage.getItem("userid") },
      localStorage.getItem("token")
    );
    // Paymentmail(
    //   { userid: localStorage.getItem("userid") },
    //   localStorage.getItem("token")
    // );

  }, []);

  const [first_name, setfirst_name] = useState();
  const [middle_name, setmiddle_name] = useState();
  const [last_name, setlast_name] = useState();
  const [email, setemail] = useState();
  const [mobile, setmobile] = useState();

  React.useEffect(() => {
    if (submitRegisteredUserSucsses)
      if (submitRegisteredUserSucsses.status == 200) {
        setfirst_name(submitRegisteredUserSucsses.data.rows[0].first_name);
        setmiddle_name(submitRegisteredUserSucsses.data.rows[0].middle_name);
        setlast_name(submitRegisteredUserSucsses.data.rows[0].last_name);
        setemail(submitRegisteredUserSucsses.data.rows[0].email);
        setmobile(submitRegisteredUserSucsses.data.rows[0].mobile);
      }
  }, [submitRegisteredUserSucsses]);
  const [vcountdata, setVcountdata] = useState();

  React.useEffect(() => {
    if (getVcountsuccess)
      if (getVcountsuccess.status == 200) {
        setVcountdata(getVcountsuccess.data);
      }
  }, [getVcountsuccess]);

  // const [pdata1, setPData1] = useState();
  // React.useEffect(() => {
  //   if (Paymentmailsuccess) {

  //     if (Paymentmailsuccess.status == 200) {
  //       console.log("Paymentmailsuccess");
  //       setPData1(Paymentmailsuccess.data);
  //       console.log(setPData1)
  //     }
  //   }
  // }, [Paymentmailsuccess]);


  const [data1, setdata1] = useState();

  React.useEffect(() => {
    if (getSportsSucsses)
      if (getSportsSucsses.status == 200) {
        setdata1(getSportsSucsses.data);
      }
  }, [getSportsSucsses]);

  const [data2, setdata2] = useState();

  React.useEffect(() => {
    if (getSpetializationSucsses)
      if (getSpetializationSucsses.status == 200) {
        setdata2(getSpetializationSucsses.data);
      }
  }, [getSpetializationSucsses]);

  const [virusdata, setVirusdata] = useState();
  React.useEffect(() => {
    if (getVirussuccess)
      if (getVirussuccess.status == 200) {
        setVirusdata(getVirussuccess.data);
      }
  }, [getVirussuccess]);

  const [data, setdata] = useState();
  React.useEffect(() => {
    if (getstatesucces)
      if (getstatesucces.status == 200) {
        setdata(getstatesucces.data);
      }
  }, [getstatesucces]);

  const [data3, setdata3] = useState();
  React.useEffect(() => {
    if (getcompanysuccess)
      if (getcompanysuccess.status == 200) {
        setdata3(getcompanysuccess.data);
      }
  }, [getcompanysuccess]);

  // function function1() {
  //   // setshowcard = true;
  //   setshowcard = true
  // }
  const fn1 = () => {
    // alert(JSON.stringify(pdata1))
    setshowcard(true)
    // getCompany(
    //   { userid: localStorage.getItem("userid") },

    //   localStorage.getItem("token")
    // );

  }
  function handleSubmit(e) {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      var data = {
        userid: localStorage.getItem("userid"),
        sport: sport,
        years: years,
        role: role,
        months: months,
        spetialization: spetialization,
        cname: cname,
        // cid: cid
        // "location":location,
      };
      var countdata = {
        vid: vid
      };
      //registerBankByAdmin(data, localStorage.getItem("token"));
      getVcount(
        countdata, localStorage.getItem("token")
      );

    }
    setIsSubmit(true);
  }
  const [isSubmit, setIsSubmit] = useState();
  const [vid, setVid] = useState();
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
  React.useEffect(() => {



    localStorage.setItem("companyid", cname);
    localStorage.setItem("virusid", role);
  });
  React.useEffect(() => {
    if (registeredBankDetailsByAdmin)
      if (isSubmit) {
        if (registeredBankDetailsByAdmin.status == 200) {
          localStorage.setItem("first_name", first_name);
          localStorage.setItem("last_name", last_name);
          localStorage.setItem("middle_name", middle_name);
          localStorage.setItem("email", email);
          localStorage.setItem("mobile", mobile);

          // NotificationModel("bg-success", "User Added Sucssesfully");
          setRole("");
          setSport("");
          setYears("");
          setMonths("");
          setSpetialization("");
          setCname("");
          // setLocation("");
          history.push("/payment");
        } else {
          NotificationModel("bg-danger", "Bank Not Added");
        }
        setIsSubmit(false);
      }
  }, [registeredBankDetailsByAdmin]);

  return (
    <div className="py-5 " style={{ "background-color": "#333333" }}>
      <Modal
        className="modal-dialog modal-danger"
        contentClassName={Class}
        isOpen={Notification}
        toggle={NotificationClose}
      >
        <div className="modal-header">
          <div className="mt-1 modal-title heading">{Msg}</div>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={NotificationClose}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
      </Modal>

      <Container className="mt-5">
        <Row>
          <Col lg="6">
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
                      {"Username : " + first_name}
                      {" " + middle_name}
                      {" " + last_name}
                      <br />
                      {"Email : " + email}
                      <br />
                      {"Mobile : " + mobile}
                      <br />
                    </span>
                  </div>
                </Row>
                {/* <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-white text-nowrap">Since last month</span>
                      </p> */}
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <div class="bg-secondary shadow card">
              <div className="card-body">
                <div className="mb-3">
                  <small className="text-uppercase font-weight-bold">
                    Vaccine Details
                  </small>
                </div>

                <Form noValidate validated={isSubmit} onSubmit={handleSubmit}>
                  <Row>
                    <Form.Group as={Col} lg="12" sm="12">
                      <Input
                        required
                        value={role}
                        className="form-control-alternative"
                        type="select"
                        placeholder="Select virus name"
                        onChange={(e) => {
                          setRole(e.target.value)
                          setVid(e.target.value)
                          getCompany({
                            id: e.target.value,

                            userid: localStorage.getItem("userid"),
                          },
                            localStorage.getItem("token")
                          );

                        }}
                      >
                        <option value="">Select Virus Preventive</option>
                        {virusdata
                          ? virusdata.map((item) => (
                            <option value={item.id}>{item.vname}</option>
                          ))
                          : "not available"}
                      </Input>
                      {validateMsgValid}
                      {validateMsgInvalid}
                    </Form.Group>
                  </Row>

                  {/* <Row>
                    <Form.Group as={Col} lg="12" sm="12">
                      <Input
                        required
                        value={sport}
                        className="form-control-alternative"
                        type="select"
                        placeholder="Select Sport"
                        onChange={(e) => {
                          setSport(e.target.value);
                          getSpetialization(
                            {
                              sport_id: e.target.value,
                              userid: localStorage.getItem("userid"),
                            },
                            localStorage.getItem("token")
                          );
                        }}
                      >
                        <option value="">Select Sport</option>
                        {data1
                          ? data1.map((item) => (
                              <option value={item.id}>{item.name}</option>
                            ))
                          : "Not Available"}
                      </Input>
                      {validateMsgValid}
                      {validateMsgInvalid}
                    </Form.Group>
                  </Row> */}
                  {/* <Row>
                    <Form.Group as={Col} lg="6" sm="6">
                      <Input
                        required
                        value={years}
                        className="form-control-alternative"
                        type="text"
                        placeholder="Enter Age Years"
                        onChange={(e) => setYears(e.target.value)}
                      />
                      {validateMsgValid}
                      {validateMsgInvalid}
                    </Form.Group>

                    <Form.Group as={Col} lg="6" sm="6">
                      <Input
                        required
                        value={months}
                        className="form-control-alternative"
                        type="text"
                        placeholder="Enter Age Months"
                        onChange={(e) => setMonths(e.target.value)}
                      />
                      {validateMsgValid}
                      {validateMsgInvalid}
                    </Form.Group>
                  </Row> */}
                  <Row>
                    <Form.Group as={Col} lg="12" sm="12">
                      <Input
                        required
                        value={cname}
                        className="form-control-alternative"
                        type="select"
                        placeholder="Select Spetialization"
                        onChange={(e) => {
                          setCname(e.target.value)


                        }}
                      >
                        <option value="">Select Company</option>
                        {data3
                          ? data3.map((item) => (
                            <option value={item.id}>{item.company_name}</option>
                          ))
                          : "Not Available"}
                      </Input>
                      {validateMsgValid}
                      {validateMsgInvalid}
                    </Form.Group>
                  </Row>



                  <br></br>

                  <Button color="danger" type="submit" className="" onClick={fn1}>
                    View Details
                  </Button>

                </Form>
              </div>
            </div>

          </Col>
        </Row><br></br>
        {/* <div style={{}}> */}
        <Col>
          <Row>
            {
              vcountdata
                ? vcountdata.map((item) => {


                  vaccine_count.a = item.available_count;
                  vaccine_amount.b = item.amount_per_dose;
                  console.log(vaccine_count.a);
                })


                : ""
            }

            {(showcard == true ? <Cardv countv={vaccine_count.a} amount={vaccine_amount.b} /> : "")}
            {/* {console.log(showcard)} */}
          </Row>
        </Col>
        {/* </div> */}
      </Container>

    </div>
  );
}

const mapDispatchToProps = {
  registerBankByAdmin: registerBankByAdmin,
  getVirus: getVirus,
  getSports: getSports,
  getSpetialization: getSpetialization,
  submitRegisteredUser: submitRegisteredUser,
  getState: getState,
  getCompany: getCompany,
  getVcount: getVcount,
  Paymentmail: Paymentmail
};

const mapStateToProps = (state) => ({
  registeredBankDetailsByAdmin: state.registeredBankDetailsByAdmin,
  getVirussuccess: state.getVirussuccess,
  getSportsSucsses: state.getSportsSucsses,
  getSpetializationSucsses: state.getSpetializationSucsses,
  submitRegisteredUserSucsses: state.registeredUserDetails,
  getstatesucces: state.getstatesucces,
  getcompanysuccess: state.getcompanysuccess,
  getVcountsuccess: state.getVcountsuccess,
  Paymentmailsuccess: state.Paymentmailsuccess
});

VaccineDetails = connect(mapStateToProps, mapDispatchToProps)(VaccineDetails);
