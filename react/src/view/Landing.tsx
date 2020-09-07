import React, { FunctionComponent, Fragment } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link } from "react-router-dom";
import { links } from "../Links";
import Login from "./Login";
import Register from "./Register";
import HomeText from "./HomeText";
import Navbarnavi from "../elements/Navbarnavi";
import Footer from "../elements/Footer";

const Landing: FunctionComponent = () => {
  const { register, login } = links.browser;
  return (
    <Fragment>
      <div className="row  my-row">
        <div className="col-md-6 col-sm-6 my-col-Login2">
          <HomeText />
        </div>
        <div className="col-md-6 col-sm-6 my-col-Login2">
          <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
            <Tab eventKey="login" title="Login">
              <Login />
            </Tab>
            <Tab eventKey="register" title="Register">
              <Register />
            </Tab>
          </Tabs>
        </div>
      </div>
    </Fragment>
  );
};

export default Landing;
