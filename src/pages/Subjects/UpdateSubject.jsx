import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { Form, Button } from "react-bootstrap";

const UpdateSubject = ({
  setPopupColor,
  data,
  setOpenUpdateModal,
  setPopupText,
  setPopupshow,
}) => {
  const [name, setName] = useState(data.name);
  const [abroad, SetAbroad] = useState(data.abroad);
  const [futureCareers, setFutureCareers] = useState(data.futureCareers);
  const [programStructure, SetProgramStructure] = useState(
    data.programStructure
  );
  const [entryRequirements, SetEntryRequirements] = useState(
    data.entryRequirements
  );
  const [degreeDescription, setDegreeDescription] = useState(
    data.degreeDescription
  );
  const [whyStudy, setWhyStudy] = useState(data.whyStudy);
  const [whereToStudy, setWhereToStudy] = useState(data.whereToStudy);
  const [programDescription, setProgramDes] = useState(data.programDescription);
  const [countryDescription, setCountryDes] = useState(data.countryDescription);
  const [universityDescription, setUniDes] = useState(
    data.universityDescription
  );
  const [image, setImage] = useState(null);
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
    formData.append("image", image);
    formData.append("entryRequirements", entryRequirements);
    formData.append("degreeDescription", degreeDescription);
    formData.append("futureCareers", futureCareers);
    formData.append("programDescription", programDescription);
    formData.append("universityDescription", universityDescription);
    formData.append("countryDescription", countryDescription);
    formData.append("whyStudy", whyStudy);
    formData.append("whereToStudy", whereToStudy);
    formData.append("abroad", abroad);
    formData.append("programStructure", programStructure);
    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/subjects/${data._id}`,
        formData,
        config
      )
      .then((response) => {
        setPopupshow(true);
        setPopupText(`Subject Updated`);
        setOpenUpdateModal(false);
        setPopupColor("orange");
        setTimeout(() => {
          setPopupshow(false);
          window.location.href = "/subjects";
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
    <Form onSubmit={handleUpdate}>
      <h4>Name</h4>
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
      <h4>Degree Description</h4>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={degreeDescription}
        onChange={(value) => setDegreeDescription(value)}
      />

      <h4>Abroad description</h4>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={abroad}
        onChange={(value) => SetAbroad(value)}
      />
      <h4>Program structure</h4>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={programStructure}
        onChange={(value) => SetProgramStructure(value)}
      />
      <h4>Entry Requirements</h4>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={entryRequirements}
        onChange={(value) => SetEntryRequirements(value)}
      />
      <h4>Why Study {name} abroad</h4>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={whyStudy}
        onChange={(value) => setWhyStudy(value)}
      />
      <h4>Where to study {name} abroad</h4>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={whereToStudy}
        onChange={(value) => setWhereToStudy(value)}
      />
      <h4>Best countries to study {name}</h4>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={countryDescription}
        onChange={(value) => setCountryDes(value)}
      />
      <h4>Best universities to study {name}</h4>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={universityDescription}
        onChange={(value) => setUniDes(value)}
      />
      <h4>{name} study abroad programs</h4>
      <ReactQuill
        className="input-subject"
        style={{ marginBottom: 20 }}
        value={programDescription}
        onChange={(value) => setProgramDes(value)}
      />
      <h4>Future Careers</h4>
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
  );
};

export default UpdateSubject;
