import "../../style/list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableProgramTypes from "./DatatableProgramTypes";

const ProgramTypes = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableProgramTypes />
      </div>
    </div>
  );
};

export default ProgramTypes;
