import React, { useState } from "react";
import axios from "axios";
import "./SureModal.css";
import { CircularProgress } from "@mui/material";

const DeskModal = ({
  url,
  ids,
  name,
  setPopupText,
  data,
  setPopupshow,
  setPopupColor,
  setUpClose,
  config,
}) => {
  const [loading, setLoading] = useState(false);

  const handleAssign = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const allIds = JSON.stringify(ids);
      await axios.patch(`${url}${allIds}`, data, config);
      setUpClose(false);
      setPopupshow(true);
      setPopupColor("orange");

      if (ids.length > 1) {
        setPopupText(`${ids.length} ${name[1]}`);
      } else {
        setPopupText(`${name[0]}`);
      }

      setTimeout(() => {
        setPopupshow(false);
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sure-modal-main">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <h6>Are you sure?</h6>
          <div>
            <button
              className="workingBtn sure_model_btn"
              style={{ backgroundColor: "green", color: "white" }}
              onClick={handleAssign}
            >
              Yes
            </button>
            <button
              className="workingBtn sure_model_btn"
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => setUpClose(false)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeskModal;
