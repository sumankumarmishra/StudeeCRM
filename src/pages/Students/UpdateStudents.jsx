import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "../../style/datatable.css";
import { useEffect, useState } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import { useLocation, useParams } from "react-router-dom";

const UpdateStudents = () => {
  const location = useLocation();
  const data = location.state.data;
  const { id } = useParams();
  const [firstname, setFirstname] = useState(data.firstname);
  const [lastname, setLastName] = useState(data.lastname);
  const [password, setPassword] = useState();
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/students/admin/${id}`,
        {
          firstname: firstname,
          password: password,
          lastname: lastname,
        },
        config
      )
      .then((response) => {
        setPopupText("Student Updated");
        setPopupshow(true);
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {popUpShow ? (
          <PopupAlert popUpText={popUpText} backgroundColor={"#FFC300"} />
        ) : (
          ""
        )}
        <div className="datatableTitle" style={{ marginLeft: 20 }}>
          Update
        </div>
        <div className="bottom">
          <div className="right">
            <form className="form-new" onSubmit={handleUpdate}>
              <div className="formInput">
                <label className="label-form">Firstame</label>
                <input
                  type="text"
                  className="input-form"
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                />
                <label className="label-form">Lastname</label>
                <input
                  type="text"
                  className="input-form"
                  value={lastname}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <label className="label-form">Password</label>
                <input
                  type="text"
                  placeholder=""
                  className="input-form"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <button className="createButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudents;
