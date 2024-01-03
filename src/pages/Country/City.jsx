import "../../style/list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableCity from "./DatatableCity";

const City = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableCity />
      </div>
    </div>
  );
};

export default City;
