import React, { useState } from "react";
import axios from "axios";
import "./SureModal.css";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SureModal = ({
  url,
  ids,
  name,
  setPopupText,
  setPopupshow,
  setPopupColor,
  cacheKey,
  showText,
  setUpClose,
  config,
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const allIds = JSON.stringify(ids);
      const response = await axios.delete(`${url}${allIds}`, config);

      setUpClose(false);
      setPopupshow(true);
      setPopupColor("red");
      if (cacheKey) {
        sessionStorage.removeItem(cacheKey);
      }
      if (ids.length > 1) {
        setPopupText(`${ids.length} ${name[1]} deleted`);
      } else {
        setPopupText(`${name[0]} deleted`);
      }

      setTimeout(() => {
        setPopupshow(false);
        navigate("/applications");
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
          <p style={{ color: "red", fontSize: "12px" }}>{showText}</p>
          <div>
            <button
              className="workingBtn sure_model_btn"
              style={{ backgroundColor: "green", color: "white" }}
              onClick={handleDelete}
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

export default SureModal;
