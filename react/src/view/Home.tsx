import React, { FunctionComponent, Fragment } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../AppState";
import { links } from "../Links";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Profile from "./Profile";
import Register from "./Register";
import ReportEntries from "./EntryList";

const Home: FunctionComponent = () => {
  const { profile, reportEntries } = links.browser;
  const logout = useLogout();

  return (
    <Fragment>
      <div className="row  my-row">
        <div className="col-md-6 col-sm-6 my-col-Login2">
          <Tabs eventKey="login" id="uncontrolled-tab-example">
            <Tab eventKey="register" title="Report entries">
              <ReportEntries />
            </Tab>
            <Tab defaultActiveKey="login" title="Login">
              <Profile />
            </Tab>
          </Tabs>
        </div>{" "}
      </div>
      {/* <Link to={profile}>
        <button>profile</button>
      </Link>
      <Link to={reportEntries}>
        <button>report entries</button>
      </Link> */}
      <br />
      <button onClick={logout}>log out</button>
    </Fragment>
  );
};

export default Home;
