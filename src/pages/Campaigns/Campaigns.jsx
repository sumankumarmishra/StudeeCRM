import React from "react";
import "../../style/list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DatatableCampaigns from "./DatatableCampaigns";

const Campaigns = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div>
          <DatatableCampaigns />
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
