import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const SendNotice = ({
  setPopupColor,
  setAddModal,
  setPopupText,
  setPopupshow,
}) => {
  const token = localStorage.getItem("ieodkvToken");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // text formatting options
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // header styles
      [{ list: "ordered" }, { list: "bullet" }], // lists
      ["link", "image"], // link and image options
      [{ color: [] }], // color option
      [{ align: [] }], // text alignment option
      [{ size: ["small", false, "large", "huge"] }],
      [{ font: [] }], // custom font style option
      ["clean"], // remove formatting
    ],
  };

  const quillFormats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "header",
    "list",
    "bullet",
    "link",
    "image",
    "color",
    "align",
    "font",
    "size",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { title, description };
    axios
      .post(`https://crm.internationaleducationoffice.co.uk/notices`, data, config)
      .then((response) => {
        setAddModal(false);
        setTitle("");
        setPopupColor("green");
        setPopupshow(true);
        setPopupText("Notice sent");
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 1000);
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
        <Form.Label className="fw-bold">Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formAddress">
        <Form.Label className="pt-2 fw-bold">Description</Form.Label>{" "}
        <ReactQuill
          value={description}
          onChange={(value) => setDescription(value)}
          modules={quillModules}
          formats={quillFormats}
          placeholder="Write something..."
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
};

export default SendNotice;
