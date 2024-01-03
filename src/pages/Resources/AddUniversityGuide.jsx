import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { debounce } from "lodash";

const AddUniversityGuide = ({
  setPopupColor,
  allUniversities,
  setAddModal,
  setPopupText,
  setPopupshow,
}) => {
  const token = localStorage.getItem("ieodkvToken");
  const [university, setUniversity] = useState("");
  const [entryRequirements, setEntryRequirements] = useState("");
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
  const debouncedSubmit = debounce((data) => {
    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/universities/guide/${university}`,
        data,
        config
      )
      .then((response) => {
        setAddModal(false);
        setUniversity("");
        setPopupColor("green");
        setPopupshow(true);
        setPopupText("Entry requirement added");
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
  }, 500); // Adjust the delay as needed (e.g., 500 milliseconds)

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { entryRequirements: entryRequirements };
    debouncedSubmit(data);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <p style={{ color: "red", fontSize: 20 }}>{errorMessage}</p>
      <Form.Group controlId="formCountry">
        <Form.Label className="pt-2 fw-bold">University</Form.Label>
        <Form.Control
          as="select"
          value={university}
          required
          onChange={(e) => {
            setUniversity(e.target.value);
            const findUniversity = allUniversities.find(
              (row) => row._id === e.target.value
            );
            setEntryRequirements(findUniversity.entryRequirements);
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

      <Form.Group controlId="formAddress">
        <Form.Label className="pt-2 fw-bold">Entry Requirement</Form.Label>
        <ReactQuill
          value={entryRequirements}
          className="ql-container"
          onChange={(value) => setEntryRequirements(value)}
          modules={quillModules}
          formats={quillFormats}
          placeholder="Write something..."
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="submit-button">
        Submit
      </Button>
    </Form>
  );
};

export default AddUniversityGuide;
