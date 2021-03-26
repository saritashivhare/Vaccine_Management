import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { checkLoginDetails } from "../../actions";
import axios from "axios";
import {
  Button,
  CardImg,
  Card,
  CardHeader,
  CardBody,
  Input,
  Container,
  Row,
  Col,
  Modal,
} from "reactstrap";
import { Form } from "react-bootstrap";

import { useHistory } from "react-router";

export default function Login({ checkLoginDetails, LoginDetails }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmit, setIsSubmit] = useState();

  var history = useHistory();
  var validateMsgValid = (
    <div></div>
    // <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
  );
  var validateMsgInvalid = (
    <Form.Control.Feedback type="invalid">
      Please provide a valid Input.
    </Form.Control.Feedback>
  );

  useEffect(() => {
    if (LoginDetails) {
      if (LoginDetails.valid_user) {
        localStorage.setItem("token", LoginDetails.token);
        localStorage.setItem("firstname", LoginDetails.data.first_name);
        localStorage.setItem("lastname", LoginDetails.data.last_name);
        localStorage.setItem("lastlogin", LoginDetails.data.last_login);
        localStorage.setItem("role", LoginDetails.data.role);
        localStorage.setItem("userid", LoginDetails.data.id);
        localStorage.setItem("email", LoginDetails.data.email);
        if (LoginDetails.data.role === "super_user") {
          history.push("/player-list");
        } else if (LoginDetails.data.role === "user") {
          history.push("/vaccine-details");
        }
        // else if(LoginDetails.data.role === 'bank_admin'){
        //     history.push("/customer-list");
        // }
      } else {
        setEmail("");
        setPassword("");
        NotificationModel("bg-danger", "Incorrect Credentials");
      }
    }
  }, [LoginDetails]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmit(true);
    if (e.currentTarget.checkValidity()) {
      checkLoginDetails({
        username: email,
        password: password,
      });
    }
  }

  const [cemail, setcemail] = useState("");
  const [cname, setcname] = useState("");
  const [cmessage, setcmessage] = useState("");

  function handleContact(e) {
    e.preventDefault();
    const profiledata = new FormData();
    profiledata.append("cemail", cemail);
    profiledata.append("cname", cname);
    profiledata.append("cmessage", cmessage);
    axios
      .post(
        "http://localhost:3000/registereduserdetails/contact",
        profiledata,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(function (response) {
        if (response.data.status == 200) {
          NotificationModel("bg-success", response.data.msg);
          setcemail("");
          setcname("");
          setcmessage("");
        } else {
          NotificationModel("bg-danger", response.data.msg);
        }
        setIsSubmit(false);
      })
      .catch(function (error) {
        console.log(error);
        NotificationModel("bg-danger", "Server Error");
      });
  }

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

  return (
    <main>
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
          ></button>
        </div>
      </Modal>
      <div className="position-relative">
        <section className="section section-shaped pb-150">
          <div
            className="shape shape-style-1"
            style={{ "background-color": "#98FB98" }}
          >
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="py-lg-md d-flex">
            <div className="col px-0">
              <Row>
                <Col lg="6">
                  <Card className="bg-secondary shadow border-0 mt-5 floating">
                    <CardHeader className="bg-white">
                      <div className="text-muted text-center">
                        <h2>Sign in with</h2>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                      <Form
                        noValidate
                        validated={isSubmit}
                        onSubmit={handleSubmit}
                        role="form"
                      >
                        <Form.Group className="mb-3">
                          <i className="ni ni-email-83" />
                          <Input
                            className="form-control-alternative"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            type="email"
                          />
                          {validateMsgValid}
                          {validateMsgInvalid}
                        </Form.Group>
                        <Form.Group>
                          <i className="ni ni-lock-circle-open" />
                          <Input
                            className="form-control-alternative"
                            required
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {validateMsgValid}
                          {validateMsgInvalid}
                        </Form.Group>
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id=" customCheckLogin"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor=" customCheckLogin"
                          >
                            <span>Remember me</span>
                          </label>
                        </div>
                        <div className="text-center">
                          <Button className="my-4" color="danger" type="submit">
                            Sign in
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      <a className="text-light" href="/#/forgot-password">
                        <small style={{ color: "#000000" }}>
                          Forgot password?
                        </small>
                      </a>
                    </Col>
                    <Col className="text-right" xs="6">
                      <a className="text-light" href="/#/register">
                        <small style={{ color: "#000000" }}>
                          Create new account
                        </small>
                      </a>
                    </Col>
                  </Row>
                </Col>
                <Col lg="6">
                  <img
                    alt="..."
                    className="img-fluid"
                    src={require("../../assets/img/img-1.png")}
                  />
                </Col>
              </Row>
            </div>
          </Container>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-dark" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
      </div>
      <section className="section bg-dark">
        <Container>
          <Row className="row-grid align-items-center">
            <Col className="order-md-2" md="6">
              <img
                alt="..."
                className="img-fluid floating"
                src={require("../../assets/img/img-2.png")}
              />
            </Col>
            <Col className="order-md-1" md="6">
              <div className="pr-md-5">
                <h3 className="text-danger font-weight-bold">
                  WE ARE HERE NOT ONLY FOR VACCINATION, BUT ALSO FOR
                  SAVING AND PROTECTING PERSONAL AND SOCIETAL HEALTH.
                </h3>
                <hr />
                <ul className="list-unstyled mt-5">
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <h5 className="text-white mb-0 font-weight-light">
                      A vaccine is a biological preparation that provides active acquired immunity 
                      to a particular infectious disease. A vaccine typically contains an agent 
                      that resembles a disease-causing microorganism and is often made from weakened 
                      or killed forms of the microbe, its toxins, or one of its surface proteins.
                      The agent stimulates the body's immune system to recognize the agent as a threat, 
                      destroy it, and to further recognize and destroy any of the microorganisms associated 
                      with that agent that it may encounter in the future.
                      Vaccines can be prophylactic (to prevent or ameliorate the effects of a future infection 
                      by a natural or "wild" pathogen), or therapeutic (to fight a disease that has already occurred, 
                      such as cancer).
                      </h5>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <h5 className="text-white mb-0 font-weight-light">
                      The administration of vaccines is called vaccination.Vaccination is the 
                      most effective method of preventing infectious diseases; widespread 
                      immunity due to vaccination is largely responsible for the worldwide eradication 
                      of smallpox and the restriction of diseases such as polio, covid-19, measles and 
                      tetanus from much of the world. The effectiveness of vaccination has been widely 
                      studied and verified; for example, vaccines that have proven effective include the 
                      influenza vaccine, the HPV vaccine, and the chicken pox vaccine. 
                      The World Health Organization (WHO) reports that licensed vaccines are 
                      currently available for twenty-five different preventable infections.
                      </h5>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section" style={{ "background-color": "#98FB98" }}>
        <Container>
          <Row className="row-grid align-items-center">
            <Col md="6">
              <Card className="bg-dark shadow border-0">
                <CardImg
                  alt="..."
                  src={require("../../assets/img/img-3.png")}
                  top
                />
                <blockquote className="card-blockquote">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-bg"
                    preserveAspectRatio="none"
                    viewBox="0 0 583 95"
                  >
                    <polygon
                      className="fill-default"
                      points="0,52 583,95 0,95"
                    />
                    <polygon
                      className="fill-default"
                      opacity=".2"
                      points="0,42 583,95 683,0 0,95"
                    />
                  </svg>
                  <h3 className="display-3 font-weight-bold text-danger mb-0">
                    OBJECTIVES OF SYSTEM
                  </h3>
                </blockquote>
              </Card>
            </Col>
            <Col md="6">
              <div className="pl-md-5">
                <hr />
                <h5 className="text-black mb-0 font-weight-light">
                  Our Vision is to free developing countries and human lives from infectious diseases.
                </h5>
                <hr />
                <h5 className="text-black mb-0 font-weight-light">
                  Our constant mission is to discover, develop and deliver safe, effective and 
                  affordable vaccines for global public health.
                </h5>
                <hr />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section
        id="contact"
        className="section section section-contact-us"
        style={{ "background-color": "#333333" }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col lg="8">
              <Card className="bg-gradient-secondary shadow">
                <CardBody className="p-lg-5">
                  <h4>Want to contact us?</h4>
                  <Form onSubmit={handleContact}>
                    <Form.Group>
                      <i className="ni ni-user-run" />
                      <Input
                        className="form-control-alternative"
                        placeholder="Your name"
                        type="text"
                        value={cname}
                        onChange={(e) => setcname(e.target.value)}
                        required
                      />
                      {validateMsgValid}
                      {validateMsgInvalid}
                    </Form.Group>
                    <Form.Group>
                      <i className="ni ni-email-83" />
                      <Input
                        className="form-control-alternative"
                        placeholder="Email address"
                        type="email"
                        value={cemail}
                        onChange={(e) => setcemail(e.target.value)}
                        required
                      />
                      {validateMsgValid}
                      {validateMsgInvalid}
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Input
                        className="form-control-alternative"
                        cols="80"
                        name="name"
                        placeholder="Type a message..."
                        rows="4"
                        type="textarea"
                        value={cmessage}
                        onChange={(e) => setcmessage(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <div>
                      <Button
                        block
                        className="btn-round"
                        color="danger"
                        size="lg"
                        type="submit"
                      >
                        Send Message
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        {/* SVG separator */}
        <div className="separator separator-bottom separator-skew">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-dark" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </section>
    </main>
  );
}

const mapDispatchToProps = {
  checkLoginDetails: checkLoginDetails,
};

const mapStateToProps = (state) => ({
  LoginDetails: state.loginDetails,
});

Login = connect(mapStateToProps, mapDispatchToProps)(Login);
