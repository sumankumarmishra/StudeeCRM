import Sidebar from "../../components/sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import "./home.css";
import "../../style/datatable.css";
import "../../style/new.scss";
import { Table, Modal } from "react-bootstrap";
import axios from "axios";
import BarChart from "../../components/chart/BarChart";
import DonutChart from "../../components/chart/DonutChart";
import StatusChoose from "./StatusChoose";

const SubAgentHome = () => {
  const token = localStorage.getItem("ieodkvToken");
  const id = localStorage.getItem("id");
  const [university_wise, setTotalUniWise] = useState([]);
  const [source_wise, setTotalSourceWise] = useState([]);
  const [current_desk_wise, setTotalCurrentDeskWise] = useState([]);
  const [applied_today, setAppliedToday] = useState(0);
  const [month_status_wise, setMonthAndStatusWise] = useState([]);
  const [status_wise, setStatusWise] = useState([]);
  const [status_wise_only, setStatusWiseOnly] = useState([]);
  const [month_wise, setMonthWise] = useState([]);
  const [case_owner, setCaseOwner] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [modalOpen, setModal] = useState(false);
  const [presentStatus, setPresentStatus] = useState([
    "Application Received",
    "Offer Pending",
    "Conditional Offer",
  ]);

  const totalLength = month_wise.reduce(
    (total, item) => total + (item.length || 0),
    0
  );

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
        `https://crm.internationaleducationoffice.co.uk/applications/case/${id}`,
        config
      )
      .then((response) => {
        setCaseOwner(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/core-settings/lead-status",
        config
      )
      .then((response) => {
        setStatuses(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/reports/applied_today",
        config
      )
      .then((response) => {
        setAppliedToday(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/reports/status_wise",
        config
      )
      .then((response) => {
        setStatusWise(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/reports/status_wise/only",
        config
      )
      .then((response) => {
        setStatusWiseOnly(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/reports/month_status_wise",
        config
      )
      .then((response) => {
        setMonthAndStatusWise(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/reports/month_wise",
        config
      )
      .then((response) => {
        setMonthWise(response.data);
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
  }, [
    university_wise,
    month_status_wise,
    case_owner,
    month_wise,
    status_wise,
    applied_today,
    source_wise,
    current_desk_wise,
  ]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />

        <Modal
          show={modalOpen}
          onHide={() => {
            setModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">Select Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <StatusChoose
              setModal={setModal}
              setPresentStatus={setPresentStatus}
              statuses={statuses}
              presentStatus={presentStatus}
            />
          </Modal.Body>
        </Modal>

        {/* <div>
          <div>
            <div>Applications Submitted Today</div>
            <div>{applied_today}</div>
          </div>
          <div className="box-container donut-chart">
            <DonutChart applications={status_wise} />
          </div>
        </div>
        <div className="box-container">
          <BarChart applications={university_wise} />
        </div> */}

        <div className="container-fluid">
          <div className="pt-3 px-4">
            <h2 style={{ fontSize: "1.8rem" }} className="fw-bold">
              Applications Submitted Today ({applied_today})
            </h2>
          </div>

          <div className="row mt-3" style={{ height: "" }}>
            <div className="col-lg-5 pt-4 donut-chart">
              <DonutChart applications={status_wise_only} />
            </div>

            <div className="col box-conta">
              <BarChart applications={university_wise} />
            </div>
          </div>

          <div
            className="row mt-2"
            // style={{ display: "flex", width: "100%" }}
          >
            <button
              className="btn btn-primary"
              style={{
                backgroundColor: "#2F9444",
                marginLeft: "30px",
                border: "none",
                width: "170px",
              }}
              onClick={() => setModal(true)}
            >
              <i class="fa-solid fa-plus me-2"></i>Select Status
            </button>
            <div className="" style={{ width: "100%", marginLeft: "2px" }}>
              <Table
                style={{ width: "93%", margin: "20px" }}
                striped
                bordered
                hover
              >
                <thead>
                  <tr>
                    <th>Intake</th>
                    <th>No. of Submits</th>
                    {statuses.map((row) => {
                      const statusInclue = presentStatus.includes(row.name);
                      if (statusInclue) {
                        return <th key={row.name}>No. of {row.name}</th>;
                      }
                    })}
                  </tr>
                </thead>
                <tbody>
                  {month_wise.map((row) => (
                    <tr key={row.date}>
                      <td style={{ fontWeight: "bold" }}>{row.date}</td>
                      <td>{row.length}</td>
                      {statuses.map((status) => {
                        const statusInclue = presentStatus.includes(
                          status.name
                        );
                        if (statusInclue) {
                          const findData = month_status_wise.find(
                            (item) =>
                              item.date === row.date &&
                              item.status === status.name
                          );
                          return (
                            <td key={status.name}>
                              {findData ? findData.length : 0}
                            </td>
                          );
                        }
                      })}
                    </tr>
                  ))}
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Total</td>
                    <td>{totalLength}</td>
                    {statuses.map((status) => {
                      const statusInclude = presentStatus.includes(status.name);
                      if (statusInclude) {
                        const findData = month_status_wise.find(
                          (item) => item.status === status.name
                        );

                        return (
                          <td key={status.name}>
                            {findData ? findData.length : 0}
                          </td>
                        );
                      }
                    })}
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubAgentHome;
