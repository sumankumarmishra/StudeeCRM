import "../../style/datatable.css";
import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import "./members.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Select from "react-select";
import "../Roles/roles.css";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import AddDynamic from "./AddDynamic";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import NewEmail from "../UniEmails/NewEmail";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const NewMembers = ({ title }) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [agent, setAgent] = useState(false);
  const [roles, setRoles] = useState([]);
  const [phoneNo, setPhoneNo] = useState("+92");
  const [email, setEmail] = useState("");
  const [roleName, setRoleName] = useState("");
  const [password, setPassword] = useState("");
  const [popupColor, setPopupColor] = useState("#8AFF8A");
  const [image, setImage] = useState(null);
  const [university, setUniversity] = useState([]);
  const [allUniversites, setAllUniversities] = useState([]);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [allProvinces, setAllProvinces] = useState([]);
  const [branch, setBranch] = useState("");
  const [allBranches, setAllBranches] = useState([]);
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emails, setEmails] = useState([]);
  const [emailShow, setEmailShow] = useState([]);
  const [fields, setFields] = useState([]);
  const [staff, setStaff] = useState(false);
  const [manually, setManually] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [dynamicFields, setDynamicFields] = useState([]);
  const [openDynamicModal, setOpenDynamicModal] = useState(false);
  const [dynamicData, setDynamicData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get("https://crm.internationaleducationoffice.co.uk/fields", config)
      .then((response) => {
        const filterFields = response.data.filter(
          (row) => row.type === "Dropdown"
        );
        setFields(filterFields);
      })
      .catch((error) => {});
    axios
      .get("https://crm.internationaleducationoffice.co.uk/roles", config)
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {});
    axios
      .get("https://crm.internationaleducationoffice.co.uk/branches", config)
      .then((response) => {
        setAllBranches(response.data);
      })
      .catch((error) => {});
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/core-settings/country",
        config
      )
      .then((response) => {
        setAllCountries(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/universities",
        config
      )
      .then((response) => {
        const universityArrange = response.data.map((row) => {
          return {
            _id: row._id,
            value: row._id,
            label: row.universityName,
            name: row.universityName,
          };
        });
        setAllUniversities(universityArrange);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://crm.internationaleducationoffice.co.uk/uni-emails", config)
      .then((response) => {
        setEmails(response.data);

        const newEmails = response.data.map((row) => ({
          email: row.email,
          id: row._id,
          show: true,
        }));
        setEmailShow(newEmails);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (country) {
      axios
        .get(
          "https://crm.internationaleducationoffice.co.uk/core-settings/province",
          config
        )
        .then((response) => {
          let countryFind;
          if (country !== "All") {
            countryFind = response.data.data.filter(
              (row) => row.country === country
            );
          } else {
            countryFind = response.data.data;
          }

          const provinceArrange = countryFind.map((row) => {
            return {
              value: row.name,
              label: row.name,
              name: row.name,
              country: row.country,
            };
          });
          setAllProvinces(provinceArrange);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [country]);
  useEffect(() => {
    if (province.length > 0) {
      axios
        .get(
          `https://crm.internationaleducationoffice.co.uk/core-settings/city`,
          config
        )
        .then((response) => {
          let filteredCities;
          if (country !== "All") {
            filteredCities = response.data.data.filter((row) =>
              province.some(
                (item) =>
                  item.name === row.province && row.country === item.country
              )
            );
          } else {
            filteredCities = response.data.data.filter((row) =>
              province.some((item) => item.name === row.province)
            );
          }

          const cityArrange = filteredCities.map((row) => {
            return {
              value: row.name,
              label: row.name,
              name: row.name,
            };
          });
          setAllCities(cityArrange);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (university.length > 0) {
      axios
        .get(`https://crm.internationaleducationoffice.co.uk/programs`, config)
        .then((response) => {
          const filteredPrograms = response.data.filter((row) =>
            university.some((item) => item._id === row.university._id)
          );
          setPrograms(filteredPrograms);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [province, university, programs]);

  // Add member
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("role", role);
    formData.append("agent", agent);
    formData.append("country", country);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("branch", branch);
    formData.append("programs", programs);
    formData.append("staff", staff);

    university.forEach((row, index) => {
      formData.append(`university[${index}]`, row._id);
    });

    emailShow.forEach((row, index) => {
      formData.append(`emailShow[${index}][email]`, row.email);
      formData.append(`emailShow[${index}][show]`, row.show);
      formData.append(`emailShow[${index}][id]`, row.id);
    });
    province.forEach((row, index) => {
      formData.append(`province[${index}]`, row.name);
    });
    city.forEach((row, index) => {
      formData.append(`city[${index}]`, row.name);
    });

    formData.append("phoneNo", phoneNo);
    formData.append("password", password);
    formData.append("username", username);
    Object.keys(dynamicData).forEach((key) => {
      formData.append(`dynamicData[${key}]`, dynamicData[key]);
    });
    dynamicFields.forEach((field, index) => {
      Object.entries(field).forEach(([key, value]) => {
        formData.append(`dynamicFields[${index}][${key}]`, value);
      });
    });
    axios
      .post(
        "https://crm.internationaleducationoffice.co.uk/members",
        formData,
        config
      )
      .then((response) => {
        sessionStorage.setItem("cachedMembers", JSON.stringify(response.data));
        setLoading(false);

        if (response.status === 207) {
          alert(response.data.message); // Display the warning message
        }
        setUsername("");
        setEmail("");
        setPhoneNo("");
        setPopupColor("#8AFF8A");
        setImage(null);
        const newEmails = emails.map((row) => ({
          email: row.email,
          id: row._id,
          show: false,
        }));
        setEmailShow(newEmails);

        setRole("");
        setPopupshow(true);
        setPopupText(`Members Added`);
        setTimeout(() => {
          setPopupshow(false);
          navigate("/members");
        }, 800);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          setErrorMessage(error.response.data);
        }
      });
  };

  const handleCheckboxEmails = (index, field) => (event) => {
    const newEmails = [...emailShow];
    newEmails[index][field] = event.target.checked;
    setEmailShow(newEmails);
  };

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSelectChange = (key, value) => {
    setDynamicData((prevValues) => ({ ...prevValues, [key]: value }));
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {popUpShow ? (
          <PopupAlert popUpText={popUpText} backgroundColor={popupColor} />
        ) : (
          ""
        )}

        {/*Add email*/}

        <Modal
          show={openAddModal}
          onHide={() => {
            setOpenAddModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">Add Email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewEmail
              setPopupColor={setPopupColor}
              setPopupshow={setPopupshow}
              setPopupText={setPopupText}
              setOpenAddModal={setOpenAddModal}
              member={true}
            />
          </Modal.Body>
        </Modal>
        {/*Add*/}
        {openDynamicModal ? (
          <div className="modalGuide">
            <div className="modalInnerGuideName">
              <p
                className="closeModal"
                onClick={() => {
                  setOpenDynamicModal(false);
                }}
              >
                X
              </p>
              <AddDynamic
                fields={fields}
                dynamicFields={dynamicFields}
                setDynamicFields={setDynamicFields}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="top-new">
          <h1 className="heading-top text-dark ps-3 fw-bold">
            <a href="/members" style={{ color: "black" }}>
              Members{" "}
            </a>
            &gt; Add Member
          </h1>
        </div>
        <div className="bottom">
          <div className="right">
            <Container>
              <h2 style={{ textDecoration: "none" }} className="pb-2">
                Basic Information
              </h2>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label className="mt-2">Role</Form.Label>
                    <Form.Select
                      value={role}
                      required
                      onChange={(e) => {
                        setRole(e.target.value);
                        const findRole = roles.find(
                          (row) => row._id === e.target.value
                        );
                        if (findRole) {
                          setRoleName(findRole.name);
                        }
                      }}
                    >
                      <option value="">Select role</option>
                      {roles.map((row) => (
                        <option value={row._id} style={{ fontSize: 15 }}>
                          {row.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Form.Label>Email</Form.Label>
                      <AiOutlinePlusCircle
                        size={30}
                        className="green_logo"
                        onClick={() => setOpenAddModal(true)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <Form.Select
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    >
                      <option value="">Select Email</option>
                      {emails.map((row) => (
                        <option value={row.email} style={{ fontSize: 15 }}>
                          {row.email}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label className="mt-2">Whatsapp No.</Form.Label>
                    <PhoneInput
                      country={"pk"} // Set the default country
                      value={phoneNo}
                      onChange={(value, data) => setPhoneNo(`+${value}`)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className="mt-2">Password</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Password"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group>
                    <Form.Label className="mt-2">Branch</Form.Label>
                    <Form.Select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                    >
                      <option value="">Select branch</option>
                      {allBranches.map((row) => (
                        <option value={row._id} style={{ fontSize: 15 }}>
                          {row.name}, {row.country}, {row.city}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label className="mt-2">Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".png, .jpg, .jpeg, .jfif"
                      name="myFile"
                      onChange={handleImageUpload}
                    />
                  </Form.Group>
                </Col>
                <Col></Col>
                <Col></Col>
              </Row>
              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* <div  className="container-fluid"> */}
                <div className="row d-flex">
                  <div className="col-md-6xx">
                    <h2
                      style={{
                        textDecoration: "none",
                        marginRight: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      Application Distribution Policy
                    </h2>
                  </div>
                  {/* <div className="col-md-6xx d-flex">
                    <p style={{ fontSize: "20px", color: "gray" }}>
                      Click Here To Add Applications Manually
                    </p>
                    <input
                      style={{ height: "25px", width: "25px" }}
                      className="mb-2 ms-3"
                      type="checkbox"
                      value={manually}
                      checked={manually}
                      onChange={(e) => {
                        setManually(e.target.checked);
                        if (e.target.checked === true) {
                          setAgent(false);
                          setStaff(false);
                        }
                      }}
                    />
                  </div> */}
                  <div className="col-md-6xx d-flex">
                    <input
                      style={{
                        height: "25px",
                        width: "25px",
                        margin: "0px 5px",
                      }}
                      className="mb-2 ms-3"
                      type="checkbox"
                      value={staff}
                      checked={staff}
                      onChange={(e) => {
                        setStaff(e.target.checked);
                        if (e.target.checked === true) {
                          setAgent(false);
                          // setManually(false);
                        }
                      }}
                    />
                    <p style={{ fontSize: "20px", color: "gray" }}>
                      Click here to apply distribution policy if leads are
                      generating from website, forms or sub agents
                    </p>
                  </div>
                  <div className="col-md-6xx d-flex">
                    <input
                      style={{
                        height: "25px",
                        width: "25px",
                        margin: "0px 5px",
                      }}
                      className="mb-2 ms-3"
                      type="checkbox"
                      value={agent}
                      checked={agent}
                      onChange={(e) => {
                        setAgent(e.target.checked);
                        if (e.target.checked === true) {
                          setStaff(false);
                          // setManually(false);
                        }
                      }}
                    />
                    <p style={{ fontSize: "20px", color: "gray" }}>
                      Click here to apply distribution policy for Sub agent's
                      applications
                    </p>
                  </div>
                </div>
              </div>
              {/* </div> */}

              {staff ? (
                <>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">Select gender</option>

                          <option value="Both" style={{ fontSize: 15 }}>
                            Both
                          </option>
                          <option value="Female" style={{ fontSize: 15 }}>
                            Female
                          </option>
                          <option value="Male" style={{ fontSize: 15 }}>
                            Male
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          <option value="">Select country</option>
                          <option value="All">All</option>

                          {allCountries.map((row) => (
                            <option value={row.name}>{row.name}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Select
                          options={allCities}
                          isMulti
                          value={city}
                          onChange={(selected) => setCity(selected)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label className="pt-2">Provinces</Form.Label>
                        <Select
                          options={allProvinces}
                          isMulti
                          value={province}
                          onChange={(selected) => setProvince(selected)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label className="pt-2">Universities</Form.Label>
                        <Select
                          options={allUniversites}
                          isMulti
                          required={staff || agent ? true : false}
                          value={university}
                          onChange={(selected) => setUniversity(selected)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* <div className="d-flex align-items-center mt-2">
                    <h4 className="me-2">Add dynamic field</h4>
                    <AiOutlinePlusCircle
                      size={30}
                      className="green_logo"
                      onClick={() => setOpenDynamicModal(true)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  {dynamicFields.some(
                    (field) => field["program"] !== undefined
                  ) && (
                      <>
                        <Row>
                          <Col>
                            <Form.Group>
                              <Form.Label>Programs</Form.Label>
                              <Form.Select
                                value={dynamicData["program"] || ""}
                                onChange={(e) =>
                                  handleSelectChange("program", e.target.value)
                                }
                              >
                                <option value="">Select program</option>
                                {programs.map((row) => (
                                  <option value={row._id}>{row.name}</option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col></Col>
                          <Col></Col>
                        </Row>
                      </>
                    )} */}

                  {fields.map((row) => (
                    <div key={row.key}>
                      {dynamicFields.some(
                        (field) => field[row.key] !== undefined
                      ) && (
                        <>
                          <Row>
                            <Col>
                              <Form.Group>
                                <Form.Label>{row.label}</Form.Label>
                                <Form.Select
                                  value={dynamicData[row.key] || ""}
                                  onChange={(e) =>
                                    handleSelectChange(row.key, e.target.value)
                                  }
                                >
                                  <option value="">Select {row.label}</option>
                                  {row.options.map((option, index) => (
                                    <option key={index} value={option.name}>
                                      {option.name}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col></Col>
                            <Col></Col>
                          </Row>
                        </>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                ""
              )}
              {agent ? (
                <>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label className="pt-2">Universities</Form.Label>
                        <Select
                          options={allUniversites}
                          isMulti
                          value={university}
                          onChange={(selected) => setUniversity(selected)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </>
              ) : (
                ""
              )}
              {roleName !== "sub-agent" ? (
                <>
                  <div className="row">
                    <h2
                      style={{
                        textDecoration: "none",
                        margin: "20px 10px 0px 0px",
                      }}
                    >
                      Email Policies
                    </h2>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      {emailShow.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                          className="update-member"
                        >
                          <label lassName="label-form" style={{ fontSize: 20 }}>
                            {item.email}
                          </label>
                          <div className="checkboxes">
                            <input
                              style={{ width: "25%" }}
                              type="checkbox"
                              checked={item.show}
                              onChange={handleCheckboxEmails(index, "show")}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
              {/* <h2
                style={{
                  textDecoration: "none",
                  margin: "20px 10px 0px 0px",
                }}
              >
                Email Policies
              </h2>
              <div
                className="update-member"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p></p>
                <div className="checkboxes">
                  <p className="checkboxeshead">Show</p>
                </div>
              </div>
              {emailShow.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  className="update-member"
                >
                  <label lassName="label-form" style={{ fontSize: 20 }}>
                    {item.email}
                  </label>
                  <div className="checkboxes">
                    <input
                      style={{ width: "25%" }}
                      type="checkbox"
                      checked={item.show}
                      onChange={handleCheckboxEmails(index, "show")}
                    />
                  </div>
                </div>
              ))} */}
              <Button
                type="submit"
                variant="primary"
                onClick={handleSubmit}
                className="ms-2 py-2 px-4 mb-3"
              >
                {loading ? <CircularProgress size={10} /> : "Submit"}
              </Button>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMembers;
