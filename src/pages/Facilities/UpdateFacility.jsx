import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PopupAlert from "../../components/popupalert/popupAlert";
import { RxCross1 } from "react-icons/rx";
import { Form, Button, Alert } from "react-bootstrap";

const UpdateFacility = ({
  data,
  setOpenUpdateModal,
  setPopupText,
  setPopupshow,
}) => {
  const [file, setFile] = useState("");
  const [name, setName] = useState(data.name);
  const [errorMessage, setErrorMessage] = useState(false);
  const [allFacilities, setAllFacilities] = useState(data.allFacilities);
  const [facilityName, setFacilityName] = useState("");
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);

    formData.append("image", file);
    allFacilities.forEach((allFacilities, index) => {
      formData.append(`allFacilities[${index}]`, allFacilities);
    });
    axios
      .put(
        `https://crm.internationaleducationoffice.co.uk/facilities/${data._id}`,
        formData,
        config
      )
      .then((res) => {
        setPopupshow(true);
        setPopupText("Facility Update");
        setOpenUpdateModal(false);
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data) {
          setErrorMessage(err.response.data);
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
      onSubmit={handleUpdate}
      method="post"
      encType="multipart/form-data"
      action="/upload"
    >
      <Form.Group className="formInput">
        <p style={{ fontSize: 18, color: "red" }}>{errorMessage}</p>

        <Form.Label className="label-form">Facility Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Canteen"
          className="input-form"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Form.Label className="label-form mt-2">Add Facility Name</Form.Label>
        <div className="facilityName">
          <Form.Control
            type="text"
            placeholder="Cafe"
            className="input-form"
            style={{ width: "80%" }}
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

export default UpdateFacility;
