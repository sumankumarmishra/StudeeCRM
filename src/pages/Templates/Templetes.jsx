import React from "react";
import "../../style/list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DatatableTemplates from "./DatatableTemplates";

const Templetes = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div>
          <DatatableTemplates />
        </div>
      </div>
    </div>
  );
};

export default Templetes;
