import React from "react";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <footer className="bg-dark footer">
        <Container>
          <Row className=" row-grid align-items-center mb-5">
            <Col lg="6">
              <h3 className=" text-danger font-weight-bold mb-2">
                'Thank you for visiting us!'
              </h3>
              <h4 className="text-white mb-0 font-weight-light">
                Let's get in touch on any of these platforms.
              </h4>
            </Col>
            <Col className="text-lg-center btn-wrapper" lg="6">
              <Button
                className="btn-icon-only rounded-circle"
                color="twitter"
                href="#"
                id="tooltip475038074"
                target="_blank"
              >
                {/* <span className="btn-inner--icon">
                  <i className="fa fa-twitter" />
                </span> */}
                <img
                  height="20"
                  width="20"
                  src={require("../../assets/img/s2.png")}
                />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip475038074">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-icon-only rounded-circle ml-1"
                color="facebook"
                href="#"
                id="tooltip837440414"
                target="_blank"
              >
                {/* <span className="btn-inner--icon">
                  <i className="fa fa-facebook-square" />
                </span> */}
                <img
                  height="20"
                  width="20"
                  src={require("../../assets/img/s1.png")}
                />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip837440414">
                Like us
              </UncontrolledTooltip>
              <Button
                className="btn-icon-only rounded-circle ml-1"
                color="dribbble"
                href="#"
                id="tooltip829810202"
                target="_blank"
              >
                {/* <span className="btn-inner--icon">
                  <i className="fa fa-dribbble" />
                </span> */}
                <img
                  height="20"
                  width="20"
                  src={require("../../assets/img/s3.png")}
                />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip829810202">
                Follow us
              </UncontrolledTooltip>
            </Col>
          </Row>
          <hr />
          <Row className=" align-items-center justify-content-md-between">
            <Col md="6">
              <div className=" copyright">
                © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.creative-tim.com?ref=adsr-footer"
                  target="_blank"
                >
                  Vaccine Management
                </a>
                .
              </div>
            </Col>
            {/* <Col md="6">
              <Nav className=" nav-footer justify-content-end">
                <NavItem>
                  <NavLink
                    href="https://www.creative-tim.com/presentation?ref=adsr-footer"
                    target="_blank"
                  >
                    About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="http://blog.creative-tim.com?ref=adsr-footer"
                    target="_blank"
                  >
                    Blog
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md"
                    target="_blank"
                  >
                    MIT License
                  </NavLink>
                </NavItem>
              </Nav>
            </Col> */}
          </Row>
        </Container>
      </footer>
    );
  }
}

export default SimpleFooter;
