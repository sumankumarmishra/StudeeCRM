import React, { useEffect, useState } from "react";
import "../../style/list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Alert, Modal } from "react-bootstrap";
import { IoAddCircleSharp } from "react-icons/io5";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./notice.css";

import axios from "axios";
import { CircularProgress } from "@mui/material";
import SendNotice from "./SendNotice";
import PopupAlert from "../../components/popupalert/popupAlert";
import ViewModal from "./ViewModal";

const truncateHtml = (html, maxChars) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  let currentChars = 0;

  const traverseNodes = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const remainingChars = maxChars - currentChars;
      if (node.length <= remainingChars) {
        currentChars += node.length;
      } else {
        node.data = node.data.substring(0, remainingChars);
        currentChars = maxChars;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Exclude images
      if (node.tagName.toLowerCase() === "img") {
        node.parentNode.removeChild(node);
        return;
      }

      for (const childNode of node.childNodes) {
        if (currentChars < maxChars) {
          traverseNodes(childNode);
        } else {
          node.removeChild(childNode);
        }
      }
    }
  };

  traverseNodes(doc.body);

  // Remove HTML tags
  const plainText = doc.body.textContent || "";

  return plainText;
};

const Notification = ({
  title,
  date,
  description,
  setViewModal,
  setSelectedRow,
  variant,
}) => {
  const truncatedDescription = truncateHtml(description, 10);

  return (
    <Alert
      variant={variant}
      style={{
        display: "flex",
        height: "100px",
        width: "100%",
        justifyContent: "space-around",
        overflow: "hidden", // Add this line
      }}
    >
      <p
        style={{
          width: "33.33%",
          fontSize: "19px"
        }}
        className="fw-bold"
      >
        {title}
      </p>
      <div
        style={{
          width: "36.66%",
          flexShrink: 1, // Add this line
          wordWrap: "break-word", // Add this line
        }}
        dangerouslySetInnerHTML={{ __html: truncatedDescription }}
      ></div>
      <p
        style={{
          width: "10%",
          fontSize: "20px",
          fontWeight: "bold"
        }}
      >
        {date}
      </p>
      <VisibilityIcon
        style={{
          width: "10%",
          cursor: "pointer",
        }}
        className="workingBtn"
        onClick={() => {
          setSelectedRow({
            date: date,
            title: title,
            description: description,
          });
          setViewModal(true);
        }}
        title="View Product"
      />
    </Alert>
  );
};

const Notice = () => {
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

  useEffect(() => {
    axios
      .get(`https://crm.internationaleducationoffice.co.uk/notices`, config)
      .then((response) => {
        setAlerts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [alerts]);

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

        {/*Add*/}
        <Modal
          show={openAddModal}
          onHide={() => {
            setAddModal(false);
          }}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">Send Notice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SendNotice
              setPopupColor={setPopupColor}
              setAddModal={setAddModal}
              setPopupText={setPopupText}
              setPopupshow={setPopupshow}
            />
          </Modal.Body>
        </Modal>
        {/*View*/}
        <Modal
          show={openViewModal}
          onHide={() => {
            setViewModal(false);
          }}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">Important Updates</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ViewModal selectedRow={selectedRow} />
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
            <h3 style={{ margin: "20px 0px" }} className="fw-bold">Important Updates</h3>
            {role === "superadmin" ? (
              // <IoAddCircleSharp
              //   className="green_logo mt-2"
              //   style={{ cursor: "pointer" }}
              //   size={40}
              //   onClick={() => setAddModal(true)}
              // />
              <button className="btn btn-primary" style={{backgroundColor: "#2F9444",border: "none",height: "38px"}}
              onClick={() => setAddModal(true)}
              >
              <i class="fa-solid fa-plus me-1"></i>Send Notice</button>
            ) : (
              ""
            )}
          </div>
          {loading ? (
            <CircularProgress />
          ) : alerts.length > 0 ? (
            <>
              <Alert
                variant="danger"
                style={{
                  display: "flex",
                  height: "60px",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <h5
                  style={{
                    width: "33.33%",
                    fontWeight: "bold",
                    fontSize: "23px"
                  }}
                >
                  Title
                </h5>
                <h5
                  style={{
                    width: "36.66%",
                    fontWeight: "bold",
                    fontSize: "23px"

                  }}
                >
                  Description
                </h5>
                <h5
                  style={{
                    width: "10%",
                    fontWeight: "bold",
                    fontSize: "23px"

                  }}
                >
                  Date
                </h5>
                <div
                  style={{
                    width: "10%",
                  }}
                ></div>
              </Alert>
              {alerts.map((notification, index) => (
                <Notification
                  key={index}
                  date={notification.date}
                  setSelectedRow={setSelectedRow}
                  setViewModal={setViewModal}
                  title={notification.title}
                  description={notification.description}
                  variant={variants[index % variants.length]}
                />
              ))}
            </>
          ) : (
            <p> No notice</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notice;
