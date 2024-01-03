import axios from "axios";
import React, { useEffect, useState } from "react";
import "./country.css";
import Select from "react-select";
import { allLanguages } from "../../components/Data/data";
import ReactQuill from "react-quill";
import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";

const UpdateCountry = ({
  setPopupColor,
  setOpenUpdateModal,
  data,
  setPopupText,
  setPopupshow,
}) => {
  const [name, setName] = useState(data.name);
  const [whyStudyHere, setwhyStudyHere] = useState(data.whyStudyHere);
  const [bestPrograms, setbestPrograms] = useState(data.bestPrograms);
  const [whereCanYouStudy, setwhereCanYouStudy] = useState(
    data.whereCanYouStudy
  );
  const [costOfStudy, setcostOfStudy] = useState(data.costOfStudy);
  const [message, setmessage] = useState(data.whatTheExpertSays.message);
  const [personName, setpersonName] = useState(
    data.whatTheExpertSays.personName
  );
  const [qualifications, setqualifications] = useState(
    data.requirements.qualifications
  );
  const [englishLanguageTest, setenglishLanguageTest] = useState(
    data.requirements.englishLanguageTest
  );
  const [studentPopulation, setStudentPopulation] = useState(
    data.keyFacts?.studentPopulation
  );
  const [currency, setcurrency] = useState(data.keyFacts?.currency);
  const [languages, setlanguages] = useState([]);
  const [universities, setuniversities] = useState(data.keyFacts?.universities);
  const [countryImage, setcountryImage] = useState(null);
  const [personImage, setpersonImage] = useState(null);
  const [studentVisa, setstudentVisa] = useState(data.studentVisa);
  const [countries, setCountries] = useState([]);
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const language = allLanguages.map((item) => ({
    ...item,
    value: item.name,
    label: item.name,
  }));

  useEffect(() => {
    const languageName = data.keyFacts?.languages?.map((language) => language);
    const filteredSymptoms = allLanguages
      .filter((language) => languageName?.includes(language.name))
      .map((language) => ({
        name: language.name,
        label: language.name,
        value: language.name,
      }));
    setlanguages(filteredSymptoms);
    axios
      .get("https://crm.internationaleducationoffice.co.uk/core-settings/country", config)
      .then((response) => {
        setCountries(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("countryImage", countryImage);
    formData.append("whyStudyHere", whyStudyHere);
    formData.append("bestPrograms", bestPrograms);
    formData.append("whereCanYouStudy", whereCanYouStudy);
    formData.append("costOfStudy", costOfStudy);
    formData.append("currency", currency);
    formData.append("universities", universities);
    formData.append("personImage", personImage);
    formData.append("studentVisa", studentVisa);
    formData.append("studentPopulation", studentPopulation);
    formData.append("message", message);
    formData.append("personName", personName);
    formData.append("qualifications", qualifications);
    formData.append("englishLanguageTest", englishLanguageTest);
    if (languages.length > 0) {
      languages.forEach((languages, index) => {
        formData.append(`languages[${index}]`, languages.name);
      });
    }

    axios
      .put(
        `https://crm.internationaleducationoffice.co.uk/countries/${data._id}`,
        formData,
        config
      )
      .then((response) => {
        console.log(response.data);
        setName("");
        setstudentVisa("");
        setlanguages("");
        setcurrency("");
        setenglishLanguageTest("");
        setqualifications("");
        setPopupColor("orange");
        setuniversities();
        setOpenUpdateModal(false);
        setmessage("");
        setpersonName("");
        setwhereCanYouStudy("");
        setStudentPopulation("");
        setcostOfStudy("");
        setcountryImage(null);
        setpersonImage("");
        setwhyStudyHere("");
        setbestPrograms("");
        setPopupshow(true);
        setPopupText("Country Updated");
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          console.log(error.response);
        }
      });
  };

  const handleImageUpload = (event) => {
    setcountryImage(event.target.files[0]);
  };
  const handlePersonImage = (event) => {
    setpersonImage(event.target.files[0]);
  };

  return (
    <Form onSubmit={handleSubmit} style={{height: "600px", overflow: "hidden", overflowY: "scroll"}}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          as="select"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        >
          <option value="">Select name</option>
          {countries.map((row, index) => (
            <option value={row.name} key={index}>
              {row.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formAddress">
        <Form.Label>Currency</Form.Label>
        <Form.Control
          type="text"
          placeholder="Currency"
          value={currency}
          onChange={(e) => setcurrency(e.target.value)}
        />
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
        <Form.Label>Why study in the {name}?</Form.Label>
        <ReactQuill
          value={whyStudyHere}
          onChange={(value) => setwhyStudyHere(value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>What are the best programs in {name}?</Form.Label>
        <ReactQuill
          value={bestPrograms}
          onChange={(value) => setbestPrograms(value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>What is the cost of studying in {name}?</Form.Label>
        <ReactQuill
          value={costOfStudy}
          onChange={(value) => setcostOfStudy(value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Where can you study in the {name} description?</Form.Label>
        <ReactQuill
          value={whereCanYouStudy}
          onChange={(value) => setwhereCanYouStudy(value)}
        />
      </Form.Group>
      <Form.Group>
        <h4>What are the requirements to study in the {name}?</h4>
        <Form.Label>Qualifications</Form.Label>
        <ReactQuill
          value={qualifications}
          onChange={(value) => setqualifications(value)}
        />
        <Form.Label>English language tests</Form.Label>
        <ReactQuill
          value={englishLanguageTest}
          onChange={(value) => setenglishLanguageTest(value)}
        />
      </Form.Group>

      <Form.Group controlId="formAddress">
        <h4>Key facts</h4>
        <Form.Label>Student Population</Form.Label>
        <Form.Control
          type="text"
          placeholder="Student populate"
          value={studentPopulation}
          onChange={(e) => setStudentPopulation(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formAddress">
        <Form.Label>Universities</Form.Label>
        <Form.Control
          type="text"
          placeholder="Universities"
          value={universities}
          onChange={(e) => setuniversities(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formAddress">
        <Form.Label>Languages</Form.Label>
        <Select
          options={language}
          isMulti
          value={languages}
          onChange={(selected) => setlanguages(selected)}
        />
      </Form.Group>

      <Form.Group controlId="formAddress">
        <h4>What the experts say about {name}</h4>
        <Form.Label>Expert Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Student populate"
          value={personName}
          onChange={(e) => setpersonName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formAddress">
        <Form.Label>Expert Image</Form.Label>
        <Form.Control
          type="file"
          accept=".png, .jpg, .jpeg, .jfif"
          name="myFile"
          onChange={handlePersonImage}
        />
      </Form.Group>
      <Form.Group controlId="formAddress">
        <Form.Label>Message</Form.Label>
        <ReactQuill value={message} onChange={(value) => setmessage(value)} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
};

export default UpdateCountry;
