import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";

const EventForm = () => {
  const [title, setTitle] = useState("");
  const [startTime, setStart] = useState("");
  const [endTime, setEnd] = useState("");
  const [date, setDate] = useState(new Date());
  const [sendingDate, setSendingDate] = useState(new Date());
  const [color, setColor] = useState("#2196f3");
  const [taken_by, setTakenBy] = useState("");
  const [members, setMembers] = useState([]);
  const [student, setStudent] = useState("");
  const [students, setStudents] = useState([]);
  const id = localStorage.getItem("id");
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
      endTime,
      member: id,
    };
    axios
      .post(`https://crm.internationaleducationoffice.co.uk/schedules`, data, config)
      .then((response) => {
        console.log(response.data);
        alert("Event added");
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

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        style={{
          margin: "",
        }}
      >
        <h4 className="fw-bold">Add Event</h4>
        <Form.Group as={Row} controlId="title">
          <Form.Label column sm="2" className="mt-2 fw-bold">
            Title:
          </Form.Label>
          <Col sm="10"  className="mt-3">
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="date">
          <Form.Label column sm="2" className="fw-bold">
            Date:
          </Form.Label>
          <Col sm="10"  className="mt-3">
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
          <Form.Label column sm="2" className="mt-3 fw-bold">
            Start time:
          </Form.Label>
          <Col sm="10" className="mt-3">
            <Form.Control
              type="time"
              value={startTime}
              onChange={(e) => setStart(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="endTime">
          <Form.Label column sm="2" className="mt-3 fw-bold">
            End time:
          </Form.Label>
          <Col sm="10" className="mt-3">
            <Form.Control
              type="time"
              value={endTime}
              onChange={(e) => setEnd(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="takenBy">
          <Form.Label column sm="2" className="mt-3 fw-bold">
            Taken by:
          </Form.Label>
          <Col sm="10" className="mt-3">
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
          <Form.Label column sm="2" className="fw-bold">
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
          <Form.Label column sm="2" className="mt-3 fw-bold">
            Event Color:
          </Form.Label>
          <Col sm="10" className="mt-4">
            <Form.Control
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button type="submit" className="px-4 mt-3">Add</Button>
      </Form>
    </Container>
  );
};

export default EventForm;
