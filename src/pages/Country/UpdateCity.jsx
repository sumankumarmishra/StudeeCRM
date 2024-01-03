import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { allCountries } from "../../components/Data/result";
import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";

const UpdateCity = ({
  setPopupColor,
  name,
  id,
  data,
  setPopupText,
  setPopupshow,
}) => {
  const [cityName, setCityName] = useState(data.name);
  const [whyToStudy, setWhyToStudy] = useState(data.whyToStudy);
  const [whatToStudy, setWhatToStudy] = useState(data.whatToStudy);
  const [howToStudy, setHowToStudy] = useState(data.howToStudy);
  const [costOfStudy, setCostOfStudy] = useState(data.costOfStudy);
  const [temperature, setTemperature] = useState(data.keyFacts.temperature);
  const [population, setPopulation] = useState(data.keyFacts.population);
  const [uniDescription, setUniDescription] = useState(data.uniDescription);
  const [cityImage, setCityImage] = useState(null);
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", cityName);
    formData.append("whyToStudy", whyToStudy);
    formData.append("whatToStudy", whatToStudy);
    formData.append("howToStudy", howToStudy);
    formData.append("uniDescription", uniDescription);
    formData.append("temperature", temperature);
    formData.append("costOfStudy", costOfStudy);
    formData.append("population", population);
    formData.append("image", cityImage);
    formData.append("country", id);

    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/cities/${data._id}/country/${id}`,
        formData,
        config
      )
      .then((response) => {
        setCityImage(null);
        setPopupshow(true);
        setPopupColor("orange");
        setPopupText("City Updated");
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = (event) => {
    setCityImage(event.target.files[0]);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={cityName}
          onChange={(e) => {
            setCityName(e.target.value);
          }}
          readOnly
        ></Form.Control>
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

export default UpdateCity;
