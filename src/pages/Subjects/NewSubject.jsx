import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { Form, Button } from "react-bootstrap";

const NewSubject = ({
  setPopupColor,
  setOpenAddModal,
  setPopupText,
  setPopupshow,
}) => {
  const [name, setName] = useState("");
  const [abroad, SetAbroad] = useState("");
  const [futureCareers, setFutureCareers] = useState("");
  const [programStructure, SetProgramStructure] = useState("");
  const [entryRequirements, SetEntryRequirements] = useState("");
  const [degreeDescription, setDegreeDescription] = useState("");
  const [whyStudy, setWhyStudy] = useState("");
  const [whereToStudy, setWhereToStudy] = useState("");
  const [programDescription, setProgramDes] = useState("");
  const [countryDescription, setCountryDes] = useState("");
  const [universityDescription, setUniDes] = useState("");
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Add subject
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("entryRequirements", entryRequirements);
    formData.append("degreeDescription", degreeDescription);
    formData.append("programDescription", programDescription);
    formData.append("universityDescription", universityDescription);
    formData.append("countryDescription", countryDescription);
    formData.append("whyStudy", whyStudy);
    formData.append("whereToStudy", whereToStudy);
    formData.append("futureCareers", futureCareers);
    formData.append("abroad", abroad);
    formData.append("programStructure", programStructure);

    axios
      .post("https://crm.internationaleducationoffice.co.uk/subjects", formData, config)
      .then((response) => {
        setName("");
        SetAbroad("");
        SetProgramStructure("");
        setOpenAddModal(false);
        SetEntryRequirements("");
        setFutureCareers("");
        setDegreeDescription("");
        setPopupColor("green");
        setWhereToStudy("");
        setWhyStudy("");
        setCountryDes("");
        setUniDes("");
        setProgramDes("");
        setPopupshow(true);
        setPopupText(`Subject Added`);
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 800);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div style={{overflow: "hidden", overflowY: "scroll", height: "600px"}}>
    <Form onSubmit={handleSubmit}>
      <h5>Name</h5>
      <Form.Control
        type="text"
        placeholder="Name"
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Form.Label className="label-form">
        Subject Banner Image (PNG/JPEG/JPG)
      </Form.Label>
      <Form.Control
        type="file"
        id="myFile"
        accept=".png, .jpg, .jpeg"
        name="myFile"
        onChange={handleImageUpload}
      />
      <h5 className="mt-3">Degree Description</h5>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={degreeDescription}
        onChange={(value) => setDegreeDescription(value)}
      />

      <h5>Abroad description</h5>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={abroad}
        onChange={(value) => SetAbroad(value)}
      />
      <h5>Program structure</h5>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={programStructure}
        onChange={(value) => SetProgramStructure(value)}
      />
      <h5>Entry Requirements</h5>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={entryRequirements}
        onChange={(value) => SetEntryRequirements(value)}
      />
      <h5>Why Study {name} abroad</h5>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={whyStudy}
        onChange={(value) => setWhyStudy(value)}
      />
      <h5>Where to study {name} abroad</h5>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={whereToStudy}
        onChange={(value) => setWhereToStudy(value)}
      />
      <h5>Best countries to study {name}</h5>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={countryDescription}
        onChange={(value) => setCountryDes(value)}
      />
      <h5>Best universities to study {name}</h5>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={universityDescription}
        onChange={(value) => setUniDes(value)}
      />
      <h5>{name} study abroad programs</h5>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={programDescription}
        onChange={(value) => setProgramDes(value)}
      />
      <h5>Future Careers</h5>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={futureCareers}
        onChange={(value) => setFutureCareers(value)}
      />
      <Button type="submit" className="btn btn-primary green_bg_logo">
        Submit
      </Button>
    </Form>
    </div>
  );
};

export default NewSubject;
