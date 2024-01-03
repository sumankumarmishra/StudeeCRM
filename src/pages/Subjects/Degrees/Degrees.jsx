import React from "react";
import "../../../style/list.scss";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import DatatableDegrees from "./DatatableDegrees";

const Degrees = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div>
          <DatatableDegrees />
        </div>
      </div>
    </div>
  );
};

export default Degrees;
