import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Container,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

const UpdateForm = ({ selectedEvent }) => {
  const [title, setTitle] = useState(selectedEvent.title);
  const [startTime, setStart] = useState(selectedEvent.startTime);
  const [endTime, setEnd] = useState(selectedEvent.endTime);
  const [date, setDate] = useState(selectedEvent.date);
  const [sendingDate, setSendingDate] = useState(
    new Date(selectedEvent.date).toISOString().split("T")[0]
  );
  const [color, setColor] = useState(selectedEvent.color);
  const [status, setStatus] = useState(selectedEvent.status);
  const [taken_by, setTakenBy] = useState(selectedEvent.taken_by);
  const [members, setMembers] = useState([]);
  const [student, setStudent] = useState(selectedEvent.student);
  const [students, setStudents] = useState([]);
  const statuses = ["Scheduled", "Cancelled", "Rescheduled", "Completed"];
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get("https://crm.internationaleducationoffice.co.uk/members", config)
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://crm.internationaleducationoffice.co.uk/students", config)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      startTime,
      color,
      student,
      taken_by,
      date,
      status,
      endTime,
    };
    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/schedules/${selectedEvent._id}`,
        data,
        config
      )
      .then((response) => {
        console.log(response.data);
        alert("Event updated");
        setTitle("");
        setStart("");
        setEnd("");
        setTakenBy("");
        setSendingDate(new Date());
        setStudent("");
        setDate(new Date());
        setColor("#2196f3");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEventDelete = () => {
    axios
      .delete(
        `https://crm.internationaleducationoffice.co.uk/schedules/${selectedEvent._id}`,
        config
      )
      .then(() => {
        alert("Event deleted");
        setTimeout(() => {
          window.location.reload();
        }, 800);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (
    selectedEvent.status === "Scheduled" ||
    selectedEvent.status === "Rescheduled"
  ) {
    return (
      <Container>
        <Form
          onSubmit={handleSubmit}
          style={{
            margin: "20px 50px",
          }}
        >
          <h1>Update event</h1>
          <Form.Group as={Row} controlId="title">
            <Form.Label column sm="2">
              Title:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="date">
            <Form.Label column sm="2">
              Date:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="date"
                value={sendingDate}
                onChange={(e) => {
                  setSendingDate(e.target.value);
                  setDate(new Date(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="startTime">
            <Form.Label column sm="2">
              Start time:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="time"
                value={startTime}
                onChange={(e) => setStart(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="endTime">
            <Form.Label column sm="2">
              End time:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="time"
                value={endTime}
                onChange={(e) => setEnd(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="status">
            <Form.Label column sm="2">
              Status:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value=""></option>
                {statuses.map((row) => (
                  <option key={row} value={row}>
                    {row}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="takenBy">
            <Form.Label column sm="2">
              Taken by:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="select"
                value={taken_by}
                onChange={(e) => setTakenBy(e.target.value)}
              >
                <option value=""></option>
                {members.map((row) => (
                  <option key={row._id} value={row._id}>
                    {row.username} - {row.role.name}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="student">
            <Form.Label column sm="2">
              Student:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="select"
                value={student}
                onChange={(e) => setStudent(e.target.value)}
              >
                <option value=""></option>
                {students.map((row) => (
                  <option key={row._id} value={row._id}>
                    {row.firstname} {row.lastname}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="color">
            <Form.Label column sm="2">
              Event Color:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Button type="submit">Update</Button>
        </Form>
        <Button onClick={handleEventDelete} disabled={!selectedEvent}>
          Delete Event
        </Button>
      </Container>
    );
  } else {
    return (
      <Container>
        <div>Cannot update {selectedEvent.status} event</div>
        <Button onClick={handleEventDelete} disabled={!selectedEvent}>
          Delete Event
        </Button>
      </Container>
    );
  }
};

export default UpdateForm;
