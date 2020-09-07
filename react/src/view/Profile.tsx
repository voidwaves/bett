import React, { FunctionComponent, Fragment, useState, useEffect } from "react";
import { ApiResponse, App, ApiRequest } from "../Types";
import axios from "axios";
import { links } from "../Links";
import { stringToDate, dateToString } from "../utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLogout } from "../AppState";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile: FunctionComponent = () => {
    const [fieldsDisabled, setFieldsDisabled] = useState(true)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [user, setUser] = useState<App.User | null>(null)
    const logout = useLogout()

  useEffect(() => {
    axios
      .get<ApiResponse.User>(links.api.profile)
      .then((response) =>
        setUser({
          ...response.data,
          beginOfApprenticeship: stringToDate(
            response.data.beginOfApprenticeship
          ),
        })
      )
      .catch(() => alert("could not load profile"));
  }, []);

    const handleDelete = () => {
        if(user !== null && window.confirm('are you sure that you want to delete your account permanently?')) {
            axios.delete(links.api.profileDelete(user.id))
            .then(() => {
                logout()
            })
            .catch(() => {
                alert('could not delete user profile')
            })
        }
    }

    const handleSave = () => {
        if(user !== null) {
            const passwordsMatch = newPassword === confirmPassword
            const passwordsEmpty = newPassword === '' && confirmPassword === ''

            if(passwordsMatch) {
                const body: ApiRequest.User.Put = {
                    ...user,
                    password: passwordsEmpty ? user.password : newPassword,
                    beginOfApprenticeship: dateToString(user.beginOfApprenticeship)
                }
                axios.put(links.api.profile, body)
                .then(() => {
                    setFieldsDisabled(true)
                    setNewPassword('')
                    setConfirmPassword('')
                })
                .catch(() => {
                    alert('could not change user profile')
                })
            }
            else {
                alert('the two password did not match!')
            }
        }
    }

  return (
    <Fragment>
      <h1>User Profile</h1>
      {user === null ? (
        <h2>loading...</h2>
      ) : (
        <>
          <Form>
            <div className="row">
              <div className="col-md-6 col-sm-6 my-col-Login2">
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Label</Form.Label>
                  <Form.Control
                    value={user.label}
                    disabled={fieldsDisabled}
                    type="text"
                    onChange={(event) =>
                      setUser({ ...user, label: event.target.value })
                    }
                  />
                </Form.Group>
              </div>
              <div className="col-md-6 col-sm-6 my-col-Login2">
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    value={user.firstName}
                    disabled={fieldsDisabled}
                    type="text"
                    onChange={(event) =>
                      setUser({ ...user, firstName: event.target.value })
                    }
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-6 my-col-Login2">
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    value={user.lastName}
                    disabled={fieldsDisabled}
                    type="text"
                    onChange={(event) =>
                      setUser({ ...user, lastName: event.target.value })
                    }
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-6 my-col-Login2">
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>begin of apprenticeship</Form.Label>{" "}
                  <DatePicker
                    selected={user.beginOfApprenticeship}
                    disabled={fieldsDisabled}
                    onChange={(date: Date) =>
                      setUser({ ...user, beginOfApprenticeship: date })
                    }
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-sm-6 my-col-Login2">
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    value={user.username}
                    disabled={fieldsDisabled}
                    type="text"
                    onChange={(event) =>
                      setUser({ ...user, username: event.target.value })
                    }
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-6 my-col-Login2">
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    value={newPassword}
                    disabled={fieldsDisabled}
                    type="text"
                    onChange={(event) =>
                      setNewPassword(event.target.value)
                    }
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-6 my-col-Login2">
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    value={confirmPassword}
                    disabled={fieldsDisabled}
                    type="text"
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
          {/* <h3>label</h3>
          <input
            value={user.label}
            disabled={fieldsDisabled}
            type="text"
            onChange={(event) =>
              setUser({ ...user, label: event.target.value })
            }
          />
          <h3>first name</h3>
          <input
            value={user.firstName}
            disabled={fieldsDisabled}
            type="text"
            onChange={(event) =>
              setUser({ ...user, firstName: event.target.value })
            }
          />
          <h3>last name</h3>
          <input
            value={user.lastName}
            disabled={fieldsDisabled}
            type="text"
            onChange={(event) =>
              setUser({ ...user, lastName: event.target.value })
            }
          /> */}
          {/* <h3>begin of apprenticeship</h3>
          <DatePicker
            selected={user.beginOfApprenticeship}
            disabled={fieldsDisabled}
            onChange={(date: Date) =>
              setUser({ ...user, beginOfApprenticeship: date })
            }
          /> */}
          <div className="row justify-content-between buttons">
            {" "}
            <div className="col-md-4 col-sm-4 buttons">
              <Button onClick={() => setFieldsDisabled(false)}>Edit</Button>
            </div>
            <div className="col-md-4 col-sm-4 buttons">
              <Button onClick={handleSave}>Save</Button>
            </div>
            <div className="col-md-4 col-sm-4 buttons">
              <Button onClick={handleDelete}>Delete</Button>
            </div>
          </div>

          {/* <button onClick={() => setFieldsDisabled(false)}>edit</button>
          <button onClick={handleSave}>save</button>
          <button onClick={handleDelete}>Delete</button> */}
        </>
      )}
    </Fragment>
  )
}

export default Profile;
