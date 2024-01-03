import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./members.css";
import Select from "react-select";
import "../Roles/roles.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import AddDynamic from "./AddDynamic";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import NewEmail from "../UniEmails/NewEmail";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { CircularProgress } from "@mui/material";

const UpdateMember = ({ title }) => {
  const { id } = useParams();
  const location = useLocation();
  const member = location.state.data;
  const [username, setUsername] = useState(member.username);
  const [email, setEmail] = useState(member.email);
  const [agent, setAgent] = useState(member.agent);
  const [roleName, setRoleName] = useState(member.role.name);

  const [phoneNo, setPhoneNo] = useState(member.phoneNo);
  const [image, setImage] = useState(null);
  const [emails, setEmails] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [role, setRole] = useState(member.role._id);
  const [popupColor, setPopupColor] = useState("orange");
  const [popUpShow, setPopupshow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [staff, setStaff] = useState(member.staff);
  const [university, setUniversity] = useState([]);
  const [city, setCity] = useState([]);
  const [country, setCountry] = useState(member.country);
  const [allCities, setAllCities] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [allUniversites, setAllUniversities] = useState([]);
  const [province, setProvince] = useState([]);
  const [allProvinces, setAllProvinces] = useState([]);
  const [gender, setGender] = useState(member.gender);
  const [roles, setRoles] = useState([]);
  const [branch, setBranch] = useState(member.branch._id);
  const [allBranches, setAllBranches] = useState([]);
  const [emailShow, setEmailShow] = useState([]);
  const [fields, setFields] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [dynamicFields, setDynamicFields] = useState([]);
  const [openDynamicModal, setOpenDynamicModal] = useState(false);
  const [dynamicData, setDynamicData] = useState([]);
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (member.province && member.province.length > 0) {
      const proArrange = member.province.map((row) => {
        return {
          value: row,
          label: row,
          name: row,
        };
      });
      setProvince(proArrange);
    }
    if (member.city && member.city.length > 0) {
      const proArrange = member.city.map((row) => {
        return {
          value: row,
          label: row,
          name: row,
        };
      });
      setCity(proArrange);
    }
    if (member.emailShow) {
      setEmailShow(member.emailShow);
    }
    if (member.dynamicData) {
      setDynamicData(member.dynamicData);
    }
    if (member.dynamicFields) {
      setDynamicFields(member.dynamicFields);
    }
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
        // const allRoles = response.data.filter(
        //   (row) => row.name !== "superadmin"
        // );
        setRoles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
        if (member.university && member.university.length > 0) {
          const uniArrange = member.university.map((row) => {
            return {
              _id: row._id,
              value: row._id,
              label: row.universityName,
              name: row.universityName,
            };
          });
          setUniversity(uniArrange);
        }
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
    axios
      .get("https://crm.internationaleducationoffice.co.uk/uni-emails", config)
      .then((response) => {
        setEmails(response.data);
        let apiEmails;
        apiEmails = response.data.map((row) => ({
          email: row.email,
          show: false,
          id: row._id,
        }));
        if (member.emailShow.length > 0) {
          // Push the new emails to member.emailShow
          member.emailShow.forEach((emailObj) => {
            emailObj.id = emailObj.id._id; // Assuming the ID is stored in _id field of the id object
            delete emailObj.id.email;
            emailObj.show = emailObj.show;
          });
          // Compare the API pages with member.policy
          const newEmails = apiEmails.filter((apiEmails) => {
            return !member.emailShow.some(
              (memberEmails) =>
                memberEmails.email === apiEmails.email &&
                memberEmails.email !== undefined
            );
          });

          // Push the new pages to member.policy
          member.emailShow.push(...newEmails);
          setEmailShow(member.emailShow);
        } else {
          const newEmails = response.data.map((row) => ({
            email: row.email,
            show: false,
            id: row._id,
          }));
          setEmailShow(newEmails);
        }
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
          if (country !== member.country) {
            setProvince([]);
            setCity([]);
          }
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
          const filteredCities = response.data.data.filter((row) =>
            province.some(
              (item) =>
                item.name === row.province && row.country === item.country
            )
          );

          const provinceArrange = filteredCities.map((row) => {
            return {
              value: row.name,
              label: row.name,
              name: row.name,
            };
          });
          setAllCities(provinceArrange);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [province]);
  useEffect(() => {
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
  }, [university, programs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("role", role);
    formData.append("branch", branch);
    formData.append("email", email);
    formData.append("agent", agent);
    formData.append("country", country);
    formData.append("phoneNo", phoneNo);
    formData.append("gender", gender);
    formData.append("staff", staff);
    formData.append("username", username);
    emailShow.forEach((row, index) => {
      formData.append(`emailShow[${index}][id]`, row.id);
      formData.append(`emailShow[${index}][email]`, row.email);
      formData.append(`emailShow[${index}][show]`, row.show);
    });
    university.forEach((row, index) => {
      formData.append(`university[${index}]`, row._id);
    });
    province.forEach((row, index) => {
      formData.append(`province[${index}]`, row.name);
    });
    city.forEach((row, index) => {
      formData.append(`city[${index}]`, row.name);
    });

    Object.keys(dynamicData).forEach((key) => {
      formData.append(`dynamicData[${key}]`, dynamicData[key]);
    });
    dynamicFields.forEach((field, index) => {
      Object.entries(field).forEach(([key, value]) => {
        formData.append(`dynamicFields[${index}][${key}]`, value);
      });
    });

    axios
      .put(
        `https://crm.internationaleducationoffice.co.uk/members/${id}`,
        formData,
        config
      )
      .then((response) => {
        sessionStorage.setItem("cachedMembers", JSON.stringify(response.data));

        setPopupshow(true);
        setPopupColor("orange");
        setPopupText("Member Updated");
        setTimeout(() => {
          setPopupshow(false);
          navigate("/members");
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data) {
          alert(error.response.data);
        }
      });
  };

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleCheckboxEmails = (index, field) => (event) => {
    const newEmails = [...emailShow];
    newEmails[index][field] = event.target.checked;
    setEmailShow(newEmails);
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
              Members
            </a>
            &gt; Update Member
          </h1>
        </div>
        <div className="bottom">
          <div className="right">
            <Container>
              <h2>Basic Information</h2>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label className="pt-2">Role</Form.Label>
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
                    <Form.Label>Whatsapp No.</Form.Label>
                    <PhoneInput
                      country={"pk"} // Set the default country
                      value={phoneNo}
                      onChange={(value, data) => setPhoneNo(`+${value}`)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className="pt-2">Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".png, .jpg, .jpeg, .jfif"
                      name="myFile"
                      onChange={handleImageUpload}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className="pt-2">Branch</Form.Label>
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

              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="row d-flex">
                  <div className="col-md-6xx">
                    <h2
                      style={{
                        marginRight: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      {/* Application policies */}
                      Application Distribution Policy
                    </h2>
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
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label className="pt-2">City</Form.Label>
                          <Select
                            options={allCities}
                            isMulti
                            value={city}
                            onChange={(selected) => setCity(selected)}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="ps-2 pt-2">
                          <Form.Label>Provinces</Form.Label>
                          <Select
                            options={allProvinces}
                            isMulti
                            value={province}
                            onChange={(selected) => setProvince(selected)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Col>
                      <Form.Group className="pt-2">
                        <Form.Label>Universities</Form.Label>
                        <Select
                          options={allUniversites}
                          isMulti
                          value={university}
                          onChange={(selected) => setUniversity(selected)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* <div className="d-flex align-items-center mt-3">
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
                          required={staff || agent ? true : false}
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
              {/* <div className="container-fluid"> */}
              {roleName !== "sub-agent" ? (
                <>
                  <div className="row">
                    <h2
                      style={{
                        margin: "20px -100px 0px 0px",
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
                      {/* </div> */}
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
              {/* <div
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
                className=" px-4 mb-3"
              >
                {loading ? <CircularProgress size={10} /> : "Update"}
              </Button>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMember;
