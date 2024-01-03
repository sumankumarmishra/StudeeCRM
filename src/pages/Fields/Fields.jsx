import React from "react";
import "../../style/list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatablefields from "./Datatablefields";

const Fields = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div>
          <Datatablefields />
        </div>
      </div>
    </div>
  );
};

export default Fields;
