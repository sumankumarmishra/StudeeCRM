import React from "react";
import "./popupAlert.css";
import "../../style/datatable.css";

const PopupAlert = (props) => {
  return (
    <div className="Popupmodal">
      <div
        className="popupInner"
        style={{
          backgroundColor: props.backgroundColor,
          borderWidth: 1,
          borderColor: "red",
          position: "fixed",
          top: 0,
          width: "20%",
          marginTop: 20,
          zIndex: 100,
        }}>
        <div className="textName">{props.popUpText}</div>
      </div>
    </div>
  );
};

export default PopupAlert;
