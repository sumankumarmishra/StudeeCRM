import "../../style/list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableEmailOutlook from "./DatatableEmailOutlook";
import "./Email.css";

const EmailOutlook = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableEmailOutlook />
      </div>
    </div>
  );
};

export default EmailOutlook;
