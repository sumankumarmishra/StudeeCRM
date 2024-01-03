import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { allCountries } from "../../components/Data/result";
import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";

const CityForm = ({
  setPopupColor,
  setOpenAddModal,
  name,
  id,
  setPopupText,
  setPopupshow,
}) => {
  const [cityName, setCityName] = useState("");
  const [whyToStudy, setWhyToStudy] = useState("");
  const [whatToStudy, setWhatToStudy] = useState("");
  const [howToStudy, setHowToStudy] = useState("");
  const [costOfStudy, setCostOfStudy] = useState("");
  const [temperature, setTemperature] = useState("");
  const [population, setPopulation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uniDescription, setUniDescription] = useState("");
  const [cityImage, setCityImage] = useState(null);
  const [cities, setCities] = useState([]);
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get("https://crm.internationaleducationoffice.co.uk/core-settings/city", config)
      .then((response) => {
        const findCities = response.data.data.filter(
          (row) => row.country === name
        );
        setCities(findCities);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", cityName);
    formData.append("whyToStudy", whyToStudy);
    formData.append("whatToStudy", whatToStudy);
    formData.append("howToStudy", howToStudy);
    formData.append("temperature", temperature);
    formData.append("uniDescription", uniDescription);
    formData.append("costOfStudy", costOfStudy);
    formData.append("population", population);
    formData.append("image", cityImage);
    formData.append("country", id);

    axios
      .post(`https://crm.internationaleducationoffice.co.uk/cities/${id}`, formData, config)
      .then((response) => {
        setCityImage(null);
        setCityName("");
        setOpenAddModal(false);
        setPopulation("green");
        setWhatToStudy("");
        setWhyToStudy("");
        setHowToStudy("");
        setTemperature("");
        setCostOfStudy("");
        setUniDescription("");
        setPopupText("City Added");
        setPopupshow(true);
        setPopulation();
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          setErrorMessage(error.response.data);
        }
      });
  };

  const handleImageUpload = (event) => {
    setCityImage(event.target.files[0]);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <p style={{ color: "red", fontSize: 20 }}>{errorMessage}</p>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          as="select"
          value={cityName}
          onChange={(e) => {
            setCityName(e.target.value);
          }}
        >
          <option value="">Select name</option>
          {cities.map((row, index) => (
            <option value={row.name} key={index}>
              {row.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Banner Image</Form.Label>
        <Form.Control
          type="file"
          accept=".png, .jpg, .jpeg, .jfif"
          name="myFile"
          onChange={handleImageUpload}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Why study in the {cityName}?</Form.Label>
        <ReactQuill
          value={whyToStudy}
          onChange={(value) => setWhyToStudy(value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>University Descitpion in {cityName}?</Form.Label>
        <ReactQuill
          value={uniDescription}
          onChange={(value) => setUniDescription(value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>What to study in {cityName}?</Form.Label>
        <ReactQuill
          value={whatToStudy}
          onChange={(value) => setWhatToStudy(value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>How to study in {cityName}?</Form.Label>
        <ReactQuill
          value={howToStudy}
          onChange={(value) => setHowToStudy(value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Cost to study in {cityName}</Form.Label>
        <ReactQuill
          value={costOfStudy}
          onChange={(value) => setCostOfStudy(value)}
        />
      </Form.Group>

      <Form.Group controlId="formAddress">
        <h4>Key facts</h4>
        <Form.Label>Temperature</Form.Label>
        <Form.Control
          type="text"
          placeholder="Temperature"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formAddress">
        <Form.Label>Population</Form.Label>
        <Form.Control
          type="text"
          placeholder="Population"
          value={population}
          onChange={(e) => setPopulation(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CityForm;
