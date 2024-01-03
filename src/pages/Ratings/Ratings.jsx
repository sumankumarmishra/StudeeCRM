import "../../style/list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableRatings from "./DatatableRatings";
import ActedRatings from "./ActedRatings";

const Ratings = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ActedRatings />
        <DatatableRatings />
      </div>
    </div>
  );
};

export default Ratings;
