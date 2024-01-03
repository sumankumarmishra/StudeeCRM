import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { Form, Button } from "react-bootstrap";

const EmailModel = ({
  selectedRow,
  setPopupText,
  setPopupshow,
  applicationId,
  setPopupColor,
}) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState(selectedRow);
  const [subject, setSubject] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const token = localStorage.getItem("ieodkvToken");

  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState({});
  const id = localStorage.getItem("id");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get("https://crm.internationaleducationoffice.co.uk/templates", config)
      .then((response) => {
        const filter = response.data.filter((row) => row.medium !== "SMS");
        setTemplates(filter);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [templates]);

  useEffect(() => {
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/members/member1/${id}`,
        config
      )
      .then((response) => {
        setFrom(response.data?.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [from]);

  const handleEmail = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://studyapi.ieodkv.com/communication/bySMPT`,
        {
          from: from,
          to: selectedRow,
          subject: subject,
          created_by: id,
          applicationId: applicationId,
          html: htmlContent,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        setHtmlContent("");
        setSubject("");
        setPopupColor("green");
        setPopupshow(true);
        setPopupText(`${response.data} to ${selectedRow}`);
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        setPopupshow(false);

        if (error.response.data) {
          toast.success(
            `${error.response.data.message}\n${JSON.stringify(
              error.response.data.error
            )}`,
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              style: {
                background: "red",
                color: "#fff", // Text color
              },
              progressBarStyle: {
                background: "#fff", // White progress bar
              },
              icon: "⚠️", // You can customize the icon as needed
              iconTheme: {
                primary: "#fff", // White icon color
                secondary: "red", // Icon background color
              },
            }
          );
        } else {
          toast.success(`Network error`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            style: {
              background: "red",
              color: "#fff", // Text color
            },
            progressBarStyle: {
              background: "#fff", // White progress bar
            },
            icon: "⚠️", // You can customize the icon as needed
            iconTheme: {
              primary: "#fff", // White icon color
              secondary: "red", // Icon background color
            },
          });
        }
      });
  };

  return (
    <Form onSubmit={handleEmail}>
      <ToastContainer />
      <Form.Group>
        <Form.Label className="fw-bold mt-2">From</Form.Label>
        <Form.Control
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          readOnly
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="fw-bold mt-2">To</Form.Label>
        <p>{selectedRow}</p>
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label className="pt-2 fw-bold">Select template</Form.Label>
        <Form.Control
          as="select"
          value={template}
          onChange={(e) => {
            setTemplate(e.target.value);
            const filterTemplates = templates.find(
              (row) => row.name === e.target.value
            );
            setSubject(filterTemplates?.subject);
            setHtmlContent(filterTemplates?.message);
          }}
        >
          <option value="">Select template</option>
          {templates.map((row, index) => (
            <option value={row.name} key={index}>
              {row.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group className="mt-2 fw-bold">
        <Form.Label>Subject</Form.Label>
        <Form.Control
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label className="fw-bold mt-2">Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Message"
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
        />
      </Form.Group>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
      <Button variant="btn btn-primary green_bg_logo mt-3" type="submit">
        Send Email
      </Button>
    </Form>
  );
};

export default EmailModel;
