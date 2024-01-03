import "../../style/list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableUniversities from "./DatatableUniversities";

const Universities = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableUniversities />
      </div>
    </div>
  );
};

export default Universities;
