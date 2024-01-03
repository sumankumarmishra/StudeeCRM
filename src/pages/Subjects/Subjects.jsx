import React from "react";
import "../../style/list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DatatableSubjects from "./DatatableSubjects";

const Subjects = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div>
          <DatatableSubjects />
        </div>
      </div>
    </div>
  );
};

export default Subjects;
