import React from "react";
import "../../style/list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DatatableUniEmails from "./DatatableUniEmails";

const UniEmails = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div>
          <DatatableUniEmails />
        </div>
      </div>
    </div>
  );
};

export default UniEmails;
