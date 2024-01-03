import "../../style/list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableFacilities from "./DatatableFacilities";

const Facilities = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableFacilities />
      </div>
    </div>
  );
};

export default Facilities;
