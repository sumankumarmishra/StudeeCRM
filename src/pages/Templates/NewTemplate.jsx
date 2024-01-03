import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const NewTemplate = ({
  setPopupColor,
  setPopupText,
  setPopupshow,
  config,
  setOpenAddModal,
  allMediums,
  allUniversities,
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [target, setTarget] = useState("");
  const [sendTo, setSendTo] = useState("");
  const [time, setTime] = useState();
  const [medium, setMedium] = useState("");
  const [body, setBody] = useState("");
  const [university, setUniversity] = useState(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Add member
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      type: type,
      time: time,
      target: target,
      sendTo: sendTo,
      name: name,
      body: body,
      university: university,
      medium: medium,
      message: message,
      subject: subject,
    };
    axios
      .post("https://crm.internationaleducationoffice.co.uk/templates", data, config)
      .then((response) => {
        setPopupColor("green");
        setPopupshow(true);
        setPopupText(`Template Added`);
        setOpenAddModal(false);
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 800);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          setErrorMessage(error.response.data);
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
      <p style={{ color: "red", fontSize: 20 }}>{errorMessage}</p>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formCountry">
        <Form.Label className="pt-2">University</Form.Label>
        <Form.Control
          as="select"
          value={university}
          onChange={(e) => {
            setUniversity(e.target.value);
          }}
        >
          <option value="">Select university</option>
          {allUniversities.map((row, index) => (
            <option value={row._id} key={index}>
              {row.universityName}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formCountry">
        <Form.Label className="pt-2">Medium</Form.Label>
        <Form.Control
          as="select"
          value={medium}
          onChange={(e) => {
            setMedium(e.target.value);
          }}
          required
        >
          <option value="">Select medium</option>
          {allMediums.map((row, index) => (
            <option value={row.name} key={index}>
              {row.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>{" "}
      <Form.Group controlId="formCountry">
        <Form.Label className="pt-2">Send to</Form.Label>
        <Form.Control
          as="select"
          value={sendTo}
          onChange={(e) => {
            setSendTo(e.target.value);
          }}
          required
        >
          <option value="">Select send to option</option>
          <option value="Students">Students</option>
          <option value="Staff">Staff</option>
        </Form.Control>
      </Form.Group>
      {sendTo === "Students" ? (
        <Form.Group controlId="formCountry">
          <Form.Label className="pt-2">Target</Form.Label>
          <Form.Control
            as="select"
            value={target}
            onChange={(e) => {
              setTarget(e.target.value);
            }}
          >
            <option value="">Select target</option>
            <option value="Website">Website Applications</option>
            <option value="Form/Manual">Form Applications</option>
          </Form.Control>
        </Form.Group>
      ) : (
        ""
      )}
      <Form.Group controlId="formCountry">
        <Form.Label className="pt-2">Select Reminder time</Form.Label>
        <Form.Control
          as="select"
          value={type}
          required
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value=""></option>
          <option value="Instant">Instant</option>
          <option value="Reminder-1">Reminder 1</option>
          <option value="Reminder-2">Reminder 2</option>
        </Form.Control>
      </Form.Group>
      {type === "Reminder-1" || type === "Reminder-2" ? (
        <Form.Group controlId="formCountry">
          <Form.Label>Add time (per hour)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </Form.Group>
      ) : (
        ""
      )}
      {medium !== "SMS" ? (
        <>
          <Form.Group controlId="formName">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Subject"
              value={subject}
              required={medium !== "SMS" ? true : false}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              cols={10}
              rows={10} // You can adjust the number of rows as needed
              placeholder="Message"
              value={message}
              required={medium !== "SMS" ? true : false}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
          <p dangerouslySetInnerHTML={{ __html: message }}></p>
        </>
      ) : (
        <Form.Group controlId="formName">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            cols={10}
            rows={10} // You can adjust the number of rows as needed
            placeholder="Message"
            value={body}
            required={medium === "SMS" ? true : false}
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>
      )}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default NewTemplate;
