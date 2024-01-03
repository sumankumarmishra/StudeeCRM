import React from "react";
import "../../style/list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatablenavbarpage from "./Datatablenavbarpage";

const Navbarpage = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div>
          <Datatablenavbarpage />
        </div>
      </div>
    </div>
  );
};

export default Navbarpage;
