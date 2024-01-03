import React from "react";
import "../../style/list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DatatableMembers from "./DatatableMembers";

const Members = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div>
          <DatatableMembers />
        </div>
      </div>
    </div>
  );
};

export default Members;
