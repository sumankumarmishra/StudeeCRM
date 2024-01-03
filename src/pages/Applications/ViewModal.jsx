import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";

const ViewModal = ({ data, keys, id }) => {
  const [fields, setFields] = useState([]);
  const [application, setApplication] = useState({});
  const role = localStorage.getItem("role");

  const excludedKeys = [
    "studentId",
    "universityId",
    "desks",
    "logs",
    "programId",
    "case_owner",
    "current_desk",
    "activity",
    "reminders",
    "dynamicFields",
    "documents",
  ];

  useEffect(() => {
    let filterKeys = [];
    if (role !== "superadmin") {
      filterKeys = keys.filter(
        (row) => row.read === true && !excludedKeys.includes(row.name)
      );
    } else {
      filterKeys = keys.filter((row) => !excludedKeys.includes(row.name));
    }
    setFields(filterKeys);
    const filterApplication = data.find((row) => row._id === id);
    setApplication(filterApplication);
  }, [fields, application]);

  function formatLabel(key) {
    if (!key) {
      return "";
    }

    const formatted = key
      .replace(/([a-z])([A-Z])/g, "$1 $2") // add space before capital letters
      .replace(/_/g, " ") // replace underscores with spaces
      .toLowerCase(); // convert the string to lowercase

    switch (key.toLowerCase()) {
      case "firstname":
        return "First name";
      case "lastname":
        return "Last name";
      case "startmonth":
        return "Session month";
      case "startyear":
        return "Session year";
      case "programtype":
        return "Degree type";
      case "cgpa":
        return "CGPA";
      case "lastname":
        return "Last name";
      case "programid":
        return "Program";
      case "universityid":
        return "University";
      default:
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }
  }
  return (
    <Modal.Body>
      <div
        style={{
          maxHeight: "500px",
          maxWidth: "1000px !important",
          overflowY: "auto",
        }}
      >
        <Table
          style={{ maxWidth: "1000px !important" }}
          striped
          bordered
          hover
          responsive
        >
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((row, index) => {
              const filterName = formatLabel(row.name);
              if (row.type !== "Date") {
                return (
                  <tr key={index}>
                    <td style={{ fontWeight: "bold" }}>{filterName}</td>
                    <td>
                      {application &&
                      application[`${row.name}`] &&
                      row.name !== "programType"
                        ? application[`${row.name}`]
                        : application &&
                          application[`${row.name}`] &&
                          row.name === "programType"
                        ? `${application[`${row.name}`]?.name} - ${
                            application[`${row.name}`]?.graduate
                          }`
                        : "-"}
                    </td>
                  </tr>
                );
              } else {
                const dateKey = `${row.name}Date`; // Assuming row.name is "date_of_offer"
                const monthKey = `${row.name}Month`; // Assuming row.name is "date_of_offer"
                const yearKey = `${row.name}Year`; // Assuming row.name is "date_of_offer"
                const dateValue = application && application[dateKey];
                const monthValue = application && application[monthKey];
                const yearValue = application && application[yearKey];
                return (
                  <tr key={index}>
                    <td style={{ fontWeight: "bold" }}>{filterName}</td>
                    <td>
                      {dateValue || monthValue || yearValue ? (
                        <>
                          {dateValue ? `${application[dateKey]} - ` : ""}
                          {monthValue ? `${application[monthKey]} - ` : ""}
                          {yearValue ? application[yearKey] : ""}
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
      </div>
    </Modal.Body>
  );
};

export default ViewModal;
