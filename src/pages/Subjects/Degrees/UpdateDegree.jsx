import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import { Form, Button } from "react-bootstrap";

const UpdateDegree = ({
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
      .patch(`https://crm.internationaleducationoffice.co.uk/degree/${data._id}`, formData, config)
      .then((response) => {
        setPopupshow(true);
        setPopupText(`Faculty Updated`);
        setPopupColor("orange");
        setOpenUpdateModal(false);
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
      <div style={{height: "650px", overflow: "hidden", overflowY: "scroll"}}>
           <Form onSubmit={handleUpdate}>
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
        <h5>Subject Banner Image (PNG/JPEG/JPG)</h5>
      </Form.Label>
      <Form.Control
        type="file"
        id="myFile"
        accept=".png, .jpg, .jpeg"
        name="myFile"
        onChange={handleImageUpload}
      />
      <h5 className="mt-3">Faculty Description</h5>
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

export default UpdateDegree;
