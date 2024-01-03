import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import AddForm from "./AddForm";
import Datatableforms from "./Datatableforms";

const Form = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatableforms />
      </div>
    </div>
  );
};

export default Form;
