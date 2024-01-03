import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";

const MassUpdate = ({
  selectedRows,
  setMassUpdate,
  setPopupText,
  config,
  setPopupColor,
  setPopupshow,
}) => {
  const [scholarship, setSchorship] = useState(0);
  const [annualTutionFees, setAnnualFees] = useState(0);
  const [duration, setDuration] = useState("");
  const [startData, setStartData] = useState([]);
  const [months, setMonths] = useState([]);
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [years, setYears] = useState([]);
  const [option, setOption] = useState("");
  const options = [
    { label: "Scholarship fees", key: "scholarship" },
    {
      label: "Annual tuition fees",
      key: "annualTutionFees",
    },
    { label: "Duration", key: "duration" },
    { label: "Sessions", key: "startData" },
  ];

  useEffect(() => {
    axios
      .get("https://crm.internationaleducationoffice.co.uk/core-settings/month")
      .then((response) => {
        setMonths(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://crm.internationaleducationoffice.co.uk/core-settings/year")
      .then((response) => {
        setYears(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [months, years]);

  const deleteItem = (indexToDelete) => {
    const updatedStartData = startData.filter(
      (_, index) => index !== indexToDelete
    );
    setStartData(updatedStartData);
  };

  const handleMassUpdate = (e) => {
    e.preventDefault();
    let data;

    data = {
      ids: selectedRows,
    };

    if (option === "scholarship") {
      data.scholarship = scholarship;
    } else if (option === "annualTutionFees") {
      data.annualTutionFees = annualTutionFees;
    } else if (option === "duration") {
      data.duration = duration;
    } else if (option === "startData") {
      data.startData = startData;
    }

    axios
      .patch(
        "https://crm.internationaleducationoffice.co.uk/programs/mass_update/programs",
        data,
        config
      )
      .then((response) => {
        setPopupshow(true);
        setPopupColor("orange");
        setMassUpdate(false);
        setPopupText(`${selectedRows.length} programs updated`);
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 2000);
      });
  };

  return (
    <Form onSubmit={handleMassUpdate}>
      <Form.Group controlId="formCountry">
        <Form.Label>Select field</Form.Label>
        <Form.Control
          as="select"
          value={option}
          onChange={(e) => {
            setOption(e.target.value);
          }}
        >
          <option value="">Select field</option>
          {options.map((row, index) => (
            <option value={row.key} key={index}>
              {row.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {option && option === "scholarship" && (
        <Form.Group controlId="formPhoneNo">
          <Form.Label>Add Scholarship value</Form.Label>
          <Form.Control
            type="number"
            placeholder="Scholarship"
            value={scholarship}
            onChange={(e) => setSchorship(e.target.value)}
          />
        </Form.Group>
      )}
      {option && option === "annualTutionFees" && (
        <Form.Group controlId="formPhoneNo">
          <Form.Label>Add annual fees value</Form.Label>
          <Form.Control
            type="number"
            placeholder="Annual tutition fees"
            value={annualTutionFees}
            onChange={(e) => setAnnualFees(e.target.value)}
          />
        </Form.Group>
      )}
      {option && option === "duration" && (
        <Form.Group controlId="formPhoneNo">
          <Form.Label>Add duration's value</Form.Label>
          <Form.Control
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </Form.Group>
      )}
      {option && option === "startData" && (
        <Form.Group controlId="formCountry">
          <Form.Label>Select session</Form.Label>
          <Form.Control
            as="select"
            value={startMonth}
            onChange={(e) => {
              setStartMonth(e.target.value);
            }}
          >
            <option value="">Select month</option>
            {months.map((row, index) => (
              <option value={row.name} key={index}>
                {row.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control
            as="select"
            value={startYear}
            onChange={(e) => {
              setStartYear(e.target.value);
            }}
          >
            <option value="">Select year</option>
            {years.map((row, index) => (
              <option value={row.name} key={index}>
                {row.name}
              </option>
            ))}
          </Form.Control>
          <div
            style={{
              cursor: "pointer",
              backgroundColor: "blue",
              color: "white",
              width: "50px",
              padding: "5px",
              margin: "10px",
            }}
            onClick={() => {
              setStartData([
                ...startData,
                { startMonth: startMonth, startYear: startYear },
              ]);
              setStartMonth("");
              setStartYear("");
            }}
          >
            Add
          </div>
        </Form.Group>
      )}

      <ul>
        {startData.map((row, index) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p key={index}>
              {" "}
              {index + 1}. {row.startMonth} {row.startYear}
            </p>
            <p style={{ cursor: "pointer" }} onClick={() => deleteItem(index)}>
              X
            </p>
          </div>
        ))}
      </ul>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default MassUpdate;
