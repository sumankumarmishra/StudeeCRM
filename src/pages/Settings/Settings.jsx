import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Navbar,
} from "react-bootstrap";
import axios from "axios";
import "../../style/list.scss";
import "./Settings.css";
import Sidebar from "../../components/sidebar/Sidebar";

const Settings = () => {
  const [settings, setSettings] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [activeValues, setActiveValues] = useState([]);
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get("https://crm.internationaleducationoffice.co.uk/settings/heading", config)
      .then((response) => {
        const setting = response.data;
        setSettings(setting);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (settings.length > 0) {
      const mappedData = settings.flatMap((item) => item.data);
      const activeData = mappedData.map((item) => ({
        name: item.name,
        active: item.active,
      }));
      setActiveValues(activeData);

      const reminderSettings = settings.find(
        (setting) => setting.heading === "Reminder settings"
      );

      if (reminderSettings) {
        const reminderInputsData = reminderSettings.data.map((item) => ({
          name: item.name,
          inputValue: item.inputValue,
        }));
        setInputValues(reminderInputsData);
      }
    }
  }, [settings]);

  const handleInputChange = (value, item) => {
    // Find the corresponding input value in the reminderInputs array
    const updatedInputs = inputValues.map((input) =>
      input.name === item.name ? { ...input, inputValue: value } : input
    );

    // Update the reminderInputs state with the modified input value
    setInputValues(updatedInputs);
  };

  const handleCheckboxChange = (e, name) => {
    console.log(e.target.checked, name);
    const value = e.target.checked;
    const updatedValues = activeValues.map((input) =>
      input.name === name ? { ...input, active: value } : input
    );
    setActiveValues(updatedValues);
  };

  const handleSubmit = (id, name, heading) => {
    const activeFind = activeValues.find(
      (activeValue) => activeValue.name === name
    );

    const inputFind = inputValues.find(
      (inputValue) => inputValue.name === name
    );
    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/settings/${id}`,
        {
          inputValue:
            heading === "Reminder settings" ? inputFind.inputValue : null,
          active: activeFind.active,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        setTimeout(() => {
          window.location.reload();
        }, 800);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Container>
          <Row>
            <Col xs={12} md={1}>
              {/* Sidebar */}
              {/* Include your Sidebar component here */}
            </Col>

            <Col xs={12} md={9}>
              {/* Main Content */}
              <Navbar bg="light" expand="lg">
                {/* Include your Navbar component here */}
              </Navbar>
              <div className="main-settings">
                {settings.map((row) => (
                  <div className="container-settings" key={row.heading}>
                    <h1>{row.heading}</h1>
                    {row.data.map((item) => (
                      <div className="radio-button-group" key={item.name}>
                        <Form.Check
                          type="checkbox"
                          label={item.name}
                          checked={
                            activeValues.find(
                              (input) => input.name === item.name
                            )?.active || false
                          }
                          onChange={(e) => handleCheckboxChange(e, item.name)}
                        />
                        {row.heading === "Reminder settings" && (
                          <InputGroup>
                            <Form.Control
                              type="text"
                              value={
                                inputValues.find(
                                  (input) => input.name === item.name
                                )?.inputValue || ""
                              }
                              onChange={(e) =>
                                handleInputChange(e.target.value, item)
                              }
                            />
                            <InputGroup.Append>
                              <Button
                                className="btn btn-primary green_bg_logo"
                                onClick={() =>
                                  handleSubmit(item._id, item.name, row.heading)
                                }
                              >
                                Save
                              </Button>
                            </InputGroup.Append>
                          </InputGroup>
                        )}
                        {row.heading !== "Reminder settings" && (
                          <Button
                            className="btn btn-primary green_bg_logo"
                            onClick={() =>
                              handleSubmit(item._id, item.name, row.heading)
                            }
                          >
                            Save
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Settings;
