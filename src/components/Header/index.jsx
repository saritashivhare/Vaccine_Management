import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { logout } from "../../actions";
//import logo from '../../assets/img/logo.jpeg';
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

export default function Header({ logout }) {
  var history = useHistory();
  function logout1(event) {
    event.preventDefault();
    logout();
    localStorage.clear();
    history.push("/");
  }

  var image = require("../../assets/img/vaccine.png");

  let tabBar,
    tabBar1,
    tabBar2,
    tabBar3,
    orderedList,
    orderedVaccine,
    logoutBtn,
    userSettings,
    contactUS,
    aboutUS;
  if (localStorage.getItem("role") === "super_user") {
    tabBar = (
      <Nav className="navbar-nav-hover align-items-lg-center" navbar>
        <UncontrolledDropdown nav>
          <DropdownToggle nav>
            <i className="ni ni-collection d-lg-none mr-1" />
            <span className="font-weight-bold nav-link-inner--text text-danger">
              Customer List
            </span>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem to="/player-list" tag={Link}>
              Customer List
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );
  } else if (localStorage.getItem("role") === "user") {
    //   tabBar = (
    //     <Nav className="navbar-nav-hover align-items-lg-center" navbar>
    //       <UncontrolledDropdown nav>
    //         <DropdownToggle nav>
    //           <i className="ni ni-collection d-lg-none mr-1" />
    //           <span className="font-weight-bold nav-link-inner--text text-danger">
    //             Register Sport
    //           </span>
    //         </DropdownToggle>
    //         <DropdownMenu>
    //           <DropdownItem to="/register-sport" tag={Link}>
    //             Register Sport
    //           </DropdownItem>
    //         </DropdownMenu>
    //       </UncontrolledDropdown>
    //     </Nav>
    //   );
    //   tabBar4 = (
    //     <Nav className="navbar-nav-hover align-items-lg-center" navbar>
    //       <UncontrolledDropdown nav>
    //         <DropdownToggle nav>
    //           <i className="ni ni-collection d-lg-none mr-1" />
    //           <span className="font-weight-bold nav-link-inner--text text-danger">
    //             My Registered Sport
    //           </span>
    //         </DropdownToggle>
    //         <DropdownMenu>
    //           <DropdownItem to="/myregisteredsport" tag={Link}>
    //             My Registered Sport
    //           </DropdownItem>
    //         </DropdownMenu>
    //       </UncontrolledDropdown>
    //     </Nav>
    //   );
  }

  if (localStorage.getItem("role") != null) {
    logoutBtn = (
      <Nav className="align-items-lg-center ml-lg-auto" navbar>
        {/* <NavItem className="d-none d-lg-block ml-lg-4">
          <span className="mb-0 text-white  font-weight-bold">

          </span>
          &nbsp;
          <Button className="btn btn-warning" onClick={logout1}>
            Logout
          </Button>
        </NavItem> */}

        <UncontrolledDropdown nav>
          <DropdownToggle className="p-0 m-0" nav>
            <i className="ni ni-collection ml-lg-auto d-lg-none mr-1" />
            <span className="font-weight-bold nav-link-inner--text">
              {localStorage.getItem("firstname")} &nbsp;{" "}
              {localStorage.getItem("lastname")}&nbsp;
            </span>
            <Button className="btn btn-danger" onClick={logout1}>
              Logout
            </Button>
          </DropdownToggle>
          {/* <DropdownMenu>
            <DropdownItem>

            </DropdownItem>
          </DropdownMenu> */}
        </UncontrolledDropdown>
      </Nav>
    );
    userSettings = (
      <Nav className="navbar-nav-hover align-items-lg-center  " navbar>
        <UncontrolledDropdown nav>
          <DropdownToggle nav>
            <i className="ni ni-collection d-lg-none mr-1 " />
            <span className="font-weight-bold nav-link-inner--text text-danger ">
              User Settings
            </span>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              to={"/register/" + localStorage.getItem("userid")}
              tag={Link}
            >
              Edit Profile
            </DropdownItem>
            <DropdownItem to="/changePassword" tag={Link}>
              Change Password
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );
    orderedVaccine = (
      <Nav className="navbar-nav-hover align-items-lg-center" navbar>
        <UncontrolledDropdown nav>
          <DropdownToggle nav>
            <i className="ni ni-collection d-lg-none mr-1" />
            <span className="font-weight-bold nav-link-inner--text text-danger">
              Order Form
            </span>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem to="/vaccine-details" tag={Link}>
              Order Form
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );
    orderedList = (
      <Nav className="navbar-nav-hover align-items-lg-center" navbar>
        <UncontrolledDropdown nav>
          <DropdownToggle nav>
            <i className="ni ni-collection d-lg-none mr-1" />
            <span className="font-weight-bold nav-link-inner--text text-danger">
              Order List
            </span>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem to="/list" tag={Link}>
              Order List
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );
  }

  return (
    <div>
      <header>
        <Navbar
          className="shadow navbar-main fixed-top navbar-expand-lg navbar-dark headroom "
          expand="lg"
          style={{
            "border-radius": "100px",
            margin: "4px 25px",
            padding: "0px 10px",
            "background-color": "white",
            "min-height": "53px",
            //"position":"relative"
          }}
        >
          {
            <img
              src={image}
              class=" d-block float-right  "
              style={{ marginLeft: "50px" }}
              alt="Responsive image"
              width="60"
              height="60"
            />
          }
          <Container>
            {/*
          <img
                    
                    src={image}
                    class=" mx-auto d-block position-relative  " alt="Responsive image" 
               width="60" height="60" 
                  
                  />
                 
         */}
            <NavbarBrand className="mr-lg-5">
              <span className="font-weight-bold text-white"></span>
            </NavbarBrand>

            <button
              className="navbar-toggler  btn-danger bg-danger"
              id="navbar_global"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse toggler="#navbar_global" navbar>
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    {/* <Link to="/"> */}
                    {/* <img
                        alt="..."
                        src={require("../../assets/img/logo.jpg")}
                      /> */}

                    <span className="font-weight-bold">Xsportsz</span>
                    {/* </Link> */}
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler " id="navbar_global">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>

              {tabBar}
              {tabBar1}
              {tabBar2}
              {tabBar3}
              {orderedVaccine}
              {orderedList}
              {userSettings}
              {logoutBtn}
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
}

const mapDispatchToProps = {
  logout: logout,
};

const mapStateToProps = (state) => ({});

Header = connect(mapStateToProps, mapDispatchToProps)(Header);
