import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Form, Button } from "react-bootstrap";

const CampusForm = ({
  setPopupColor,
  universityId,
  setOpenAddModal,
  setPopupText,
  setPopupshow,
}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [country, setCountry] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [city, setCity] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [location, setLocation] = useState("");
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get("https://crm.internationaleducationoffice.co.uk/countries", config)
      .then((response) => {
        setAllCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (country) {
      axios
        .get(`https://crm.internationaleducationoffice.co.uk/cities/${country}`, config)
        .then((response) => {
          setAllCities(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [country]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("location", location);
    axios
      .post(
        `https://crm.internationaleducationoffice.co.uk/campus/${universityId}`,
        formData,
        config
      )
      .then((response) => {
        console.log(response.data);
        setName("");
        setLocation("");
        setPopupColor("green");
        setOpenAddModal(false);
        setCountry("");
        setCity("");
        setPopupshow(true);
        setPopupText(`Campus Added`);
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          alert(error.response.data);
        }
      });
  };

  const handleImage = (event) => {
    setImage(event.target.files[0]);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formAddress">
        <Form.Label>Location</Form.Label>
        <ReactQuill value={location} onChange={(value) => setLocation(value)} />
      </Form.Group>

      <Form.Group controlId="formCountry">
        <Form.Label>Country</Form.Label>
        <Form.Control
          as="select"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        >
          <option value="">Select country</option>
          {allCountries.map((row, index) => (
            <option value={row._id} key={index}>
              {row.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formCity">
        <Form.Label>City</Form.Label>
        <Form.Control
          as="select"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        >
          <option value="">Select city</option>
          {allCities.map((row, index) => (
            <option value={row._id} key={index}>
              {row.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formCity">
        <Form.Label>Banner Image</Form.Label>
        <Form.Control
          type="file"
          accept=".png, .jpg, .jpeg, .jfif"
          name="myFile"
          onChange={handleImage}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CampusForm;
