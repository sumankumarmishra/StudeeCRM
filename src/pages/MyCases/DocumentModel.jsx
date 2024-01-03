import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Form, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DocumentModel = ({ selectedRow, list, newApp }) => {
  const [name, setName] = useState(null);
  const [document, setDocument] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [reminder, setReminder] = useState(false);
  const [reminder_date, setReminderDate] = useState("");
  const token = localStorage.getItem("ieodkvToken");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/applications/applicationById/${selectedRow._id}`,
        config
      )
      .then((response) => {
        setDocuments(response.data.documents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("document", document);
    formData.append("name", name);
    formData.append("reminder_date", reminder ? reminder_date : "none");

    // if (document) {
    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/applications/upload/${selectedRow._id}`,
        formData,
        config
      )
      .then((response) => {
        setDocuments(response.data.documents);
        setReminder(false);
        setName("");
        setReminderDate("");
        alert("Document Added successfully");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          alert(error.response.data);
          window.location.reload();
        }
      });
    // } else {
    //   alert("Must upload document");
    // }
  };

  const handleDelete = (index, application) => {
    if (application) {
      axios
        .delete(
          `https://crm.internationaleducationoffice.co.uk/applications/delete_document/${selectedRow._id}/${index}`,
          config
        )
        .then((response) => {
          console.log(response.data);
          alert("Document Deleted successfully");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .delete(
          `https://crm.internationaleducationoffice.co.uk/students/delete_document/${selectedRow.studentId._id}/${index}`,
          config
        )
        .then((response) => {
          console.log(response.data);
          alert("Document deleted successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label className="fw-bold">Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="fw-bold pt-2">File</Form.Label>
          <Form.Control
            type="file"
            id="myFile"
            name="myFile"
            onChange={(e) => {
              setDocument(e.target.files[0]);
            }}
            style={{ marginBottom: 10 }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Reminder"
            checked={reminder}
            onChange={(e) => setReminder(e.target.checked)}
          />
        </Form.Group>
        {reminder ? (
          <Form.Group>
            <Form.Label className="fw-bold pt-2">Reminder date</Form.Label>
            <Form.Control
              type="date"
              value={reminder_date}
              onChange={(e) => setReminderDate(e.target.value)}
            />
          </Form.Group>
        ) : (
          ""
        )}
        <Button variant="primary" className="mt-3" onClick={handleUpload}>
          Upload
        </Button>
      </Form>

      <h6 className="mt-3">Mandatory documents</h6>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((row, index) => {
              const findDocument = documents?.find((item) => item.name === row);
              return (
                <tr key={index}>
                  <td>{row}</td>

                  <td>
                    {findDocument && findDocument.document ? (
                      <i className="fas fa-check-circle text-success"></i>
                    ) : findDocument && !findDocument.document ? (
                      <i className="fas fa-times-circle text-danger"></i>
                    ) : (
                      <i
                        onClick={() => setName(row)}
                        style={{ cursor: "pointer" }}
                        className="fas fa-pencil"
                      ></i>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <h6 className="mt-3">Additional documents</h6>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Reminder Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.date}</td>
              <td>{row.reminder_date}</td>
              <td>
                {row.document ? (
                  <>
                    <a
                      href={`https://crm.internationaleducationoffice.co.uk/applications/docs/${row.document}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginRight: 10, textDecoration: "none" }}
                    >
                      <i className="fas fa-eye text-info"></i>
                    </a>
                    <i
                      onClick={() => handleDelete(index, true)}
                      style={{ cursor: "pointer" }}
                      className="fas fa-trash"
                    ></i>
                  </>
                ) : (
                  <i
                    onClick={() => {
                      setName(row.name);
                      if (row.reminder_date !== "none") {
                        setReminder(true);
                        setReminderDate(row.reminder_date);
                      }
                    }}
                    style={{ cursor: "pointer" }}
                    className="fas fa-pencil"
                  ></i>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {newApp && (
        <Button
          style={{ width: "10%" }}
          onClick={(e) => {
            e.preventDefault();
            if (role === "superadmin") {
              navigate("/applications");
            } else {
              navigate("/my-cases");
            }
          }}
        >
          Done
        </Button>
      )}
    </>
  );
};

export default DocumentModel;
