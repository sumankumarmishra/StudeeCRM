import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const GridView = () => {
  const userId = localStorage.getItem("id");
  const [showFields, setShowFields] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const token = localStorage.getItem("ieodkvToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    try {
      const sessionStorage = localStorage.getItem(`userData${userId}`);
      const userGet = JSON.parse(sessionStorage);
      setShowFields(userGet);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const check = showFields.every((row) => row.show === true);
    if (check) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [showFields]);

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
      case "notes":
        return "Remarks";
      case "status":
        return "Admission Status";
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

  const handleUpdate = (index, checked) => {
    setShowFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, show: checked } : field
      )
    );
  };

  const handleSelectAll = (name, checked) => {
    if (checked) {
      setSelectAll(checked);
      setShowFields((prevFields) =>
        prevFields.map((field) => ({ ...field, show: true }))
      );
    } else {
      setSelectAll(checked);
      // If unchecked, remove from the array
      setShowFields((prevFields) =>
        prevFields.map((field) => ({ ...field, show: false }))
      );
    }
  };

  const handleUpdateGrid = (e) => {
    e.preventDefault();
    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/members/grid/filter`,
        { showFields: showFields },
        config
      )
      .then((response) => {
        setShowFields(response.data);
        localStorage.setItem(
          `userData${userId}`,
          JSON.stringify(response.data)
        );
        alert("Grid updated");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: "20px",
          height: "600px",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <div style={{ display: "flex", margin: "20px" }}>
          <input
            style={{ margin: "0px 5px", height: "25px", width: "35px" }}
            type="checkbox"
            checked={selectAll}
            onChange={(e) => handleSelectAll("All", e.target.checked)}
          />
          <p
            style={{ margin: "0px 5px", fontSize: "20px" }}
            className="fw-bold"
          >
            Select All{" "}
          </p>
        </div>
        {showFields.map((row, index) => {
          const formatKey = formatLabel(row.name);
          if (row.read) {
            return (
              <div style={{ display: "flex", margin: "20px" }}>
                <input
                  style={{ margin: "0px 5px", height: "25px", width: "35px" }}
                  type="checkbox"
                  checked={row.show}
                  onChange={(e) => handleUpdate(index, e.target.checked)}
                />
                <p
                  style={{ margin: "0px 5px", fontSize: "20px" }}
                  className="fw-bold"
                  key={index}
                >
                  {formatKey}
                </p>
              </div>
            );
          }
        })}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px",
            height: "40px",
          }}
        >
          <Button onClick={handleUpdateGrid}>Update</Button>
        </div>
      </div>
    </Form>
  );
};

export default GridView;
