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
    if (window.confirm("Do you really want to delete this report entry?")) {
      const { id } = reportEntry;
      axios
        .delete(links.api.reportEntryDelete(id))
        .then(() => {
          alert("Successfully deleted the report entry");
          reload();
          resetInputs();
        })
        .catch(() => {
          alert("Could not delete report entry");
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
          alert("Could not save existing report entry");
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
          alert("Could not create new report entry");
        });
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    resetInputs();
  };

  return (
    <Fragment>
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
            <Card.Body>Department: {department}</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Details
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <div className="row">
                <div className="col-md-8 col-sm-6 ">
                  {" "}
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      value={content}
                      disabled={fieldsDisabled}
                      onChange={fromEvent(setContent)}
                      as="textarea"
                    />
                  </Form.Group>
                </div>
                <div className="col-md-2 col-sm-6 ">
                  {" "}
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    value={department}
                    disabled={fieldsDisabled}
                    type="text"
                    onChange={fromEvent(setDepartment)}
                  />
                </div>
                <div className="col-md-2 col-sm-6 ">
                  {" "}
                  <Form.Label>WorkingHours</Form.Label>
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
    </Fragment>
  );
};

export default EntryListItem;
