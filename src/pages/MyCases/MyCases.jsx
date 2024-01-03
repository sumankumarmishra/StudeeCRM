import "../../style/list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableMyCases from "./DatatableMyCases";
import DatatableCurrent from "./DatatableCurrent";
import DatatablePastDesk from "./DatatablePastDesk";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoAddCircleSharp } from "react-icons/io5";
import Button from "react-bootstrap/Button";

const MyCases = () => {
  const role = localStorage.getItem("role");
  const roleId = localStorage.getItem("roleId");
  const [createField, setCreateField] = useState(false);
  const [selectedTable, setSelectedTable] = useState("Current Desk");
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (role === "sub-agent") {
      setSelectedTable("My Cases");
    }
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/roles/${roleId}`,
        config
      )
      .then((response) => {
        setCreateField(response.data.table.createField);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          {role !== "sub-agent" && (
            <>
              <div style={{ margin: "0px 20px" }}>
                <Button
                  variant={
                    selectedTable === "Current Desk"
                      ? "btn btn-primary green_bg_logo"
                      : "secondary"
                  }
                  onClick={() => setSelectedTable("Current Desk")}
                >
                  Current Desk
                </Button>

                <Button
                  className="mx-2"
                  variant={
                    selectedTable === "My Cases"
                      ? "btn btn-primary green_bg_logo"
                      : "secondary"
                  }
                  onClick={() => setSelectedTable("My Cases")}
                >
                  My Cases
                </Button>

                <Button
                  variant={
                    selectedTable === "Past Desk"
                      ? "btn btn-primary green_bg_logo"
                      : "secondary"
                  }
                  onClick={() => setSelectedTable("Past Desk")}
                >
                  Past Desk
                </Button>
              </div>
            </>
          )}
          {createField ? (
            <Link to="/applications/new" state={{ application: false }}>
              {/* <IoAddCircleSharp
                className="green_logo"
                style={{ cursor: "pointer" }}
                size={40}
              /> */}
              <button
                className="btn btn-primary me-3"
                style={{ backgroundColor: "#2F9444", border: "none" }}
              >
                <i class="fa-solid fa-plus me-1"></i>Create Application
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>
        {role !== "sub-agent" && selectedTable === "Current Desk" ? (
          <DatatableCurrent />
        ) : (
          ""
        )}
        {selectedTable === "My Cases" ? <DatatableMyCases /> : ""}
        {role !== "sub-agent" && selectedTable === "Past Desk" ? (
          <div>
            <DatatablePastDesk />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MyCases;
