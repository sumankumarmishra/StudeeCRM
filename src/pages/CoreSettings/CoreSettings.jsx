import "../../style/list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableCoreSettings from "./DatatableCoreSettings";

const CoreSettings = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableCoreSettings />
      </div>
    </div>
  );
};

export default CoreSettings;
