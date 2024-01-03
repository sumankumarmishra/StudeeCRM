import "../../../style/list.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DatatableCampus from "./DatatableCampus";

const Campus = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableCampus />
      </div>
    </div>
  );
};

export default Campus;
