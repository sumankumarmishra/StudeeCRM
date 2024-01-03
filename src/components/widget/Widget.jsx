import "./widget.scss";
import PersonIcon from "@mui/icons-material/Person";
import MedicationIcon from "@mui/icons-material/Medication";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { CircularProgress } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { debounce } from "lodash";

const Widget = ({ type, background_color }) => {
  const [totalApplications, setTotalApplications] = useState();
  const [total, setTotal] = useState({});
  const [totalStudents, setTotalStudents] = useState();
  const [totalUniversities, setTotalUniversities] = useState();
  const [totalCities, setTotalCities] = useState();
  const [totalCountries, setTotalCountries] = useState();
  const [loading, setLoading] = useState(false);
  const [totalPrograms, setTotalPrograms] = useState();
  const [totalSubAgents, setTotalSubAgents] = useState();
  const [totalStaff, setTotalStaff] = useState();
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const debouncedSubmit = debounce(() => {
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/reports/dashboard",
        config
      )
      .then((response) => {
        setTotalApplications(response.data.applications);
        setTotalCities(response.data.cities);
        setTotalSubAgents(response.data.subAgents);
        setTotalCountries(response.data.countries);
        setTotalPrograms(response.data.programs);
        setTotalStaff(response.data.staff);
        setTotalUniversities(response.data.universities);
        setTotalStudents(response.data.students);
      })
      .catch((error) => {
        console.log(error);
      });
  }, 500);

  const handleUpload = () => {
    axios
      .post("https://crm.internationaleducationoffice.co.uk/post", {}, config)
      .then((response) => {
        toast.success(response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // alert(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (error.response.data) {
          alert(error.response.data);
        }
      });
  };

  let data;

  useEffect(() => {
    debouncedSubmit();
  }, []);

  switch (type) {
    case "students":
      data = {
        title: "TOTAL STUDENTS",
        isMoney: false,
        amount: <CountUp start={0} end={totalStudents} duration={1} />,

        // link: "See all students",
        icon: (
          <PersonIcon
            className={`icon`}
            style={{
              color: "white",
            }}
          />
        ),
      };
      break;
    case "universities":
      data = {
        title: "TOTAL UNIVERSITIES",
        isMoney: false,
        amount: <CountUp start={0} end={totalUniversities} duration={1} />,
        icon: (
          <i
            className="icon bi bi-geo-alt"
            style={{
              color: "white",
            }}
          />
        ),
      };
      break;

    case "applications":
      data = {
        type: "applications",
        title: "TOTAL APPLICATIONS",
        isMoney: false,
        amount: <CountUp start={0} end={totalApplications} duration={1} />,

        // link: "View all orders",
        icon: (
          <i
            className="icon bi bi-postcard-fill"
            style={{
              color: "white",
            }}
          />
        ),
      };
      break;
    case "cities":
      data = {
        type: "cities",
        title: "TOTAL CITIES",
        isMoney: false,
        amount: <CountUp start={0} end={totalCities} duration={1} />,
        // link: "View all orders",
        icon: (
          <LocationCityIcon
            className="icon"
            style={{
              color: "white",
            }}
          />
        ),
      };
      break;
    case "countries":
      data = {
        type: "countries",
        title: "TOTAL COUNTRIES",
        isMoney: false,
        amount: <CountUp start={0} end={totalCountries} duration={1} />,
        // link: "View all orders",
        icon: (
          <i
            className="icon bi bi-flag"
            style={{
              color: "white",
            }}
          />
        ),
      };
      break;
    case "programs":
      data = {
        type: "programs",
        title: "TOTAL PROGRAMS",
        isMoney: false,
        amount: <CountUp start={0} end={totalPrograms} duration={1} />,
        // link: "View all orders",
        icon: (
          <MedicationIcon
            className="icon"
            style={{
              color: "white",
            }}
          />
        ),
      };
      break;
    case "documents":
      data = {
        type: "documents",
        title: "GOOGLE DRIVE BACKUP",
        isMoney: false,
        amount: <CountUp start={0} end={totalSubAgents} duration={1} />,
        // link: "View all orders",
        icon: (
          <i
            className="fa-brands fa-google-drive icon"
            style={{
              color: "white",
            }}
          />
        ),
      };
      break;
    case "sub_agents":
      data = {
        type: "sub_agents",
        title: "TOTAL SUB AGENTS",
        isMoney: false,
        amount: <CountUp start={0} end={totalSubAgents} duration={1} />,
        // link: "View all orders",
        icon: (
          <i
            className="icon fa-solid fa-user-tie"
            style={{
              color: "white",
            }}
          />
        ),
      };
      break;
    case "staffs":
      data = {
        type: "staffs",
        title: "TOTAL STAFF",
        isMoney: false,
        amount: <CountUp start={0} end={totalStaff} duration={1} />,
        // link: "View all orders",
        icon: (
          <i
            className="icon fa-solid fa-address-book"
            style={{
              color: "white",
            }}
          />
        ),
      };
      break;
  }

  return (
    <div className={`widget ${background_color}`}>
      <div className="left">{data.icon}</div>

      <div className="right">
        <span className={`title`}>{data.title}</span>
        {data.type !== "documents" ? (
          <span className={`counter`}>{data.amount}</span>
        ) : loading ? (
          <CircularProgress />
        ) : (
          <div className="ps-5 ms-5">
            <ToastContainer />
            <button
              className="btn-1 px-5"
              onClick={(e) => {
                e.preventDefault();
                setLoading(true);
                handleUpload();
              }}
            >
              Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Widget;
