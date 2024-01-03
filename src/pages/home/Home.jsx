import Sidebar from "../../components/sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import "../../style/datatable.css";
import "../../style/new.scss";
import Widget from "../../components/widget/Widget";
import { Table, Button, Pagination } from "react-bootstrap";
import axios from "axios";

const Home = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("ieodkvToken");
  const [university_wise, setTotalUniWise] = useState([]);
  const [source_wise, setTotalSourceWise] = useState([]);
  const [current_desk_wise, setTotalCurrentDeskWise] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = university_wise.slice(indexOfFirstItem, indexOfLastItem);
  // const tokenCookie = document.cookie
  //   .split("; ")
  //   .find((row) => row.startsWith("ieodkvToken="));
  // const token = tokenCookie ? tokenCookie.split("=")[1] : null;

  // console.log(tokenCookie);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/reports/university_wise",
        config
      )
      .then((response) => {
        setTotalUniWise(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/reports/source_wise",
        config
      )
      .then((response) => {
        setTotalSourceWise(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/reports/current_desk_wise",
        config
      )
      .then((response) => {
        setTotalCurrentDeskWise(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [university_wise, source_wise, current_desk_wise]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        {role !== "sub-agent" ? (
          <div className="widgets">
            <Widget
              color="red_logo"
              background_color="red_bg_logo"
              type="students"
            />
            <Widget
              color="orange_logo"
              background_color="orange_bg_logo"
              type="universities"
            />
            <Widget
              color="blue_logo"
              background_color="blue_bg_logo"
              type="programs"
            />
          </div>
        ) : (
          ""
        )}
        {role !== "sub-agent" ? (
          <div className="widgets">
            <Widget
              color="green_logo"
              background_color="green_bg_logo"
              type="applications"
            />
            <Widget
              color="black_logo"
              background_color="black_bg_logo"
              type="cities"
            />
            <Widget
              color="yellow_logo"
              background_color="yellow_bg_logo"
              type="countries"
            />
          </div>
        ) : (
          <div className="widgets">
            <Widget
              color="red_logo"
              background_color="red_bg_logo"
              type="applications"
            />
          </div>
        )}
        {role !== "sub-agent" ? (
          <div className="widgets">
            <Widget
              color="red_logo"
              background_color="red_bg_logo"
              type="documents"
            />
            <Widget
              color="orange_logo"
              background_color="orange_bg_logo"
              type="sub_agents"
            />
            {role === "superadmin" ? (
              <Widget
                color="blue_logo"
                background_color="blue_bg_logo"
                type="staffs"
              />
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        <div style={{ display: "flex", width: "100%" }}>
          <div className="" style={{ width: "100%", marginLeft: "2px" }}>
            <Table
              style={{ width: "93%", margin: "20px" }}
              striped
              bordered
              hover
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>No. of Applications</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((customField, index) => (
                  <tr key={index}>
                    <td>{customField.name}</td>
                    <td>{customField.length}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="pagination-container ms-4">
              <Pagination>
                {Array.from(
                  { length: Math.ceil(university_wise.length / itemsPerPage) },
                  (_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  )
                )}
              </Pagination>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <Table
              style={{ width: "93%", margin: "20px" }}
              striped
              bordered
              hover
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>No. of Applications</th>
                </tr>
              </thead>
              <tbody>
                {current_desk_wise.map((current_desk, index) => (
                  <tr key={index}>
                    <td>{current_desk.name}</td>
                    <td>{current_desk.length}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* <div className="pagination-container ms-4">
              <Pagination>
                {Array.from(
                  { length: Math.ceil(university_wise.length / itemsPerPage) },
                  (_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  )
                )}
              </Pagination>
            </div> */}
          </div>
          <div style={{ width: "100%" }}>
            <Table
              style={{ width: "92%", marginLeft: "20px" }}
              striped
              bordered
              hover
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>No. of Applications</th>
                </tr>
              </thead>
              <tbody>
                {source_wise.map((source, index) => (
                  <tr key={index}>
                    <td>{source.name}</td>
                    <td>{source.length}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
