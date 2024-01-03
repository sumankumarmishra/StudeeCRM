import React from "react";
import "../../style/list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DatatableMediums from "./DatatableMediums";

const Mediums = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div>
          <DatatableMediums />
        </div>
      </div>
    </div>
  );
};

export default Mediums;
