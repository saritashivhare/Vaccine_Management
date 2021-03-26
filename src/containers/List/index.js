import React, { useState, useEffect } from "react";
import { Form, Table, Modal, Row, Input, ButtonToolbar } from "reactstrap";
import { getList, Paymentmail } from "../../actions";
import { connect } from "react-redux";
export default function List({
  getList,
  getListsuccess,
  Paymentmail,
  Paymentmailsuccess,
}) {
  const [Class, SetClass] = useState();
  const [Notification, SetNotification] = useState(false);
  const NotificationClose = () => SetNotification(false);
  const NotificationShow = () => SetNotification(true);
  const [Msg, SetMsg] = useState();
  function NotificationModel(Class, Msg) {
    SetClass(Class);
    SetMsg(Msg);
    NotificationShow();
    setTimeout(function () {
      NotificationClose();
    }, 5000);
  }

  const [data, setData] = useState([]);
  const [data1, setData1] = useState();
  React.useEffect(() => {
    if (getListsuccess) {
      if (getListsuccess.status == 200) {
        console.log(getListsuccess);
        setData(getListsuccess.data);
      }
    }
  }, [getListsuccess]);

  const [pdata1, setPData1] = useState();
  React.useEffect(() => {
    if (Paymentmailsuccess) {
      if (Paymentmailsuccess.status == 200) {
        NotificationModel(
          "bg-success",
          "Payment Done Succesfully and  Email Sent Sucssesfully"
        );
        setPData1(Paymentmailsuccess.data);
      }
    }
  }, [Paymentmailsuccess]);

  React.useEffect(() => {
    getList(
      {
        userid: localStorage.getItem("userid"),
      },
      localStorage.getItem("token")
    );
    Paymentmail(
      {
        final_amount: localStorage.getItem("final_amount"),
        amountperdose: localStorage.getItem("amountperdose"),
        userid: localStorage.getItem("userid"),
        email: localStorage.getItem("email"),
      },
      localStorage.getItem("token")
    );
  }, [getList, Paymentmail]);
  const [pay, setPay] = useState();
  React.useEffect(() => {
    localStorage.getItem("paymentin", pay);
  });

  return (
    <div
      className="container-fluid py-5 "
      style={{ "background-color": "#333333" }}
    >
      <Form className="shadow card mt-5">
        {/* <div className="card-body" > */}
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Virus Name</th>
              <th>Company Name</th>
              <th>Dose</th>
              <th>Amount</th>
              <th>Date Of Order</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map((item) => {
                  return (
                    <tr>
                      <td>{item.vname}</td>
                      <td>{item.company_name}</td>
                      <td>{item.Total_quantity}</td>
                      <td>{item.Final_amount}</td>
                      <td>{item.cddate}</td>
                    </tr>
                  );
                })
              : "notfound"}
          </tbody>
        </Table>
        {/* </div> */}
      </Form>
      {/* {alert(JSON.stringify(pdata1))} */}
      <div className="container mt-5">
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
      </div>
    </div>
  );
}
const mapDispatchToProps = {
  getList: getList,
  Paymentmail: Paymentmail,
};

const mapStateToProps = (state) => ({
  getListsuccess: state.getListsuccess,
  Paymentmailsuccess: state.Paymentmailsuccess,
});

List = connect(mapStateToProps, mapDispatchToProps)(List);
