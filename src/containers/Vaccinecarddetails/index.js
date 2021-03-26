import React from "react";
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
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCompany, getVcount } from "../../actions";
import { Link } from "react-router-dom";
import Form1 from "../OrderForm";
export default function Cardv(props) {
  React.useEffect(() => {
    localStorage.setItem("vcount", props.countv);

    localStorage.setItem("amountperdose", props.amount);
    //   localStorage.setItem("last_name", last_name);
    //   localStorage.setItem("middle_name", middle_name);
    //   localStorage.setItem("email", email);
    //   localStorage.setItem("mobile", mobile);
    // NotificationModel("bg-success", "User Added Sucssesfully");
    //   setRole("");
    //   setSport("");
    //   setYears("");
    //   setMonths("");
    //   setSpetialization("");
    // setLocation("");
    //history.push("/payment");
  });

  return (
    <div>
      <Container className="mt-5">
        <Col>
          <Row>
            <div class="bg-secondary shadow card">
              <div className="card-body">
                <div className="mb-3">
                  <small className="text-uppercase font-weight-bold">
                    Vaccine Card Details
                  </small>

                  <br></br>
                  <div className="text-center">
                    <span className="mt-3 text-red font-weight-bold mb-0">
                      Available Vaccine count: &nbsp; {props.countv}
                      {/* {vcountdata
                                                ? vcountdata.map((item) => (
                                                    <span value={item.id}>{item.available_count}</span>

                                                ))
                                                : "Not Available"} */}
                    </span>
                    <br></br>
                    <Button
                      color="danger"
                      type="submit"
                      className=""
                      to="/order-form"
                      tag={Link}
                    >
                      Order
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Col>
      </Container>
    </div>
  );
}

const mapDispatchToProps = {
  getCompany: getCompany,
  getVcount: getVcount,
};

const mapStateToProps = (state) => ({
  getcompanysuccess: state.getcompanysuccess,
  getVcountsuccess: state.getVcountsuccess,
});

Cardv = connect(mapStateToProps, mapDispatchToProps)(Cardv);
