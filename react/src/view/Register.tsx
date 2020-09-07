import React, { FunctionComponent, Fragment, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { ApiRequest } from "../Types";
import { dateToString, fromEvent } from "../utils";
import { links } from "../Links";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
const Register: FunctionComponent = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [label, setLabel] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = () => {
    const body: ApiRequest.Register = {
      username: userName,
      beginOfApprenticeship: dateToString(startDate),
      password,
      firstName,
      lastName,
      label,
    };

    axios
      .post<{ token: string }>(links.api.register, body)
      .then(() => {
        setRedirect(true);
      })
      .catch(() => {
        alert("could not create a new user");
      });
  };

  return redirect ? (
    <Redirect to="/landing" />
  ) : (
    <>
      <div className=" registerForm">
        <Form>
          <div className="row">
            <div className="col-md-6 col-sm-6 my-col-Login2">
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  placeholder="Firstname"
                  onChange={fromEvent(setFirstName)}
                />
              </Form.Group>
            </div>
            <div className="col-md-6 col-sm-6 my-col-Login2">
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  placeholder="Lastname"
                  onChange={fromEvent(setLastName)}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group controlId="formBasicEmail">
            <Form.Control
              placeholder="Username"
              onChange={fromEvent(setUserName)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={fromEvent(setPassword)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              placeholder="Job Label"
              onChange={fromEvent(setLabel)}
            />
          </Form.Group>
          <Form.Label>enter the start date of your apprenticeship</Form.Label>
          <br />
          <br />

          <div className="row">
            <div className="col-md-6 col-sm-6 my-col-Login2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date as Date)}
              />
            </div>

            <div className="col-md-6 col-sm-6 my-col-Login2">
              <Button variant="secondary" onClick={handleSubmit}>
                register
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
