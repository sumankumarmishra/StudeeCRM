import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const SMSModal = ({
  selectedRow,
  setPopupText,
  applicationId,
  setPopupshow,
  setPopupColor,
}) => {
  const [to, setTo] = useState(selectedRow);
  const [body, setBody] = useState("");
  const token = localStorage.getItem("ieodkvToken");
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState({});

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    axios
      .get("https://crm.internationaleducationoffice.co.uk/templates", config)
      .then((response) => {
        const filter = response.data.filter((row) => row.medium === "SMS");
        setTemplates(filter);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [templates]);

  const handleSMS = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://crm.internationaleducationoffice.co.uk/communication/sms`,
        {
          to: selectedRow,
          body: body,
          applicationId: applicationId,
        },
        config
      )
      .then((response) => {
        // setOpenSMSModal(false);
        setBody("");
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
    <Form onSubmit={handleSMS}>
      <ToastContainer />

      <Form.Group>
        <Form.Label className="fw-bold">Number</Form.Label>
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
            setBody(filterTemplates?.body);
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
      <Form.Group className="mt-2">
        <Form.Label className="fw-bold">SMS</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Message"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </Form.Group>
      <p>
        {body.length} character - {Math.ceil(body.length / 161)} message
      </p>

      <Button
        className="mt-3"
        variant="btn btn-primary green_bg_logo"
        type="submit"
      >
        Send SMS
      </Button>
    </Form>
  );
};

export default SMSModal;
