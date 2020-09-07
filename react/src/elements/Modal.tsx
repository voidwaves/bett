import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";

function Example(props: any) {
  console.log("User Props", props.user);
  const [show, setShow] = useState(props.test);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Edit
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
