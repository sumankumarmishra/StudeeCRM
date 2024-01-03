import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const NewEmail = ({
  setPopupColor,
  setPopupshow,
  setPopupText,
  setOpenAddModal,
  member,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [port, setPort] = useState(0);
  const [host, setHost] = useState("");
  const token = localStorage.getItem("ieodkvToken");
  const [errorMessage, setErrorMessage] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      port: port,
      host: host,
      password: password,
    };
    axios
      .post("https://crm.internationaleducationoffice.co.uk/uni-emails", data, config)
      .then((response) => {
        setPopupshow(true);
        setEmail("");
        setPassword("");
        setPort(0);
        setHost("");
        setPopupColor("green");
        setPopupText(`Email Added`);
        setOpenAddModal(false);
        setTimeout(() => {
          setPopupshow(false);
          if (member) {
            window.location.reload();
          }
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
    <Form onSubmit={handleSubmit}>
      <p style={{ color: "red", fontSize: 20 }}>{errorMessage}</p>
      <Form.Group controlId="formName">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formAddress">
        <Form.Label className="pt-2">Password</Form.Label>
        <Form.Control
          type="text"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formAddress">
        <Form.Label className="pt-2">Port</Form.Label>
        <Form.Control
          type="number"
          placeholder="Port"
          value={port}
          required
          onChange={(e) => setPort(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formAddress">
        <Form.Label className="pt-2">Host</Form.Label>
        <Form.Control
          type="text"
          placeholder="Host"
          value={host}
          required
          onChange={(e) => setHost(e.target.value)}
        />
      </Form.Group>

      <Button className="mt-3" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default NewEmail;
