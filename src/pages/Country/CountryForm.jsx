import axios from "axios";
import React, { useEffect, useState } from "react";
import "./country.css";
import Select from "react-select";
import { allLanguages } from "../../components/Data/data";
import ReactQuill from "react-quill";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button, Form } from "react-bootstrap";
import { RxCross1 } from "react-icons/rx";

const CountryForm = ({
  setPopupColor,
  setOpenAddModal,
  setPopupshow,
  setPopupText,
}) => {
  const [name, setName] = useState("");
  const [whyStudyHere, setwhyStudyHere] = useState("");
  const [bestPrograms, setbestPrograms] = useState("");
  const [whereCanYouStudy, setwhereCanYouStudy] = useState("");
  const [costOfStudy, setcostOfStudy] = useState("");
  const [message, setmessage] = useState("");
  const [personName, setpersonName] = useState("");
  const [qualifications, setqualifications] = useState("");
  const [englishLanguageTest, setenglishLanguageTest] = useState("");
  const [studentPopulation, setStudentPopulation] = useState();
  const [currency, setcurrency] = useState("");
  const [languages, setlanguages] = useState([]);
  const [universities, setuniversities] = useState();
  const [countryImage, setcountryImage] = useState(null);
  const [personImage, setpersonImage] = useState(null);
  const [studentVisa, setstudentVisa] = useState("");

  const [errorShow, setErrorShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [description, setDescription] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [image, setImage] = useState(null);
  const [headingName, setHeadingName] = useState("");
  const [content, setContent] = useState("");
  const [heading, setHeading] = useState([]);
  const [openHeading, setOpenHeading] = useState(false);
  const [countries, setCountries] = useState([]);
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get("https://crm.internationaleducationoffice.co.uk/core-settings/country", config)
      .then((response) => {
        setCountries(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const language = allLanguages.map((item) => ({
    ...item,
    value: item.name,
    label: item.name,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const countryFormData = new FormData();
    countryFormData.append("name", name);
    countryFormData.append("countryImage", countryImage);
    countryFormData.append("whyStudyHere", whyStudyHere);
    countryFormData.append("bestPrograms", bestPrograms);
    countryFormData.append("whereCanYouStudy", whereCanYouStudy);
    countryFormData.append("costOfStudy", costOfStudy);
    countryFormData.append("currency", currency);
    countryFormData.append("universities", universities);
    countryFormData.append("personImage", personImage);
    countryFormData.append("studentVisa", studentVisa);
    countryFormData.append("studentPopulation", studentPopulation);
    countryFormData.append("message", message);
    countryFormData.append("personName", personName);
    countryFormData.append("qualifications", qualifications);
    countryFormData.append("englishLanguageTest", englishLanguageTest);
    languages.forEach((languages, index) => {
      countryFormData.append(`languages[${index}]`, languages.name);
    });
    const guideFormData = new FormData();
    guideFormData.append("image", image);
    guideFormData.append("tagLine", tagLine);
    guideFormData.append("description", description);
    guideFormData.append("country", name);
    heading.forEach((headingObj, index) => {
      guideFormData.append(
        `heading[${index}][headingName]`,
        headingObj.headingName
      );
      guideFormData.append(`heading[${index}][content]`, headingObj.content);
    });
    const requests = [
      axios.post(
        "https://crm.internationaleducationoffice.co.uk/countries",
        countryFormData,
        config
      ),
      axios.post(
        "https://crm.internationaleducationoffice.co.uk/guides/visaGuide",
        guideFormData,
        config
      ),
    ];

    Promise.all(requests)
      .then((results) => {
        const rejectedResponses = results.filter(
          (result) => result.status === "rejected"
        );
        if (rejectedResponses.length === 0) {
          // Both requests were successful
          console.log("Both requests were successful");
          // handle success logic here
          setName("");
          setstudentVisa("");
          setlanguages("");
          setPopupshow(true);
          setOpenAddModal(false);
          setcurrency("");
          setPopupColor("green");
          setenglishLanguageTest("");
          setqualifications("");
          setuniversities();
          setmessage("");
          setpersonName("");
          setwhereCanYouStudy("");
          setStudentPopulation("");
          setcostOfStudy("");
          setcountryImage(null);
          setpersonImage("");
          setwhyStudyHere("");
          setbestPrograms("");
          setErrorShow(false);
          setHeading([]);
          setTagLine("");
          setDescription("");
          setPopupText("Country Added");
          setTimeout(() => {
            setPopupshow(false);
            window.location.reload();
          }, 2000);
        } else {
          // At least one request failed
          console.log("At least one request failed");
          // handle failure logic here
        }
      })
      .catch((error) => {
        // Error occurred while making requests
        console.log("Error occurred while making requests:", error);
        // handle error logic here
      });
  };

  const handleCountryImageUpload = (event) => {
    setcountryImage(event.target.files[0]);
  };
  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };
  const handlePersonImage = (event) => {
    setpersonImage(event.target.files[0]);
  };

  const AddHeading = () => {
    setHeading([...heading, { headingName: headingName, content, content }]);
    setHeadingName("");
    setContent("");
  };

  const handleDeleteHeading = (headingName) => {
    setHeading(heading.filter((row) => row.headingName !== headingName));
  };

  return (
    <Form onSubmit={handleSubmit} style={{height: "600px", overflow: "hidden", overflowY: "scroll"}}>
      <p style={{ color: "red", fontSize: 20 }}>{errorMessage}</p>
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
          onChange={handleCountryImageUpload}
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
      <h2>Student visa guide</h2>
      <Form.Group controlId="formAddress">
        <Form.Label>{name} Student visa description</Form.Label>
        <ReactQuill
          value={studentVisa}
          onChange={(value) => setstudentVisa(value)}
        />
      </Form.Group>
      <Form.Group controlId="formAddress">
        <Form.Label>Tag line</Form.Label>
        <ReactQuill value={tagLine} onChange={(value) => setTagLine(value)} />
      </Form.Group>
      <Form.Group controlId="formAddress">
        <Form.Label>Description</Form.Label>
        <ReactQuill
          value={description}
          onChange={(value) => setDescription(value)}
        />
      </Form.Group>
      <Form.Group controlId="formAddress">
        <Form.Label>Upload banner image for {name}visa guide</Form.Label>
        <Form.Control
          type="file"
          accept=".png, .jpg, .jpeg, .jfif"
          name="myFile"
          onChange={handleImageUpload}
        />
      </Form.Group>
      <Form.Group controlId="formCountry">
        <div
          onClick={() => setOpenHeading(!openHeading)}
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Form.Label>Add heading</Form.Label>
          <IoIosAddCircleOutline size={40} color="blue_logo" />
        </div>
        {openHeading ? (
          <Form.Group className="headingForm">
            <ReactQuill
              value={headingName}
              onChange={(value) => setHeadingName(value)}
            />
            <ReactQuill
              value={content}
              onChange={(value) => setContent(value)}
            />
            <Button
              className="btn btn-primary blue_bg_logo"
              onClick={AddHeading}
            >
              Add
            </Button>
          </Form.Group>
        ) : (
          ""
        )}
      </Form.Group>
      <div className="headingContent">
        {heading.length <= 0
          ? ""
          : heading.map((row, index) => {
              return (
                <Form.Group key={index} className="headingUpdateContent">
                  <RxCross1
                    size={18}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteHeading(row.headingName)}
                  />

                  <div
                    dangerouslySetInnerHTML={{
                      __html: row.headingName,
                    }}
                  ></div>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: row.content,
                    }}
                  ></div>
                </Form.Group>
              );
            })}
      </div>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CountryForm;
