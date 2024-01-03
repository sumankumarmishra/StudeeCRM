import React, { useEffect, useState } from "react";
import "../../style/list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Alert, Button } from "react-bootstrap";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const Notification = ({ updated_by, date, message, variant, onDelete }) => {
  return (
    <Alert variant={variant}>
      <Alert.Heading>{date}</Alert.Heading>
      <p>
        <span style={{ fontWeight: "bold" }}>Updated by:</span>
        {"  "} {updated_by?.username}
      </p>
      <div dangerouslySetInnerHTML={{ __html: message }}></div>
      <Button onClick={onDelete} variant="outline-danger" size="sm">
        X
      </Button>
    </Alert>
  );
};

const Notifications = () => {
  const token = localStorage.getItem("ieodkvToken");
  const [loading, setLoading] = useState(true);

  const [alerts, setAlerts] = useState([]);

  const variants = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
  ];

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    axios
      .patch(`https://crm.internationaleducationoffice.co.uk/notify`, {}, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://crm.internationaleducationoffice.co.uk/notify`, config)
      .then((response) => {
        setAlerts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [alerts]);

  const handleAlertDelete = (id) => {
    axios
      .delete(`https://crm.internationaleducationoffice.co.uk/notify/${id}`, config)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          alert(error.response.data);
        }
      });
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        <div style={{ margin: "20px" }}>
          <h3 style={{ margin: "20px 0px" }}>
            Notifications ({alerts.length})
          </h3>
          {loading ? (
            <CircularProgress />
          ) : alerts.length > 0 ? (
            alerts.map((notification, index) => (
              <Notification
                updated_by={notification.updated_by}
                key={index}
                date={notification.date}
                message={notification.message}
                variant={variants[index % variants.length]}
                onDelete={() => handleAlertDelete(notification._id)}
              />
            ))
          ) : (
            <p> No notification</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
