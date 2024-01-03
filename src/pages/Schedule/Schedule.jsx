import "../../style/list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Calendar from "./Calendar";

const Schedule = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Calendar />
      </div>
    </div>
  );
};

export default Schedule;
