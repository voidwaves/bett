import React, { FunctionComponent, Fragment, useState } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { App, ApiRequest } from "../Types";
import { links } from "../Links";
import { dateToString, fromEvent } from "../utils";
import "react-datepicker/dist/react-datepicker.css";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { Form, Button } from "react-bootstrap";

type EntryListItemProps = {
  reportEntry: App.ReportEntry;
  reload: () => void;
};

// todo: include pop up, pop up fields are input fields disabled by default
const EntryListItem: FunctionComponent<EntryListItemProps> = ({
  reportEntry,
  reload,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldsDisabled, setFieldsDisabled] = useState(true);
  const [workingHours, setWorkingHours] = useState(reportEntry.workingHours);
  const [department, setDepartment] = useState(reportEntry.department);
  const [content, setContent] = useState(reportEntry.content);

  const resetInputs = () => {
    setWorkingHours(reportEntry.workingHours);
    setDepartment(reportEntry.department);
    setContent(reportEntry.content);
  };

  const handleDelete = () => {
    if (window.confirm("do you really want to delete this report entry?")) {
      const { id } = reportEntry;
      axios
        .delete(links.api.reportEntryDelete(id))
        .then(() => {
          alert("successfully deleted the report entry");
          reload();
          resetInputs();
        })
        .catch(() => {
          alert("could not delete report entry");
        });
    }
  };

  const handleSave = () => {
    const { id } = reportEntry;

    if (reportEntry.exists) {
      const body: ApiRequest.ReportEntry.Put = {
        id,
        content,
        workingHours,
        department,
        reportDate: dateToString(reportEntry.reportDate),
      };
      axios
        .put(links.api.reportEntries, body)
        .then(() => {
          setFieldsDisabled(true);
          reload();
        })
        .catch(() => {
          alert("could not save existing report entry");
        });
    } else {
      const body: ApiRequest.ReportEntry.Post = {
        content,
        workingHours,
        department,
        reportDate: dateToString(reportEntry.reportDate),
      };
      axios
        .post(links.api.reportEntries, body)
        .then(() => {
          setFieldsDisabled(true);
          reload();
        })
        .catch(() => {
          alert("could not create new report entry");
        });
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    resetInputs();
  };

  return (
    <Fragment>
      {/* <Card bg="secondary" border="danger" style={{ width: "18rem" }}>
        <Card.Header>{dateToString(reportEntry.reportDate)}</Card.Header>
        <Card.Body>
          <Card.Title>Danger Card Title</Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card> */}
      <Accordion defaultActiveKey="0">
        <Card
          style={{
            backgroundColor: reportEntry.exists ? "lightblue" : "lightcoral",
          }}
        >
          <Accordion.Toggle as={Card.Header} eventKey="0">
            {dateToString(reportEntry.reportDate)}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{department}</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Details
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <div className="row">
                <div className="col-md-6 col-sm-6 ">Content</div>
                <div className="col-md-3 col-sm-6 ">Department</div>
                <div className="col-md-3 col-sm-6 ">Working Hour</div>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-6 ">
                  {" "}
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                      value={content}
                      disabled={fieldsDisabled}
                      onChange={fromEvent(setContent)}
                      as="textarea"
                    />
                  </Form.Group>
                </div>
                <div className="col-md-3 col-sm-6 ">
                  {" "}
                  <Form.Control
                    value={department}
                    disabled={fieldsDisabled}
                    type="text"
                    onChange={fromEvent(setDepartment)}
                  />
                </div>
                <div className="col-md-3 col-sm-6 ">
                  {" "}
                  <Form.Control
                    value={workingHours}
                    disabled={fieldsDisabled}
                    type="number"
                    onChange={(event) =>
                      setWorkingHours(parseInt(event.target.value))
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-sm-6 ">
                  {" "}
                  <Button onClick={() => setFieldsDisabled(!fieldsDisabled)}>
                    edit
                  </Button>
                </div>
                <div className="col-md-4 col-sm-6 ">
                  {" "}
                  <Button onClick={handleSave}>save</Button>
                </div>
                <div className="col-md-4 col-sm-6 ">
                  {" "}
                  {!reportEntry.exists ? null : (
                    <Button onClick={handleDelete}>delete</Button>
                  )}{" "}
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <hr></hr>
      {/* <div
        style={{
          backgroundColor: reportEntry.exists ? "lightgreen" : "lightcoral",
          width: 500,
        }}
      >
        <h3>{dateToString(reportEntry.reportDate)}</h3>
        <h3>{reportEntry.department}</h3>
        {!isModalOpen ? (
          <button onClick={() => setIsModalOpen(true)}>details</button>
        ) : (
          <div style={{ backgroundColor: "lightblue", width: 300 }}>
            <h2>Report for {dateToString(reportEntry.reportDate)}</h2>

            <h3>workingHours</h3>
            <input
              value={workingHours}
              disabled={fieldsDisabled}
              type="number"
              onChange={(event) =>
                setWorkingHours(parseInt(event.target.value))
              }
            />
            <h3>department</h3>
            <input
              value={department}
              disabled={fieldsDisabled}
              type="text"
              onChange={fromEvent(setDepartment)}
            />
            <h3>content</h3>
            <input
              value={content}
              disabled={fieldsDisabled}
              type="text"
              onChange={fromEvent(setContent)}
            />

            <button onClick={() => setFieldsDisabled(false)}>edit</button>
            <button onClick={handleSave}>save</button>
            {!reportEntry.exists ? null : (
              <button onClick={handleDelete}>delete</button>
            )}
            <button onClick={handleClose}>close</button>
          </div>
        )}
      </div> */}
    </Fragment>
  );
};

export default EntryListItem;
