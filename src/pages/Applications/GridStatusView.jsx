import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const GridStatusView = ({ data }) => {
  const userId = localStorage.getItem("id");
  const [status_filter, setStatusFilter] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [allStatuses, setAllStatuses] = useState([]);

  const token = localStorage.getItem("ieodkvToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    try {
      const sessionStorage = localStorage.getItem(`statusFilter${userId}`);
      const userGet = JSON.parse(sessionStorage);
      setStatusFilter(userGet || []);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    try {
      const sessionStorage = localStorage.getItem(`statuses`);
      const userGet = JSON.parse(sessionStorage);
      setAllStatuses(userGet);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    const check = allStatuses.map((row) => row.name);
    if (check.every((status) => status_filter.includes(status))) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [status_filter]);

  const handleUpdate = (name, checked) => {
    if (checked) {
      // If checked, add to the array
      setStatusFilter((prevFilter) => [...prevFilter, name]);
    } else {
      // If unchecked, remove from the array
      setStatusFilter((prevFilter) =>
        prevFilter.filter((status) => status !== name)
      );
    }
  };
  const handleSelectAll = (name, checked) => {
    if (checked) {
      setSelectAll(checked);
      // If checked, add to the array
      const filter = allStatuses.map((row) => row.name);
      setStatusFilter(filter);
    } else {
      setSelectAll(checked);
      // If unchecked, remove from the array
      setStatusFilter([]);
    }
  };

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/members/status/filter`,
        { status_filter: status_filter },
        config
      )
      .then((response) => {
        setStatusFilter(response.data);
        localStorage.setItem(
          `statusFilter${userId}`,
          JSON.stringify(response.data)
        );
        alert("Application filter applied");
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
            Select All
          </p>
        </div>
        {allStatuses.map((row, index) => {
          return (
            <div style={{ display: "flex", margin: "20px" }} key={index}>
              <input
                style={{ margin: "0px 5px", height: "25px", width: "35px" }}
                type="checkbox"
                checked={status_filter.includes(row.name)}
                onChange={(e) => handleUpdate(row.name, e.target.checked)}
              />
              <p
                style={{ margin: "0px 5px", fontSize: "20px" }}
                className="fw-bold"
              >
                {row.name}
              </p>
            </div>
          );
        })}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px",
            height: "40px",
          }}
        >
          <Button onClick={handleUpdateStatus}>Update</Button>
        </div>
      </div>
    </Form>
  );
};

export default GridStatusView;
