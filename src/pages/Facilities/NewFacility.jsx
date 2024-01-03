import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import { RxCross1 } from "react-icons/rx";
import { Form, Button, Alert } from "react-bootstrap";

const NewFacility = ({ setOpenAddModal, setPopupText, setPopupshow }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [errorShow, setErrorShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [allFacilities, setAllFacilities] = useState([]);
  const [facilityName, setFacilityName] = useState("");
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);

    formData.append("image", file);
    allFacilities.forEach((allFacilities, index) => {
      formData.append(`allFacilities[${index}]`, allFacilities);
    });

    axios
      .post("https://crm.internationaleducationoffice.co.uk/facilities", formData, config)
      .then((response) => {
        console.log(response.data);
        setName("");
        setAllFacilities([]);
        setOpenAddModal(false);
        setPopupshow(true);
        setPopupText("Facility Added");
        setErrorShow(false);
        setFile(null);
        setTimeout(() => {
          window.location.reload();
          setPopupshow(false);
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data) {
          setErrorShow(true);
          setErrorMessage(error.response.data);
        }
      });
  };

  const handleImageUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAddFacilityName = () => {
    setAllFacilities([...allFacilities, facilityName]);
    setFacilityName("");
  };

  const handleDeleteHeading = (facilityName) => {
    setAllFacilities(allFacilities.filter((row) => row !== facilityName));
  };

  return (
    <Form
      className="form-new"
      onSubmit={handleSubmit}
      method="post"
      encType="multipart/form-data"
      action="/upload"
    >
      <Form.Group className="formInput">
        <Form.Label className="label-form">Facility Name</Form.Label>
        <p style={{ fontSize: 18, color: "red" }}>{errorMessage}</p>
        <Form.Control
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Form.Label className="label-form mt-2">Add Facility Name</Form.Label>
        <div className="facilityName">
          <Form.Control
            type="text"
            placeholder="Facility data name"
            value={facilityName}
            onChange={(e) => {
              setFacilityName(e.target.value);
            }}
          />
          <Button
            variant="primary"
            className="btn btn-primary blue_bg_logo mt-3"
            onClick={handleAddFacilityName}
          >
            Add
          </Button>
        </div>
        <ul style={{ width: "100%", margin: 20 }}>
          {allFacilities.length > 0
            ? allFacilities.map((row) => (
                <li>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>{row}</p>
                    <RxCross1
                      size={18}
                      style={{ cursor: "pointer", marginRight: "20px" }}
                      onClick={() => handleDeleteHeading(row)}
                    />
                  </div>
                </li>
              ))
            : ""}
        </ul>

        <Form.Label className="label-form">
          Facility Image (PNG/JPEG/JPG)
        </Form.Label>
        <Form.Control
          type="file"
          id="myFile"
          accept=".png, .jpg, .jpeg"
          name="myFile"
          onChange={handleImageUpload}
        />
        <Button
          variant="primary"
          className="btn btn-primary green_bg_logo mt-3"
          type="submit"
        >
          Add
        </Button>
      </Form.Group>
    </Form>
  );
};

export default NewFacility;
