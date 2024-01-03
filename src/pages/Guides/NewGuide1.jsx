import "../../style/new.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { Table, Modal, Form, Button, Pagination } from "react-bootstrap";

const NewGuide1 = ({ name, setOpenAddModal, setPopupText, setPopupshow }) => {
  const [guideName, setGuideName] = useState("");
  const [description, setDescription] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [image, setImage] = useState(null);
  const [headingName, setHeadingName] = useState("");
  const [content, setContent] = useState("");
  const [heading, setHeading] = useState([]);
  const [openHeading, setOpenHeading] = useState(false);
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
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
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [countries]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (heading.length > 0) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("guideName", guideName);
      formData.append("tagLine", tagLine);
      formData.append("description", description);
      formData.append("country", country);

      heading.forEach((headingObj, index) => {
        formData.append(
          `heading[${index}][headingName]`,
          headingObj.headingName
        );
        formData.append(`heading[${index}][content]`, headingObj.content);
      });

      axios
        .post("https://crm.internationaleducationoffice.co.uk/guides/addGuide", formData, config)
        .then((response) => {
          setGuideName("");
          setDescription("");
          setHeading([]);
          setOpenAddModal(false);
          setImage(null);
          setCountry("");
          setTagLine("");
          setPopupshow(true);
          setPopupText("Guide data Added");
          setTimeout(() => {
            setPopupshow(false);
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data) {
            alert(error.response.data);
          }
        });
    } else {
      alert("Must fill at least one heading detail");
    }
  };

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
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
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          value={guideName}
          onChange={(e) => setGuideName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formName">
        <Form.Label>Tag line</Form.Label>
        <ReactQuill value={tagLine} onChange={(value) => setTagLine(value)} />
      </Form.Group>
      <Form.Group controlId="formName">
        <Form.Label>Description</Form.Label>
        <ReactQuill
          value={description}
          onChange={(value) => setDescription(value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          accept=".png, .jpg, .jpeg, .jfif"
          name="myFile"
          onChange={handleImageUpload}
        />
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
          {countries.map((row, index) => (
            <option value={row.name} key={index}>
              {row.name}
            </option>
          ))}
        </Form.Control>
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

export default NewGuide1;
