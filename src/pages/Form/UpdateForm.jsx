import "../../style/datatable.css";
import React, { useState } from "react";
import "./form.css";
import { useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import PopupAlert from "../../components/popupalert/popupAlert";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UpdateForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const renderData = location.state.data;
  const [form, setForm] = useState(renderData.form);
  const [data, setData] = useState([]);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [formName, setFormName] = useState(renderData.name);
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [university, setUniversity] = useState("");
  const [programs, setPrograms] = useState([]);
  const [allUniversities, setUniversities] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const date = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  useEffect(() => {
    if (renderData.university) {
      setUniversity(renderData.university._id);
      setUniversityName(renderData.university.universityName);
    }
    axios
      .get("https://crm.internationaleducationoffice.co.uk/universities", config)
      .then((response) => {
        setUniversities(response.data);
      })
      .catch((error) => {});

    axios
      .get("https://crm.internationaleducationoffice.co.uk/applications/form/keys", config)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {});
    axios
      .get("https://crm.internationaleducationoffice.co.uk/core-settings/month", config)
      .then((response) => {
        setMonth(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://crm.internationaleducationoffice.co.uk/core-settings/year", config)
      .then((response) => {
        setYear(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (university) {
      axios
        .get(
          `https://crm.internationaleducationoffice.co.uk/programs/university/${university}`,
          config
        )
        .then((response) => {
          setPrograms(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [university]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formContent = await generateFormContent();
    const data = {
      university: university,
      name: formName,
      formContent: formContent,
      form: form,
    };
    const requiredFields = ["firstname", "lastname", "email", "phoneNo"];
    const isAllRequiredFieldsPresent = requiredFields.every((fieldKey) =>
      form.some((field) => field.key === fieldKey)
    );
    if (isAllRequiredFieldsPresent) {
      axios
        .patch(`https://crm.internationaleducationoffice.co.uk/forms/${id}`, data, config)
        .then((response) => {
          console.log(response.data);
          setPopupshow(true);
          setPopupText("Form Updated");
          setTimeout(() => {
            setPopupshow(false);
            navigate("/form-design");
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Must fill all the required fields mentioned in the note.");
    }
  };

  const handleDragStart = (
    event,
    fieldType,
    fieldLabel,
    fieldPlaceholder,
    fieldKey,
    fieldOptions
  ) => {
    const data = {
      type: fieldType,
      label: fieldLabel,
      placeholder: fieldPlaceholder,
      options: fieldOptions,
      key: fieldKey,
    };
    event.dataTransfer.setData("application/json", JSON.stringify(data));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const fieldData = JSON.parse(
      event.dataTransfer.getData("application/json")
    );
    const fieldType = fieldData.type;
    const fieldLabel = fieldData.label;
    const fieldPlaceholder = fieldData.placeholder;
    const fieldOptions = fieldData.options;
    const fieldKey = fieldData.key;
    const newField = {
      id: Date.now(),
      type: fieldType,
      label: fieldLabel,
      options: fieldOptions,
      key: fieldKey,
      placeholder: fieldPlaceholder,
    };
    setForm([...form, newField]);
  };

  const generateFormContent = () => {
    let htmlContent = '<form style="margin: 0 auto; max-width: 500px;">'; // Added inline CSS for form styling
    htmlContent += `<h2 style="text-align: center; color: #333; margin-bottom: 20px;">Apply to ${universityName}</h2>`;

    form.forEach((field) => {
      htmlContent += '<div style="margin-bottom: 10px;">'; // Added inline CSS for form group styling
      htmlContent += `<label style="font-weight: bold;">${field.label}</label>`;

      if (field.type === "String") {
        htmlContent += `<input style="width: 100%; padding: 5px;" type="text" placeholder="${field.placeholder}" name="${field.key}" /><br>`;
      } else if (field.type === "Number") {
        htmlContent += `<input style="width: 100%; padding: 5px;" type="number" placeholder="${field.placeholder}" name="${field.key}" /><br>`;
      } else if (field.type === "File") {
        htmlContent += `<input style="width: 100%; padding: 5px;" type="file" placeholder="${field.placeholder}" name="${field.key}" multiple /><br>`;
      } else if (
        field.type === "Dropdown" &&
        field.key !== "dateOfBirth" &&
        field.key !== "programId"
      ) {
        htmlContent += `<select style="width: 100%; height: 40px; padding: 5px;" name="${field.key}">`;
        htmlContent += `<option value="">Select</option>`;

        field.options.forEach((option) => {
          htmlContent += `<option value="${option.name}">${option.name}</option>`;
        });

        htmlContent += `</select><br>`;
      } else if (field.key === "programId") {
        htmlContent += `<select style="width: 100%; height: 40px; padding: 5px;" name="${field.key}">`;
        htmlContent += `<option value="">Select</option>`;

        programs.forEach((option) => {
          htmlContent += `<option value="${option._id}">${option.name}</option>`;
        });

        htmlContent += `</select><br>`;
      } else if (field.key === "dateOfBirth") {
        htmlContent += `<div style="display: flex;">`;
        htmlContent += `<select style="width: 80px; height: 40px; padding: 5px; margin-right: 20px;" name="dateOfBirth"><option value=""></option>`;
        date.forEach((row, index) => {
          htmlContent += `<option value="${row}" key=${index}>${row}</option>`;
        });
        htmlContent += `</select>`;
        htmlContent += `<select style="width: 100px; height: 40px; padding: 5px; margin-right: 20px;" name="monthOfBirth"><option value=""></option>`;
        month.forEach((row, index) => {
          htmlContent += `<option value="${row.name}" key=${index}>${row.name}</option>`;
        });
        htmlContent += `</select>`;
        htmlContent += `<select style="width: 80px; height: 40px; padding: 5px;" name="yearOfBirth"><option value=""></option>`;
        year.forEach((row, index) => {
          htmlContent += `<option value="${row.name}" key=${index}>${row.name}</option>`;
        });
        htmlContent += `</select>`;
        htmlContent += `</div><br>`;
      } else if (field.type === "Date") {
        htmlContent += `<div style="display: flex;">`;
        htmlContent += `<select style="width: 80px; height: 40px; padding: 5px; margin-right: 20px;" name="${field.key}Date"><option value=""></option>`;
        date.forEach((row, index) => {
          htmlContent += `<option value="${row}" key=${index}>${row}</option>`;
        });
        htmlContent += `</select>`;
        htmlContent += `<select style="width: 100px; height: 40px; padding: 5px; margin-right: 20px;" name="${field.key}Month"><option value=""></option>`;
        month.forEach((row, index) => {
          htmlContent += `<option value="${row.name}" key=${index}>${row.name}</option>`;
        });
        htmlContent += `</select>`;
        htmlContent += `<select style="width: 80px; height: 40px; padding: 5px;" name="${field.key}Year"><option value=""></option>`;
        year.forEach((row, index) => {
          htmlContent += `<option value="${row.name}" key=${index}>${row.name}</option>`;
        });
        htmlContent += `</select>`;
        htmlContent += `</div><br>`;
      }

      htmlContent += `</div>`;
    });
    htmlContent += `
    <div class="alert alert-success alert-dismissible fade show" role="alert" id="successAlert" style="display: none;, color:"green">
        Form submitted successfully!
    
      
    </div>
    <div class="alert alert-danger alert-dismissible fade show" role="alert" id="errorAlert" style="display: none;,color:"red"">
        Form submission failed. Please try again.
     
         
       
    </div>
    `;

    htmlContent += `<button type="submit" style="width: 100%; padding: 10px; background-color: #007bff; color: #fff; border: none; cursor: pointer;">Submit</button></form>`;

    // Handle form submission
    htmlContent += `<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`;
    htmlContent += `<script>
      document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault();
  
        // Get the form data
        const formData = new FormData(event.target);
        const fieldData = {};
  
        // Iterate over form fields and store the field keys and values
        for (let [key, value] of formData.entries()) {
          fieldData[key] = value;
        }
  
        // Perform further actions with the fieldData object
        // Perform AJAX request to submit the form data to the backend
        axios.post("https://crm.internationaleducationoffice.co.uk/applications/submit", { form: fieldData, university: "${university}" })
          .then(response => {
            document.getElementById("successAlert").style.display = "block";
            // Hide the success alert after 5 seconds (5000 milliseconds)
            event.target.reset();
            setTimeout(function() {
              document.getElementById("successAlert").style.display = "none";
            }, 5000);
          })
          .catch(error => {
            document.getElementById("errorAlert").style.display = "block";
            document.getElementById("errorAlert").style.display = "block";
            // Hide the success alert after 5 seconds (5000 milliseconds)
            setTimeout(function() {
              document.getElementById("errorAlert").style.display = "none";
            }, 5000);
          });
  
      });
    </script>`;

    return htmlContent;
  };

  try {
    
  } catch (error) {
    
  }

  const handleDeleteField = (id) => {
    setForm(form.filter((row) => row.id !== id));
  };

  return (
    <div className="list">
      <Sidebar />
      <div className=" listContainer">
        <Navbar />
        <Container fluid className="p-5">
          <div>
            {popUpShow ? (
              <PopupAlert popUpText={popUpText} backgroundColor={"orange"} />
            ) : (
              ""
            )}
            <div className="top-new">
              <h2 className="heading-top text-dark ps- fw-bold">
                <a href="/form-design" style={{color: "black"}}>Forms </a>
                &gt; Update Form
              </h2>
            </div>
            <Form.Group>
              <Form.Label className="pt-2">
                University<span className="esterik">*</span>
              </Form.Label>
              <Form.Control
                as="select"
                className="input-form"
                value={university}
                required
                style={{ height: "40px", width: "600px" }}
                onChange={(e) => {
                  setUniversity(e.target.value);
                  const findUniversity = allUniversities.find(
                    (row) => row._id === e.target.value
                  );
                  setUniversityName(findUniversity?.universityName);
                }}
              >
                <option value="">Select University</option>
                {allUniversities.map((uni) => (
                  <option key={uni._id} value={uni._id}>
                    {uni.universityName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className="pt-2">
                Form Name<span className="esterik">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={formName}
                required
                placeholder="Enter Form Name"
                onChange={(e) => setFormName(e.target.value)}
                style={{ height: "40px", width: "600px" }}
              />
            </Form.Group>
            <p style={{ fontSize: 15, color: "red" }}>
              Note: Some fields are mandatory to get basic information like
              Firstname, Lastname, Email and Phone No.
            </p>

            <div
              onDrop={handleDrop}
              onDragOver={(event) => event.preventDefault()}
              style={{
                borderWidth: 1,
                overflowY: "auto",
                maxHeight: "400px",
              }}
              className="formStyling"
            >
              <div className="dragHere">
                {form.map((field) => {
                  return (
                    <div key={field.id} className="fieldInputs">
                      <label htmlFor={field.id}>{field.label}</label>
                      {field.type === "String" && (
                        <div style={{ display: "flex" }}>
                          <Form.Control
                            type="text"
                            placeholder={field.placeholder}
                            id={field.id}
                            name={field.key}
                          />
                          <div
                            style={{ marginLeft: 10, cursor: "pointer" }}
                            onClick={() => handleDeleteField(field.id)}
                          >
                            <p style={{ fontSize: 12 }}>X</p>
                          </div>
                        </div>
                      )}
                      {field.type === "Number" && (
                        <div style={{ display: "flex" }}>
                          <Form.Control
                            type="number"
                            placeholder={field.placeholder}
                            id={field.id}
                            name={field.key}
                          />
                          <div
                            style={{ marginLeft: 10, cursor: "pointer" }}
                            onClick={() => handleDeleteField(field.id)}
                          >
                            <p style={{ fontSize: 12 }}>X</p>
                          </div>
                        </div>
                      )}

                      {field.type === "File" && (
                        <div style={{ display: "flex" }}>
                          <Form.Control
                            type="file"
                            placeholder={field.placeholder}
                            id={field.id}
                            name={field.key}
                            multiple
                          />
                          <div
                            style={{ marginLeft: 10, cursor: "pointer" }}
                            onClick={() => handleDeleteField(field.id)}
                          >
                            <p style={{ fontSize: 12 }}>X</p>
                          </div>
                        </div>
                      )}
                      {field.type === "Dropdown" &&
                        field.key !== "dateOfBirth" &&
                        field.key !== "programId" &&
                        field.options &&
                        field.options.length > 0 && (
                          <div style={{ display: "flex" }}>
                            <Form.Control
                              as="select"
                              className="input-form"
                              style={{ height: "40px" }}
                            >
                              <option value="">Select</option>
                              {field.options.map((option, index) => (
                                <option value={option.name} key={index}>
                                  {option.name}
                                </option>
                              ))}
                            </Form.Control>
                            <div
                              style={{ marginLeft: 10, cursor: "pointer" }}
                              onClick={() => handleDeleteField(field.id)}
                            >
                              <p style={{ fontSize: 12 }}>X</p>
                            </div>
                          </div>
                        )}
                      {field.key === "programId" && (
                        <div style={{ display: "flex" }}>
                          <Form.Control
                            as="select"
                            className="input-form"
                            style={{ height: "40px" }}
                          >
                            <option value="">Select</option>
                            {programs.map((option, index) => (
                              <option value={option._id} key={index}>
                                {option.name}
                              </option>
                            ))}
                          </Form.Control>
                          <div
                            style={{ marginLeft: 10, cursor: "pointer" }}
                            onClick={() => handleDeleteField(field.id)}
                          >
                            <p style={{ fontSize: 12 }}>X</p>
                          </div>
                        </div>
                      )}
                      {field.type === "Date" && (
                        <div style={{ display: "flex" }}>
                          <div style={{ display: "flex" }}>
                            <Form.Control
                              as="select"
                              style={{ marginLeft: 20, width: 80 }}
                            >
                              <option value=""></option>
                              {date.map((row, index) => (
                                <option value={row} key={index}>
                                  {row}
                                </option>
                              ))}
                            </Form.Control>
                            <Form.Control
                              as="select"
                              style={{ marginLeft: 20, width: 100 }}
                            >
                              <option value=""></option>
                              {month.map((row, index) => (
                                <option value={row.name} key={index}>
                                  {row.name}
                                </option>
                              ))}
                            </Form.Control>
                            <Form.Control
                              as="select"
                              style={{ marginLeft: 20, width: 80 }}
                            >
                              <option value=""></option>
                              {year.map((row, index) => (
                                <option value={row.name} key={index}>
                                  {row.name}
                                </option>
                              ))}
                            </Form.Control>
                          </div>
                          <div
                            style={{ marginLeft: 10, cursor: "pointer" }}
                            onClick={() => handleDeleteField(field.id)}
                          >
                            <p style={{ fontSize: 12 }}>X</p>
                          </div>
                        </div>
                      )}
                      {field.key === "dateOfBirth" && (
                        <div style={{ display: "flex" }}>
                          <Form.Control
                            as="select"
                            style={{ marginLeft: 20, width: 80 }}
                            name="dateOfBirth"
                          >
                            <option value=""></option>
                            {date.map((row, index) => (
                              <option value={row} key={index}>
                                {row}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control
                            as="select"
                            style={{ marginLeft: 20, width: 100 }}
                            name="monthOfBirth"
                          >
                            <option value=""></option>
                            {month.map((row, index) => (
                              <option value={row.name} key={index}>
                                {row.name}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control
                            as="select"
                            style={{ marginLeft: 20, width: 80 }}
                            name="yearOfBirth"
                          >
                            <option value=""></option>
                            {year.map((row, index) => (
                              <option value={row.name} key={index}>
                                {row.name}
                              </option>
                            ))}
                          </Form.Control>
                        </div>
                      )}
                      <br />
                    </div>
                  );
                })}
              </div>
              <div className="formBottomButtons">
                <p className="dragHere">
                  Drag &amp; Drop fields to form editor
                </p>
                {data.map((row, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                      draggable
                      onDragStart={(event) =>
                        handleDragStart(
                          event,
                          row.type,
                          row.label,
                          row.placeholder,
                          row.key,
                          row.options
                        )
                      }
                    >
                      <label
                        htmlFor="none"
                        style={{
                          backgroundColor: "#f3f3f3",
                          borderRadius: 3,
                          marginRight: 5,
                          padding: "2px 5px",
                        }}
                      >
                        {row.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <Button
              type="submit"
              onClick={handleSubmitForm}
              className="submit-button mt-3"
            >
              Submit
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default UpdateForm;
