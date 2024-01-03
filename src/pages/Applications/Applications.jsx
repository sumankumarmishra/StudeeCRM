import "../../style/list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableApplications from "./DatatableApplications";
import DatatableUnassigned from "./DatatableUnassigned";
import { IoAddCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import axios from "axios";

const Applications = () => {
  const [selectedTable, setSelectedTable] = useState("Assigned Applications");
  const [emptyApplications, setEmptyApplications] = useState(0);
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/reports/dashboard",
        config
      )
      .then((response) => {
        setEmptyApplications(response.data.emptyApplications);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [emptyApplications]);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "10px 10px",
          }}
        >
          <div style={{ margin: "10px 20px" }}>
            <Button
              className="mx-3"
              variant={
                selectedTable === "Assigned Applications"
                  ? "btn btn-primary green_bg_logo"
                  : "secondary"
              }
              onClick={() => setSelectedTable("Assigned Applications")}
            >
              Assigned Applications
            </Button>

            <Button
              variant={
                selectedTable === "Unassigned Applications"
                  ? "btn btn-primary green_bg_logo"
                  : "secondary"
              }
              onClick={() => setSelectedTable("Unassigned Applications")}
            >
              Unassigned Applications ({emptyApplications})
            </Button>
          </div>

          <Link to="/applications/new" state={{ application: true }}>
            {/* <IoAddCircleSharp
              className="green_logo mt-2"
              style={{ cursor: "pointer" }}
              size={40}
            /> */}
            <button
              className="btn btn-primary mt-2"
              style={{
                backgroundColor: "#2F9444",
                border: "none",
                height: "38px",
              }}
            >
              <i class="fa-solid fa-plus me-1"></i>Create Application
            </button>
          </Link>
        </div>
        {selectedTable === "Assigned Applications" ? (
          <DatatableApplications />
        ) : (
          ""
        )}
        {selectedTable === "Unassigned Applications" ? (
          <DatatableUnassigned />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Applications;
