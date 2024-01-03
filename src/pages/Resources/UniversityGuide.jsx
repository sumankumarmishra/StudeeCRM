import React, { useEffect, useState } from "react";
import "../../style/list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Alert, Modal } from "react-bootstrap";
import { IoAddCircleSharp } from "react-icons/io5";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./resources.css";
import { debounce } from "lodash";
import axios from "axios";
import { CircularProgress } from "@mui/material";
// import SendNotice from "./SendNotice";
import PopupAlert from "../../components/popupalert/popupAlert";
import AddUniversityGuide from "./AddUniversityGuide";
import ViewUniversity from "./ViewUniversity";
// import ViewModal from "./ViewModal";

const Notification = ({ data, setViewModal, setSelectedRow }) => {
  const logoImage = `https://crm.internationaleducationoffice.co.uk/universities/images/${data.logoImage}`;

  return (
    <div
      className="main-container"
      onClick={() => {
        setViewModal(true);
        setSelectedRow(data);
      }}
    >
      <img
        src={logoImage}
        alt={data.logoImage}
        style={{ width: "70%", height: "100px", margin: "20px" }}
      />
      <p className="name-text">{data.universityName}</p>
    </div>
  );
};

const UniversityGuide = () => {
  const token = localStorage.getItem("ieodkvToken");
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddModal, setAddModal] = useState(false);
  const [openViewModal, setViewModal] = useState(false);
  const [popUpColor, setPopupColor] = useState("green");
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [selectedRow, setSelectedRow] = useState({});
  const role = localStorage.getItem("role");

  const variants = ["danger"];

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const debouncedSubmit = debounce(() => {
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/universities`,
        config
      )
      .then((response) => {
        setAlerts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, 500);

  useEffect(() => {
    debouncedSubmit();
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {popUpShow ? (
          <PopupAlert popUpText={popUpText} backgroundColor={popUpColor} />
        ) : (
          ""
        )}

        <Modal
          show={openAddModal}
          onHide={() => {
            setAddModal(false);
          }}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">Add Guide</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ height: "500px", overflowY: "scroll" }}>
              <AddUniversityGuide
                allUniversities={alerts}
                setPopupColor={setPopupColor}
                setAddModal={setAddModal}
                setPopupText={setPopupText}
                setPopupshow={setPopupshow}
              />
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={openViewModal}
          onHide={() => {
            setViewModal(false);
          }}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">
              {selectedRow.universityName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ViewUniversity selectedRow={selectedRow} />
          </Modal.Body>
        </Modal>
        <div style={{ margin: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: "20px 0px" }} className="fw-bold">
              University Guide
            </h3>
            {role === "superadmin" && !loading ? (
              <button
                className="btn btn-primary"
                style={{
                  backgroundColor: "#2F9444",
                  border: "none",
                  height: "38px",
                }}
                onClick={() => setAddModal(true)}
              >
                <i class="fa-solid fa-plus me-1"></i>Add University Guide
              </button>
            ) : (
              ""
            )}
          </div>
          {loading ? (
            <CircularProgress />
          ) : alerts.length > 0 ? (
            <div className="grid-container">
              {alerts.map((notification, index) => (
                <Notification
                  key={index}
                  setSelectedRow={setSelectedRow}
                  setViewModal={setViewModal}
                  data={notification}
                />
              ))}
            </div>
          ) : (
            <p> No notice</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversityGuide;
