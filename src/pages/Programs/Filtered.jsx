import "../../style/list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableFiltered from "./DatatableFiltered";

const Filtered = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableFiltered />
      </div>
    </div>
  );
};

export default Filtered;
