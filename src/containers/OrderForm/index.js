import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { getCompany, getVcount, submitRegisteredUser } from "../../actions";
import axios from "axios";
import {
  Input,
  Container,
  Row,
  Col,
  Button,
  Modal,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
export default function Form1({
  getCompany,
  getcompanysuccess,
  getVcount,
  getVcountsuccess,
  submitRegisteredUserSucsses,
  submitRegisteredUser,
}) {
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
  var validateMsgValid = (
    // <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    <div></div>
  );
  var validateMsgInvalid = (
    <Form.Control.Feedback type="invalid">
      Please provide a valid Input.
    </Form.Control.Feedback>
  );
  const [isSubmit, setIsSubmit] = useState(false);
  const [mobileNo, setMobileNo] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [age, setage] = useState("");
  const [address, setaddress] = useState("");
  const [cname, setcname] = useState("");
  const [vname, setvname] = useState("");
  var history = useHistory();
  const [alternateMobileNo, setAlternateMobileNo] = useState("");
  const [edit, setEdit] = useState(false);
  const [email, setemail] = useState();
  const [mobile, setmobile] = useState();
  const [vaccine_count, setVaccine_count] = useState();
  const [vaccine_amount, setVaccine_amount] = useState();
  const [total_dose, setTotal_dose] = useState();

  const [female, setFeMale] = useState();
  const [other, setOther] = useState();
  const [gender, setGender] = useState();
  let [final_amt, setFinalamt] = useState();
  const [usrid, setUsrid] = useState();

  useEffect(() => {
    getCompany(
      {
        userid: localStorage.getItem("userid"),
      },
      localStorage.getItem("token")
    );
    getVcount(
      { userid: localStorage.getItem("userid") },
      localStorage.getItem("token")
    );
    submitRegisteredUser(
      { userid: localStorage.getItem("userid") },
      localStorage.getItem("token")
    );
  }, []);
  const gfunction = () => {};
  React.useEffect(() => {
    if (submitRegisteredUserSucsses)
      if (submitRegisteredUserSucsses.status == 200) {
        console.log("!!!!!!!!!!!!!");
        console.log(submitRegisteredUserSucsses.data.rows[0]);
        setUsrid(submitRegisteredUserSucsses.data.rows[0].id);
        setfirstname(submitRegisteredUserSucsses.data.rows[0].first_name);
        //setmiddle_name(submitRegisteredUserSucsses.data.rows[0].middle_name);
        setlastname(submitRegisteredUserSucsses.data.rows[0].last_name);
        setemail(submitRegisteredUserSucsses.data.rows[0].email);
        setmobile(submitRegisteredUserSucsses.data.rows[0].mobile);
        setaddress(submitRegisteredUserSucsses.data.rows[0].address);
        setvname(localStorage.getItem("virusid"));
        setcname(localStorage.getItem("companyid"));
        setVaccine_count(localStorage.getItem("vcount"));
        setVaccine_amount(localStorage.getItem("amountperdose"));
      }
  }, [submitRegisteredUserSucsses]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmit(true);

    if (e.currentTarget.checkValidity()) {
      const profiledata = new FormData();
      profiledata.append("usrid", usrid);
      profiledata.append("firstname", firstname);
      profiledata.append("age", age);
      profiledata.append("lastname", lastname);
      profiledata.append("address", address);
      profiledata.append("cname", cname);
      profiledata.append("vname", vname);
      profiledata.append("vaccine_count", vaccine_count);
      profiledata.append("vaccine_amount", vaccine_amount);
      profiledata.append("total_dose", total_dose);
      profiledata.append("setFinalamt", setFinalamt);
      profiledata.append("gender", gender);

      axios
        .post(
          "http://localhost:3000/registereduserdetails/upload1",
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
          console.log(response);
          if (response.data.status == 200) {
            localStorage.setItem("email", email);
            localStorage.setItem("mobile", mobile);
            localStorage.setItem("final_amount", setFinalamt);
            NotificationModel("bg-success", response.data.msg);
            if (!edit) {
              // setMobileNo("");
              setfirstname("");
              setlastname("");
              setaddress("");
              setage("");
              history.push("/payment");
            }
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
  }
  // React.useEffect(() => {
  //     if (isSubmit) {

  //         history.push("/payment");
  //     } else {
  //         NotificationModel("bg-danger", "Bank Not Added");
  //     }
  //     setIsSubmit(false);

  // }, []);
  return (
    <div className="py-5" style={{ "background-color": "#333333" }}>
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
      <Container className="bg-secondary shadow card mt-5">
        <div className="card-body">
          <div className="mb-3">
            <small className="text-uppercase font-weight-bold">
              Profile Account Information
            </small>
          </div>
          <Form noValidate validated={isSubmit} onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} lg="6">
                <label>First Name</label>
                <Input
                  required
                  value={firstname}
                  className="form-control-alternative"
                  type="text"
                  placeholder="First name"
                  onChange={(e) => setfirstname(e.target.value)}
                />
                {validateMsgValid}
                {validateMsgInvalid}
              </Form.Group>

              <Form.Group as={Col} lg="6">
                <label>Last Name</label>
                <Input
                  required
                  value={lastname}
                  className="form-control-alternative"
                  type="text"
                  placeholder="Lastname"
                  onChange={(e) => setlastname(e.target.value)}
                />
                {validateMsgValid}
                {validateMsgInvalid}
              </Form.Group>

              {validateMsgValid}
              {validateMsgInvalid}
            </Row>
            <Row>
              <Form.Group as={Col} lg="6">
                <label>Age</label>
                <Input
                  required
                  value={age}
                  className="form-control-alternative"
                  type="text"
                  placeholder="Enter Age"
                  onChange={(e) => setage(e.target.value)}
                />
                {validateMsgValid}
                {validateMsgInvalid}
              </Form.Group>

              <Form.Group as={Col} lg="6">
                <label>Address</label>
                <Input
                  required
                  value={address}
                  className="form-control-alternative"
                  type="text"
                  placeholder="Address"
                  onChange={(e) => setaddress(e.target.value)}
                />
                {validateMsgValid}
                {validateMsgInvalid}
              </Form.Group>

              {validateMsgValid}
              {validateMsgInvalid}
            </Row>

            <Row>
              <Form.Group as={Col} lg="6">
                <label>Company Name</label>
                <Input
                  required
                  value={cname}
                  className="form-control-alternative"
                  type="text"
                  placeholder=" company id"
                  readOnly
                  onChange={(e) => setcname(e.target.value)}
                />
                {validateMsgValid}
                {validateMsgInvalid}
              </Form.Group>

              <Form.Group as={Col} lg="6">
                <label>Vaccine Name</label>
                <Input
                  required
                  value={vname}
                  className="form-control-alternative"
                  type="text"
                  placeholder="vaccine  id"
                  readOnly
                  onChange={(e) => setvname(e.target.value)}
                />
                {validateMsgValid}
                {validateMsgInvalid}
              </Form.Group>

              {validateMsgValid}
              {validateMsgInvalid}
            </Row>
            <Row>
              <Form.Group as={Col} lg="6">
                <label>Vaccine Count</label>
                <Input
                  required
                  value={vaccine_count}
                  className="form-control-alternative"
                  type="text"
                  placeholder="vaccine count"
                  readOnly
                  onChange={(e) => setVaccine_count(e.target.value)}
                />
                {validateMsgValid}
                {validateMsgInvalid}
              </Form.Group>

              {validateMsgValid}
              {validateMsgInvalid}
            </Row>
            <Row>
              <Form.Group as={Col} lg="6">
                <label>Vaccine Amount</label>
                <Input
                  required
                  value={vaccine_amount}
                  className="form-control-alternative"
                  type="text"
                  placeholder="vaccine amount"
                  readOnly
                  onChange={(e) => setVaccine_amount(e.target.value)}
                />
                {validateMsgValid}
                {validateMsgInvalid}
              </Form.Group>

              {validateMsgValid}
              {validateMsgInvalid}
            </Row>
            <Row>
              <Form.Group as={Col} lg="6">
                <label>Vaccine Dose</label>
                <Input
                  required
                  value={total_dose}
                  className="form-control-alternative"
                  type="text"
                  placeholder="Enter how many dose you wanted"
                  onChange={(e) => setTotal_dose(e.target.value)}
                />
                {validateMsgValid}
                {validateMsgInvalid}
              </Form.Group>

              {validateMsgValid}
              {validateMsgInvalid}
            </Row>
            <Row>
              <Form.Group as={Col} lg="6">
                <label>Final Amount</label>
                <Input
                  required
                  value={(setFinalamt = total_dose * vaccine_amount)}
                  className="form-control-alternative"
                  type="text"
                  placeholder="Total"
                  readOnly
                  onChange={(e) => setTotal_dose(e.target.value)}
                />
                {validateMsgValid}
                {validateMsgInvalid}
              </Form.Group>

              {validateMsgValid}
              {validateMsgInvalid}
            </Row>
            <Row>
              <div class="form-check form-check-inline">
                <Form.Group as={Col} lg="4">
                  <Input
                    required
                    value="male"
                    className="form-control-alternative form-check-inline"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label
                    class="form-check-label"
                    for="inlineRadio1"
                    value={gender}
                  >
                    Male
                  </label>
                  {validateMsgValid}
                  {validateMsgInvalid}
                </Form.Group>
                {validateMsgValid}
                {validateMsgInvalid}
                <Form.Group as={Col} lg="4">
                  <Input
                    required
                    value="female"
                    className="form-control-alternative form-check-inline"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label
                    class="form-check-label"
                    for="inlineRadio2"
                    value={gender}
                  >
                    Female
                  </label>
                  {validateMsgValid}
                  {validateMsgInvalid}
                </Form.Group>
                {validateMsgValid}
                {validateMsgInvalid}
                <Form.Group as={Col} lg="4">
                  <Input
                    required
                    value="other"
                    className="form-control-alternative form-check-inline"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label
                    class="form-check-label"
                    for="inlineRadio3"
                    value={gender}
                  >
                    Other
                  </label>
                  {validateMsgValid}
                  {validateMsgInvalid}
                </Form.Group>
                {validateMsgValid}
                {validateMsgInvalid}
              </div>
            </Row>
            <br></br>

            <Button color="danger" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

const mapDispatchToProps = {
  getCompany: getCompany,
  getVcount: getVcount,
  submitRegisteredUser: submitRegisteredUser,
};

const mapStateToProps = (state) => ({
  getcompanysuccess: state.getcompanysuccess,
  getVcountsuccess: state.getVcountsuccess,
  submitRegisteredUserSucsses: state.registeredUserDetails,
});

Form1 = connect(mapStateToProps, mapDispatchToProps)(Form1);
