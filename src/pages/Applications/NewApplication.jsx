import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import PopupAlert from "../../components/popupalert/popupAlert";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import helpicon from "../../assets/speech-bubble_8622562.png";
import "./appfleid.css";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import DocumentModel from "../MyCases/DocumentModel";
import qicon from "../../assets/question.png";

const NewApplication = ({ title }) => {
  const location = useLocation();
  const application = location.state.application;
  const [popUpShow, setPopupshow] = useState(false);
  const [openDocumentModal, setDocumentModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [popUpText, setPopupText] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [notes, setNotes] = useState("");
  const [notesPermission, setNotesPermission] = useState({});

  const [universities, setUniversities] = useState([]);
  const [members, setMembers] = useState([]);
  const [current_desk, setCurrentDesk] = useState("");
  const [passport, setPassport] = useState("");
  const [universityId, setUniversityId] = useState({});
  const [startData, setStartData] = useState([]);
  const [campus, setCampus] = useState({});
  const [campuses, setCampuses] = useState([]);
  const [filteredCampus, setFilteredCampuses] = useState([]);
  const [programType, setProgramType] = useState({});
  const [programTypes, setProgramTypes] = useState([]);
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [gender, setgender] = useState("");
  const [score, setScore] = useState("");
  const [province, setprovince] = useState({});
  const [firstname, setFirstName] = useState("");
  const [lastname, setlastname] = useState("");
  const [nationality, setNationality] = useState({});
  const [email, setEmail] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [monthOfBirth, setMonthOfBirth] = useState("");
  const [yearOfBirth, setyearOfBirth] = useState("");
  const [address, setaddress] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [city, setcity] = useState({});
  const [countryLivingIn, setcountryLivingIn] = useState({});
  const [region, setregion] = useState({});
  const [allRegions, setAllRegions] = useState([]);
  const [nic, setNic] = useState("");
  const [lastEducationCountry, setlastEducationCountry] = useState({});
  const [lastQualification, setlastQualification] = useState({});
  const [qualifications, setQualifications] = useState([]);
  const [lastInstitution, setlastInstitution] = useState({});
  const [allInstitutions, setAllInstitutions] = useState([]);
  const [CGPA, setCGPA] = useState("");
  const [allStatuses, setAllStatuses] = useState([]);
  const [status, setStatus] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [allProvinces, setAllProvinces] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [programId, setProgramId] = useState({});
  const [allTests, setAllTests] = useState([]);
  const [englishTest, setenglishTest] = useState({});
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [allFields, setAllFields] = useState([]);
  const [allFields0, setAllFields0] = useState([]);
  const [allFields9, setAllFields9] = useState([]);
  const [allFields1, setAllFields1] = useState([]);
  const [allFields3, setAllFields3] = useState([]);
  const [allFields4, setAllFields4] = useState([]);
  const [allFields5, setAllFields5] = useState([]);
  const [allFields10, setAllFields10] = useState([]);
  const [dynamicFields, setDynamicFields] = useState([]);
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const roleId = localStorage.getItem("roleId");
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("ieodkvToken");
  const [page_no, setPageNo] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    // axios
    //   .get(
    //     `https://crm.internationaleducationoffice.co.uk/roles/${roleId}`,
    //     config
    //   )
    //   .then((response) => {
    try {
      const sessionStorage = localStorage.getItem(`role_Data${roleId}`);
      const userGet = JSON.parse(sessionStorage);
      // const userGet = response.data;
      setFields(userGet.policy);
      const notesCleared = userGet?.policy.find((row) => row.name === "notes");

      setNotesPermission(notesCleared);
      setLoading(false);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
    } catch (error) {
      console.log(error);
    }
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/core-settings/month",
        config
      )
      .then((response) => {
        setMonth(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://crm.internationaleducationoffice.co.uk/members", config)
      .then((response) => {
        const filterMembers = response.data.filter(
          (row) => row.role.name !== "sub-agent"
        );
        setMembers(filterMembers);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://crm.internationaleducationoffice.co.uk/campus", config)
      .then((response) => {
        setFilteredCampuses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/programTypes",
        config
      )
      .then((response) => {
        const typeArrange = response.data.map((row) => {
          return {
            value: row._id,
            label: `${row.name} - ${row.graduate}`,
            name: row.name,
          };
        });
        setProgramTypes(typeArrange);
      })
      .catch((error) => {
        console.log(error);
      });
    // try {
    //   const sessionStorage = localStorage.getItem(`programs`);
    //   const userGet = JSON.parse(sessionStorage);
    // const userGet = response.data
    //   console.log(userGet);
    // setFilteredPrograms(userGet);
    // setPrograms(userGet);
    // } catch (error) {
    //   console.log(error);
    // }
    axios
      .get("https://crm.internationaleducationoffice.co.uk/programs", config)
      .then((response) => {
        setFilteredPrograms(response.data);
        setPrograms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/core-settings/year",
        config
      )
      .then((response) => {
        setYear(response.data.data);
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
            value: row._id,
            label: row.universityName,
            name: row.universityName,
          };
        });
        setUniversities(universityArrange);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/core-settings/qualifications",
        config
      )
      .then((response) => {
        const quanlificationArrange = response.data.data.map((row) => {
          return {
            value: row.name,
            label: row.name,
            name: row.name,
          };
        });
        setQualifications(quanlificationArrange);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/core-settings/country",
        config
      )
      .then((response) => {
        const countryArrange = response.data.data.map((row) => {
          return {
            value: row.name,
            label: row.name,
            name: row.name,
          };
        });

        setAllCountries(countryArrange);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/core-settings/lead-status",
        config
      )
      .then((response) => {
        setAllStatuses(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/core-settings/english-tests",
        config
      )
      .then((response) => {
        const testArrange = response.data.data.map((row) => {
          return {
            value: row.name,
            label: row.name,
            name: row.name,
          };
        });
        setAllTests(testArrange);
      })
      .catch((error) => {
        console.log(error);
      });

    try {
      const sessionStorage = localStorage.getItem(`fields`);
      const userGet = JSON.parse(sessionStorage);
      // axios
      //   .get("https://crm.internationaleducationoffice.co.uk/fields", config)
      //   .then((response) => {
      const state2 = userGet.filter((row) => row.state === 2);
      setAllFields(state2);
      const state1 = userGet.filter((row) => row.state === 1);
      setAllFields1(state1);
      const state9 = userGet.filter((row) => row.state === 9);
      setAllFields9(state9);
      const state0 = userGet.filter((row) => row.state === 0);
      setAllFields0(state0);
      const state3 = userGet.filter((row) => row.state === 3);
      setAllFields3(state3);
      const state4 = userGet.filter((row) => row.state === 4);
      setAllFields4(state4);
      const state5 = userGet.filter((row) => row.state === 5);
      setAllFields5(state5);
      const state10 = userGet.filter((row) => row.state === 10);
      setAllFields10(state10);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
    } catch (error) {
      console.log(error);
    }
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/core-settings/last-institution`,
        config
      )
      .then((response) => {
        const institutionArrange = response.data?.data.map((row) => {
          return {
            value: row.name,
            label: row.name,
            name: row.name,
          };
        });
        setAllInstitutions(institutionArrange);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (universityId) {
      const findCampus = filteredCampus.filter(
        (row) => row.university._id === universityId.value
      );
      const findPrograms = filteredPrograms.filter(
        (row) => row.university._id === universityId.value
      );

      // axios
      //   .get(
      //     `https://crm.internationaleducationoffice.co.uk/programs/university/${universityId.value}`,
      //     config
      //   )
      //   .then((response) => {
      const programArrange = findPrograms.map((row) => {
        return {
          value: row._id,
          label: row.name,
          name: row.name,
          startData: row.startData,
        };
      });
      setPrograms(programArrange);
      const campusArrange = findCampus.map((row) => {
        return {
          value: row._id,
          label: row.name,
          name: row.name,
        };
      });
      setCampuses(campusArrange);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
    }
    if (countryLivingIn) {
      axios
        .get(
          `https://crm.internationaleducationoffice.co.uk/core-settings/city`,
          config
        )
        .then((response) => {
          const countryFind = response.data.data.filter(
            (row) => row.country === countryLivingIn.value
          );

          const cityArrange = countryFind?.map((row) => {
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
      axios
        .get(
          `https://crm.internationaleducationoffice.co.uk/core-settings/province`,
          config
        )
        .then((response) => {
          const provinceFind = response.data.data.filter(
            (row) => row.country === countryLivingIn.value
          );
          const provinceArrange = provinceFind?.map((row) => {
            return {
              value: row.name,
              label: row.name,
              name: row.name,
            };
          });
          setAllProvinces(provinceArrange);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(
          `https://crm.internationaleducationoffice.co.uk/core-settings/region`,
          config
        )
        .then((response) => {
          const regionFind = response.data.data.filter(
            (row) => row.country === countryLivingIn.value
          );
          const regionArrange = regionFind?.map((row) => {
            return {
              value: row.name,
              label: row.name,
              name: row.name,
            };
          });
          setAllRegions(regionArrange);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [universityId, countryLivingIn]);
  useEffect(() => {
    if (programType && campus && universityId) {
      const findPrograms = filteredPrograms.filter(
        (row) =>
          row.university._id === universityId.value &&
          row.programType._id === programType.value &&
          row.campus._id === campus.value
      );

      const programArrange = findPrograms.map((row) => {
        return {
          value: row._id,
          label: row.name,
          name: row.name,
          startData: row.startData,
        };
      });
      setPrograms(programArrange);
    }
  }, [programType, campus, universityId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      universityId: universityId.value,
      programId: programId.value,
      startMonth,
      startYear,
      passport,
      status,
      notes: notes,
      gender,
      province: province.value,
      firstname,
      member: id,
      score,
      englishTest: englishTest.value,
      lastname,
      nationality: nationality.value,
      email,
      phoneNo,
      dynamicFields,
      manual: role !== "sub-agent" ? true : false,
      dateOfBirth,
      monthOfBirth,
      current_desk,
      yearOfBirth,
      address,
      postalCode,
      city: city.value,
      countryLivingIn: countryLivingIn.value,
      region: region.value,
      nic,
      lastEducationCountry: lastEducationCountry.value,
      lastQualification: lastQualification.value,
      lastInstitution: lastInstitution.value,
      password: "1234567890",
      CGPA,
    };

    axios
      .post(
        "https://crm.internationaleducationoffice.co.uk/applications/manually",
        data,
        config
      )
      .then((response) => {
        console.log(response.data);
        setSelectedRow(response.data);
        handleShow();
        setPopupshow(true);
        setPopupText("Application Added");
        setErrorShow(false);
        setTimeout(() => {
          // if (application) {
          //   navigate("/applications");
          // } else {
          //   navigate("/my-cases");
          // }
          // window.location.reload();
          setPopupshow(false);

          // setDocumentModal(true);
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data) {
          alert(error.response?.data);
        }
      });
  };

  const model1 = () => {
    setDocumentModal(true);
    handleClose();
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {popUpShow ? (
          <PopupAlert popUpText={popUpText} backgroundColor={"#8AFF8A"} />
        ) : (
          ""
        )}
        <div className="top-new">
          <h1 className="heading-top text-dark ps-3 fw-bold">
            <a
              href={application ? `/applications` : `/my-cases`}
              style={{ color: "black" }}
            >
              Applications{" "}
            </a>
            &gt; Add Applications
          </h1>
        </div>
        <Modal show={show}>
          {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
          <Modal.Body>
            <div className="container">
              <div className="row d-flex justify-content-center mb-4 mt-3">
                <img
                  src={qicon}
                  alt=""
                  style={{ height: "100px", width: "120px" }}
                ></img>
              </div>
              <div className="row text-center">
                <h1 style={{ fontSize: "1.5rem" }}>
                  Do you wish to upload the documents right now?
                </h1>
              </div>
              <hr className="text-dark"></hr>
              <div className="row ">
                <div className="col d-flex justify-content-center">
                  <Button
                    variant="primary"
                    onClick={model1}
                    style={{
                      backgroundColor: "green",
                      border: "none",
                      width: "150px",
                    }}
                  >
                    Yes
                  </Button>
                </div>
                <div className="col d-flex justify-content-center">
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClose();
                      if (role === "superadmin") {
                        navigate("/applications");
                      } else {
                        navigate("/my-cases");
                      }
                    }}
                    style={{
                      backgroundColor: "red",
                      border: "none",
                      width: "150px",
                    }}
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={openDocumentModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Upload documents</Modal.Title>
          </Modal.Header>
          <div style={{ margin: "20px" }}>
            <DocumentModel selectedRow={selectedRow} newApp={true} />
          </div>
        </Modal>

        <div className="btn-group">
          <div className="gap-3 mt-2">
            {/* {allFields0.some((row) => row.create || row.update) && ( */}
            <button
              className="ms-4 btn btn-primary"
              style={{ backgroundColor: page_no === 0 && "#5a5bda" }}
              onClick={() => setPageNo(0)}
            >
              <i className="bi bi-person-circle me-2"></i> Counselor
            </button>
            {/* )} */}
            {/* <button
              className="ms-2 btn btn-primary"
              style={{ backgroundColor: page_no === 1 && "#5a5bda" }}
              onClick={() => setPageNo(1)}
            >
              <i className="fa-solid fa-graduation-cap me-2"></i> Academic
              Details
            </button> */}
            {/* <button className="ms-2 btn btn-primary gap-2" style={{ backgroundColor: page_no === 2 ? "red" : "blue" }} onClick={() => setPageNo(2)}><i className="fa-solid fa-user-tie me-2"></i> Professional Details</button> */}
            {/* <button className="ms-2 btn btn-primary" style={{ backgroundColor: page_no === 3 ? "red" : "blue" }} onClick={() => setPageNo(3)}><i className="bi bi-duffle-fill me-2"></i> Work Experience</button> */}
            {/* <button
              className="btn btn-primary ms-2"
              style={{ backgroundColor: page_no === 3 && "#5a5bda" }}
              onClick={() => setPageNo(3)}
            >
              <i className="bi bi-bank2 me-2"></i>Suggested University
            </button> */}
            {/* {allFields4.some((row) => row.create || row.update) && ( */}
            <>
              <button
                className="btn btn-primary ms-2"
                style={{ backgroundColor: page_no === 4 && "#5a5bda" }}
                onClick={() => setPageNo(4)}
              >
                <i className="fa-solid fa-table-list me-2"></i> Admission
                officer
              </button>
            </>{" "}
            <>
              <button
                className="btn btn-primary ms-2"
                style={{ backgroundColor: page_no === 10 && "#5a5bda" }}
                onClick={() => setPageNo(10)}
              >
                <i className="fa-solid fa-table-list me-2"></i> Status
              </button>
            </>
            <>
              <button
                className="btn btn-primary ms-2"
                style={{ backgroundColor: page_no === 9 && "#5a5bda" }}
                onClick={() => setPageNo(9)}
              >
                <i className="fa-solid fa-table-list me-2"></i> CAS
              </button>
            </>
            {/* )} */}
            {/* {allFields5.some((row) => row.create || row.update) && ( */}
            <>
              <button
                className="btn btn-primary ms-2"
                style={{ backgroundColor: page_no === 5 && "#5a5bda" }}
                onClick={() => setPageNo(5)}
              >
                <i className="fa-solid fa-table-list me-2"></i> Visa officer
              </button>
            </>
            {/* )} */}
            {/* <button
              className="btn btn-primary ms-2"
              style={{ backgroundColor: page_no === 2 && "#5a5bda" }}
              onClick={() => setPageNo(2)}
            >
              <i className="fa-solid fa-table-list me-2"></i> Dynamic Fields
            </button> */}
          </div>
        </div>
        <div className="bottom">
          <div className="right">
            <div style={{ color: "red", fontSize: 10 }}>{errorMessage}</div>
            <Form onSubmit={handleSubmit}>
              <div>
                <div className="container-fluid">
                  <div className="row me-3 mt-3 ms-2">
                    {page_no === 0 ? (
                      <div className="col-md-7 box7 p-3">
                        <div className="heading-box Scroll">
                          <h3 className="fw-bold">Counselor</h3>
                          <h5
                            className="fw-bold"
                            style={{ textDecoration: "underline" }}
                          >
                            Personal Details
                          </h5>

                          {fields.map((field) => {
                            if (field.name === "firstname" && field.create) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    First name<span className="esterik">*</span>
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-user-tie"></i>
                                    </span>
                                    {/* <i className="fa-solid fa-user-tie icon fa-lg"></i> */}
                                    <FormControl
                                      className="form-control"
                                      type="text"
                                      placeholder="Firstname"
                                      required
                                      value={firstname}
                                      onChange={(e) =>
                                        setFirstName(e.target.value)
                                      }
                                    />
                                  </div>
                                </Form.Group>
                              );
                            } else if (
                              field.name === "lastname" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    Last name<span className="esterik">*</span>
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-user-tie"></i>
                                    </span>

                                    <Form.Control
                                      type="text"
                                      placeholder="Lastname"
                                      required
                                      value={lastname}
                                      onChange={(e) =>
                                        setlastname(e.target.value)
                                      }
                                    />
                                  </div>
                                </Form.Group>
                              );
                            } else if (
                              field.name === "gender" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    Gender
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-person-half-dress"></i>
                                    </span>
                                    <Form.Control
                                      as="select"
                                      value={gender}
                                      // required
                                      onChange={(e) => {
                                        setgender(e.target.value);
                                      }}
                                    >
                                      <option value="">Select gender</option>
                                      <option value="Female">Female</option>
                                      <option value="Male">Male</option>
                                    </Form.Control>
                                  </div>
                                </Form.Group>
                              );
                            } else if (field.name === "email" && field.create) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    Email<span className="esterik">*</span>
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-envelope"></i>
                                    </span>

                                    <Form.Control
                                      type="email"
                                      placeholder="Email"
                                      required
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                    />
                                  </div>
                                </Form.Group>
                              );
                            } else if (
                              field.name === "phoneNo" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    Phone no<span className="esterik">*</span>
                                  </Form.Label>

                                  <PhoneInput
                                    country={"pk"} // Set the default country
                                    value={phoneNo}
                                    required
                                    style={{ width: "100%" }}
                                    onChange={(value, data) =>
                                      setphoneNo(`+${value}`)
                                    }
                                  />
                                </Form.Group>
                              );
                            } else if (
                              field.name === "dateOfBirth" &&
                              field.create
                            ) {
                              return (
                                <div key={field._id}>
                                  <Form.Group style={{ width: "90%" }}>
                                    <Form.Label className="label-form fw-bold pt-2">
                                      Date of birth
                                    </Form.Label>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <span className="input-group-text">
                                        <i className="fa-solid fa-calendar"></i>
                                      </span>

                                      <Form.Control
                                        as="select"
                                        value={dateOfBirth}
                                        style={{ marginLeft: 20, width: "20%" }}
                                        onChange={(e) => {
                                          setdateOfBirth(e.target.value);
                                        }}
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
                                        style={{ marginLeft: 20, width: "30%" }}
                                        value={monthOfBirth}
                                        onChange={(e) => {
                                          setMonthOfBirth(e.target.value);
                                        }}
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
                                        style={{ marginLeft: 20, width: "20%" }}
                                        value={yearOfBirth}
                                        onChange={(e) => {
                                          setyearOfBirth(e.target.value);
                                        }}
                                      >
                                        <option value=""></option>
                                        {year.map((row, index) => (
                                          <option value={row.name} key={index}>
                                            {row.name}
                                          </option>
                                        ))}
                                      </Form.Control>
                                    </div>
                                  </Form.Group>
                                </div>
                              );
                            } else if (field.name === "nic" && field.create) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    NIC
                                  </Form.Label>

                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-address-card"></i>
                                    </span>
                                    <Form.Control
                                      type="text"
                                      placeholder="NIC"
                                      value={nic}
                                      onChange={(e) => setNic(e.target.value)}
                                    />
                                  </div>
                                </Form.Group>
                              );
                            } else if (
                              field.name === "passport" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    Passport
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-passport"></i>
                                    </span>
                                    <Form.Control
                                      type="text"
                                      placeholder="Passport"
                                      value={passport}
                                      onChange={(e) =>
                                        setPassport(e.target.value)
                                      }
                                    />
                                  </div>
                                </Form.Group>
                              );
                            } else if (
                              field.name === "nationality" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    Nationality
                                  </Form.Label>
                                  <div
                                    className="input-group"
                                    style={{ width: "100%" }}
                                  >
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-flag"></i>
                                    </span>
                                    <Form.Group
                                      className="form-control"
                                      styles={{ width: "100%" }}
                                    >
                                      <Select
                                        // style={{
                                        //   margin: "0px 0px",
                                        //   border: "none",
                                        //   width: "100%",
                                        // }}
                                        options={allCountries}
                                        value={nationality}
                                        onChange={(selected) =>
                                          setNationality(selected)
                                        }
                                      />
                                    </Form.Group>
                                    {/* <Form.Control
                              as="select"
                              value={nationality}
                              onChange={(e) => {
                                setNationality(e.target.value);
                              }}
                            >
                              <option value="">Select country</option>
                              {allCountries.map((row, index) => (
                                <option value={row.name} key={index}>
                                  {row.name}
                                </option>
                              ))}
                            </Form.Control> */}
                                  </div>
                                </Form.Group>
                              );
                            } else if (
                              field.name === "countryLivingIn" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    {" "}
                                    Currently living in
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-flag"></i>
                                    </span>
                                    <Form.Group
                                      className="form-control"
                                      styles={{ width: "100%" }}
                                    >
                                      <Select
                                        options={allCountries}
                                        value={countryLivingIn}
                                        onChange={(selected) =>
                                          setcountryLivingIn(selected)
                                        }
                                      />
                                    </Form.Group>
                                  </div>
                                </Form.Group>
                              );
                            } else if (
                              field.name === "address" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    Address
                                  </Form.Label>

                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-map-location-dot"></i>
                                    </span>

                                    <Form.Control
                                      type="text"
                                      placeholder="Address"
                                      value={address}
                                      onChange={(e) =>
                                        setaddress(e.target.value)
                                      }
                                    />
                                  </div>
                                </Form.Group>
                              );
                            } else if (
                              field.name === "postalCode" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    Postal code
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-code"></i>
                                    </span>

                                    <Form.Control
                                      type="text"
                                      placeholder="Postal Code"
                                      value={postalCode}
                                      onChange={(e) =>
                                        setpostalCode(e.target.value)
                                      }
                                    />
                                  </div>
                                </Form.Group>
                              );
                            } else if (
                              field.name === "province" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    Province
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-map-location-dot"></i>
                                    </span>
                                    <Form.Group
                                      className="form-control"
                                      styles={{ width: "100%" }}
                                    >
                                      <Select
                                        options={allProvinces}
                                        value={province}
                                        onChange={(selected) =>
                                          setprovince(selected)
                                        }
                                      />
                                    </Form.Group>{" "}
                                    {/* <Form.Control
                              as="select"
                              value={province}
                              required
                              onChange={(e) => {
                                setprovince(e.target.value);
                              }}
                            >
                              <option value="">Select province</option>
                              {allProvinces.map((row, index) => (
                                <option value={row.name} key={index}>
                                  {row.name}
                                </option>
                              ))}
                            </Form.Control> */}
                                  </div>
                                </Form.Group>
                              );
                            } else if (field.name === "city" && field.create) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    City
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-city"></i>
                                    </span>
                                    <Form.Group
                                      className="form-control"
                                      styles={{ width: "100%" }}
                                    >
                                      <Select
                                        options={allCities}
                                        value={city}
                                        onChange={(selected) =>
                                          setcity(selected)
                                        }
                                      />
                                    </Form.Group>
                                    {/* <Form.Control
                              as="select"
                              required
                              value={city}
                              onChange={(e) => {
                                setcity(e.target.value);
                              }}
                            >
                              <option value="">Select city</option>
                              {allCities.map((row, index) => (
                                <option value={row.name} key={index}>
                                  {row.name}
                                </option>
                              ))}
                            </Form.Control> */}
                                  </div>
                                </Form.Group>
                              );
                            } else if (
                              field.name === "region" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    Region
                                  </Form.Label>

                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-map-location-dot"></i>
                                    </span>
                                    <Form.Group
                                      className="form-control"
                                      styles={{ width: "100%" }}
                                    >
                                      <Select
                                        options={allRegions}
                                        value={region}
                                        onChange={(selected) =>
                                          setregion(selected)
                                        }
                                      />
                                    </Form.Group>{" "}
                                    {/* <Form.Control
                              as="select"
                              value={region}
                              onChange={(e) => {
                                setregion(e.target.value);
                              }}
                            >
                              <option value="">Select</option>
                              {allRegions.map((row, index) => (
                                <option value={row.name} key={index}>
                                  {row.name}
                                </option>
                              ))}
                            </Form.Control> */}
                                  </div>
                                </Form.Group>
                              );
                            }
                            return null;
                          })}
                          <h5
                            className="fw-bold"
                            style={{
                              textDecoration: "underline",
                              margin: "10px 0px",
                            }}
                          >
                            Academic Details
                          </h5>
                          {fields.map((field) => {
                            if (
                              field.name === "lastEducationCountry" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    {" "}
                                    Last education country
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-flag"></i>
                                    </span>
                                    <Form.Group
                                      className="form-control"
                                      styles={{ width: "100%" }}
                                    >
                                      <Select
                                        options={allCountries}
                                        value={lastEducationCountry}
                                        onChange={(selected) =>
                                          setlastEducationCountry(selected)
                                        }
                                      />
                                    </Form.Group>
                                  </div>
                                </Form.Group>
                              );
                            } else if (
                              field.name === "lastQualification" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    Last qualification
                                  </Form.Label>

                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="  fa-solid fa-graduation-cap"></i>
                                    </span>
                                    <Form.Group
                                      className="form-control"
                                      styles={{ width: "100%" }}
                                    >
                                      <Select
                                        options={qualifications}
                                        value={lastQualification}
                                        onChange={(selected) =>
                                          setlastQualification(selected)
                                        }
                                      />
                                    </Form.Group>
                                  </div>
                                </Form.Group>
                              );
                            } else if (
                              field.name === "lastInstitution" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    Last institution
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="  fa-solid fa-graduation-cap"></i>
                                    </span>
                                    <Form.Group
                                      className="form-control"
                                      styles={{ width: "100%" }}
                                    >
                                      <Select
                                        options={allInstitutions}
                                        value={lastInstitution}
                                        onChange={(selected) =>
                                          setlastInstitution(selected)
                                        }
                                      />
                                    </Form.Group>
                                    {/* <Form.Control
                              as="select"
                              value={lastInstitution}
                              onChange={(e) => {
                                setlastInstitution(e.target.value);
                              }}
                            >
                              <option value="">Select</option>
                              {allInstitutions.map((row, index) => (
                                <option value={row.name} key={index}>
                                  {row.name}
                                </option>
                              ))}
                            </Form.Control> */}
                                  </div>
                                </Form.Group>
                              );
                            } else if (field.name === "CGPA" && field.create) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    CGPA
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="  fa-solid fa-graduation-cap"></i>
                                    </span>
                                    <Form.Control
                                      type="text"
                                      value={CGPA}
                                      onChange={(e) => {
                                        setCGPA(e.target.value);
                                      }}
                                    />
                                  </div>
                                </Form.Group>
                              );
                            } else if (
                              field.name === "englishTest" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    English test
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="  fa-solid fa-graduation-cap"></i>
                                    </span>
                                    <Form.Group
                                      className="form-control"
                                      styles={{ width: "100%" }}
                                    >
                                      <Select
                                        options={allTests}
                                        value={englishTest}
                                        onChange={(selected) =>
                                          setenglishTest(selected)
                                        }
                                      />
                                    </Form.Group>
                                    {/* <Form.Control
                              as="select"
                              value={englishTest}
                              onChange={(e) => {
                                setenglishTest(e.target.value);
                              }}
                            >
                              <option value="">Select</option>
                              {allTests.map((row, index) => (
                                <option value={row.name} key={index}>
                                  {row.name}
                                </option>
                              ))}
                            </Form.Control> */}
                                  </div>
                                </Form.Group>
                              );
                            } else if (field.name === "score" && field.create) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    Score
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-star"></i>
                                    </span>
                                    <Form.Control
                                      type="text"
                                      value={score}
                                      onChange={(e) => {
                                        setScore(e.target.value);
                                      }}
                                    />
                                  </div>
                                </Form.Group>
                              );
                            }
                            return null;
                          })}
                          <h5
                            className="fw-bold"
                            style={{
                              textDecoration: "underline",
                              margin: "10px 0px",
                            }}
                          >
                            Suggested University
                          </h5>
                          {fields.map((field) => {
                            if (field.name === "universityId" && field.create) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    University<span className="esterik">*</span>
                                  </Form.Label>

                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-building-columns"></i>
                                    </span>
                                    <Form.Group
                                      className="form-control"
                                      styles={{ width: "100%" }}
                                    >
                                      <Select
                                        options={universities}
                                        value={universityId}
                                        required
                                        onChange={(selected) => {
                                          setUniversityId(selected);
                                        }}
                                      />
                                    </Form.Group>
                                    {/* <Form.Control
                              as="select"
                              value={universityId}
                              required
                              onChange={(e) => {
                                setUniversityId(e.target.value);
                              }}
                            >
                              <option value="">Select</option>
                              {universities.map((row, index) => (
                                <option value={row._id} key={index}>
                                  {row.universityName}
                                </option>
                              ))}
                            </Form.Control> */}
                                  </div>
                                </Form.Group>
                              );
                            } else if (
                              field.name === "programId" &&
                              field.create
                            ) {
                              return (
                                <>
                                  {" "}
                                  <Form.Group
                                    style={{ width: "90%" }}
                                    key={field._id}
                                  >
                                    <Form.Label className="text-dark fw-bold pt-2">
                                      Campus
                                    </Form.Label>

                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="fa-solid fa-book-open"></i>
                                      </span>
                                      <Form.Group
                                        className="form-control"
                                        styles={{ width: "100%" }}
                                      >
                                        <Select
                                          options={campuses}
                                          value={campus}
                                          onChange={(selected) => {
                                            setCampus(selected);
                                          }}
                                        />
                                      </Form.Group>
                                      {/* <Form.Control
                              as="select"
                              value={programId}
                              required
                              onChange={(e) => {
                                setProgramId(e.target.value);
                                const startFind = programs.find(
                                  (row) => row._id === e.target.value
                                );

                                setStartData(startFind.startData);
                              }}
                            >
                              <option value="">Select</option>
                              {programs.map((row, index) => (
                                <option value={row._id} key={index}>
                                  {row.name}-{row.subject.name}-
                                  {row.degree.name}
                                </option>
                              ))}
                            </Form.Control> */}
                                    </div>
                                  </Form.Group>
                                  <Form.Group
                                    style={{ width: "90%" }}
                                    key={field._id}
                                  >
                                    <Form.Label className="text-dark fw-bold pt-2">
                                      Degree type
                                    </Form.Label>

                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="fa-solid fa-book-open"></i>
                                      </span>
                                      <Form.Group
                                        className="form-control"
                                        styles={{ width: "100%" }}
                                      >
                                        <Select
                                          options={programTypes}
                                          value={programType}
                                          onChange={(selected) => {
                                            setProgramType(selected);
                                          }}
                                        />
                                      </Form.Group>
                                      {/* <Form.Control
                              as="select"
                              value={programId}
                              required
                              onChange={(e) => {
                                setProgramId(e.target.value);
                                const startFind = programs.find(
                                  (row) => row._id === e.target.value
                                );

                                setStartData(startFind.startData);
                              }}
                            >
                              <option value="">Select</option>
                              {programs.map((row, index) => (
                                <option value={row._id} key={index}>
                                  {row.name}-{row.subject.name}-
                                  {row.degree.name}
                                </option>
                              ))}
                            </Form.Control> */}
                                    </div>
                                  </Form.Group>
                                  <Form.Group
                                    style={{ width: "90%" }}
                                    key={field._id}
                                  >
                                    <Form.Label className="text-dark fw-bold pt-2">
                                      Program<span className="esterik">*</span>
                                    </Form.Label>

                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="fa-solid fa-book-open"></i>
                                      </span>
                                      <Form.Group
                                        className="form-control"
                                        styles={{ width: "100%" }}
                                      >
                                        <Select
                                          options={programs}
                                          value={programId}
                                          required
                                          onChange={(selected) => {
                                            setProgramId(selected);
                                            setStartData(selected.startData);
                                          }}
                                        />
                                      </Form.Group>
                                      {/* <Form.Control
                              as="select"
                              value={programId}
                              required
                              onChange={(e) => {
                                setProgramId(e.target.value);
                                const startFind = programs.find(
                                  (row) => row._id === e.target.value
                                );

                                setStartData(startFind.startData);
                              }}
                            >
                              <option value="">Select</option>
                              {programs.map((row, index) => (
                                <option value={row._id} key={index}>
                                  {row.name}-{row.subject.name}-
                                  {row.degree.name}
                                </option>
                              ))}
                            </Form.Control> */}
                                    </div>
                                  </Form.Group>
                                </>
                              );
                            } else if (
                              field.name === "startMonth" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    Session
                                  </Form.Label>

                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-user-clock"></i>
                                    </span>
                                    <Form.Control
                                      as="select"
                                      value={startMonth}
                                      onChange={(e) => {
                                        const selectedStartDate =
                                          e.target.value;

                                        const selectedRow = startData.find(
                                          (row) =>
                                            row.startMonth === selectedStartDate
                                        );
                                        if (selectedRow) {
                                          setStartMonth(selectedRow.startMonth);
                                          setStartYear(selectedRow.startYear);
                                        } else {
                                          setStartMonth("");
                                          setStartYear("");
                                        }
                                      }}
                                    >
                                      <option value="">Select</option>
                                      {startData.map((row, index) => (
                                        <option
                                          value={row.startMonth}
                                          key={index}
                                        >
                                          {row.startMonth} {row.startYear}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  </div>
                                </Form.Group>
                              );
                            }
                            // else if (field.name === "status" && field.create) {
                            //   return (
                            //     <Form.Group style={{ width: "90%" }} key={field._id}>
                            //       <Form.Label className="text-dark fw-bold pt-2">Lead status</Form.Label>
                            //       <Form.Control
                            //         as="select"
                            //         value={status}
                            //         onChange={(e) => {
                            //           setStatus(e.target.value);
                            //         }}
                            //       >
                            //         <option value="">Select</option>
                            //         {allStatuses.map((row, index) => (
                            //           <option value={row.name} key={index}>
                            //             {row.name}
                            //           </option>
                            //         ))}
                            //       </Form.Control>
                            //     </Form.Group>
                            //   );
                            // }

                            return null;
                          })}
                        </div>
                        {allFields0.map((row) => {
                          const field = fields.find((f) => f.name === row.key);
                          if (field && field.create === true) {
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  width: "100%",
                                }}
                                key={row.key}
                              >
                                <Form.Group controlId={row.key}>
                                  <Form.Label
                                    className="label-form fw-bold text-dark pt-3"
                                    column
                                    sm={3}
                                  >
                                    {row.label}
                                  </Form.Label>

                                  {row.type === "String" && (
                                    <Form.Control
                                      type="text"
                                      style={{ height: "40px", width: "90%" }}
                                      value={dynamicFields[row.key] || ""}
                                      onChange={(e) => {
                                        setDynamicFields({
                                          ...dynamicFields,
                                          [row.key]: e.target.value,
                                        });
                                      }}
                                    />
                                  )}
                                  {row.type === "Options" && (
                                    <Form.Control
                                      as="select"
                                      className="input-form"
                                      style={{ height: "40px", width: "90%" }}
                                      value={dynamicFields[row.key] || ""}
                                      onChange={(e) => {
                                        setDynamicFields({
                                          ...dynamicFields,
                                          [row.key]: e.target.value,
                                        });
                                      }}
                                    >
                                      <option value="">Select an option</option>
                                      {row.options.map((option, index) => (
                                        <option value={option} key={index}>
                                          {option}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  )}
                                  {row.type === "Number" && (
                                    <Form.Control
                                      type="number"
                                      placeholder="Enter a number"
                                      className="input-form"
                                      style={{ height: "40px", width: "90%" }}
                                      value={dynamicFields[row.key] || ""}
                                      onChange={(e) => {
                                        setDynamicFields({
                                          ...dynamicFields,
                                          [row.key]: e.target.value,
                                        });
                                      }}
                                    />
                                  )}

                                  {row.type === "Date" && (
                                    <div
                                      key={field._id}
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        width: "100%",
                                      }}
                                    >
                                      <span className="input-group-text">
                                        <i className="fa-solid fa-calendar"></i>
                                      </span>

                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          width: "90%",
                                        }}
                                      >
                                        <Form.Control
                                          as="select"
                                          style={{ width: "20%" }}
                                          value={
                                            dynamicFields[`${row.key}Date`] ||
                                            ""
                                          }
                                          onChange={(e) => {
                                            setDynamicFields({
                                              ...dynamicFields,
                                              [`${row.key}Date`]:
                                                e.target.value,
                                            });
                                          }}
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
                                          style={{
                                            marginLeft: 20,
                                            width: "30%",
                                          }}
                                          value={
                                            dynamicFields[`${row.key}Month`] ||
                                            ""
                                          }
                                          onChange={(e) => {
                                            setDynamicFields({
                                              ...dynamicFields,
                                              [`${row.key}Month`]:
                                                e.target.value,
                                            });
                                          }}
                                        >
                                          <option value=""></option>
                                          {month.map((row, index) => (
                                            <option
                                              value={row.name}
                                              key={index}
                                            >
                                              {row.name}
                                            </option>
                                          ))}
                                        </Form.Control>
                                        <Form.Control
                                          as="select"
                                          style={{
                                            marginLeft: 20,
                                            width: "20%",
                                          }}
                                          value={
                                            dynamicFields[`${row.key}Year`] ||
                                            ""
                                          }
                                          onChange={(e) => {
                                            setDynamicFields({
                                              ...dynamicFields,
                                              [`${row.key}Year`]:
                                                e.target.value,
                                            });
                                          }}
                                        >
                                          <option value=""></option>
                                          {year.map((row, index) => (
                                            <option
                                              value={row.name}
                                              key={index}
                                            >
                                              {row.name}
                                            </option>
                                          ))}
                                        </Form.Control>
                                      </div>
                                    </div>
                                  )}

                                  {row.type === "Dropdown" && (
                                    <Form.Control
                                      as="select"
                                      className="input-form"
                                      style={{ height: "40px", width: "90%" }}
                                      value={dynamicFields[row.key] || ""}
                                      onChange={(e) => {
                                        setDynamicFields({
                                          ...dynamicFields,
                                          [row.key]: e.target.value,
                                        });
                                      }}
                                    >
                                      <option value="">Select</option>
                                      {row.options.map((option, index) => (
                                        <option value={option.name} key={index}>
                                          {option.name}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  )}
                                </Form.Group>
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </div>
                    ) : page_no === 1 ? (
                      <div className="col-md-7 box7 p-3">
                        <div className="heading-box">
                          <h4 className="fw-bold">Academic Details</h4>
                          {fields.map((field) => {
                            if (
                              field.name === "lastEducationCountry" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    {" "}
                                    Last education country
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-flag"></i>
                                    </span>
                                    <Form.Group
                                      className="form-control"
                                      styles={{ width: "100%" }}
                                    >
                                      <Select
                                        options={allCountries}
                                        value={lastEducationCountry}
                                        onChange={(selected) =>
                                          setlastEducationCountry(selected)
                                        }
                                      />
                                    </Form.Group>
                                  </div>
                                </Form.Group>
                              );
                            } else if (
                              field.name === "lastQualification" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    Last qualification
                                  </Form.Label>

                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="  fa-solid fa-graduation-cap"></i>
                                    </span>
                                    <Form.Group
                                      className="form-control"
                                      styles={{ width: "100%" }}
                                    >
                                      <Select
                                        options={qualifications}
                                        value={lastQualification}
                                        onChange={(selected) =>
                                          setlastQualification(selected)
                                        }
                                      />
                                    </Form.Group>
                                  </div>
                                </Form.Group>
                              );
                            } else if (
                              field.name === "lastInstitution" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    Last institution
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="  fa-solid fa-graduation-cap"></i>
                                    </span>
                                    <Form.Group
                                      className="form-control"
                                      styles={{ width: "100%" }}
                                    >
                                      <Select
                                        options={allInstitutions}
                                        value={lastInstitution}
                                        onChange={(selected) =>
                                          setlastInstitution(selected)
                                        }
                                      />
                                    </Form.Group>
                                    {/* <Form.Control
                              as="select"
                              value={lastInstitution}
                              onChange={(e) => {
                                setlastInstitution(e.target.value);
                              }}
                            >
                              <option value="">Select</option>
                              {allInstitutions.map((row, index) => (
                                <option value={row.name} key={index}>
                                  {row.name}
                                </option>
                              ))}
                            </Form.Control> */}
                                  </div>
                                </Form.Group>
                              );
                            } else if (field.name === "CGPA" && field.create) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    CGPA
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="  fa-solid fa-graduation-cap"></i>
                                    </span>
                                    <Form.Control
                                      type="text"
                                      value={CGPA}
                                      onChange={(e) => {
                                        setCGPA(e.target.value);
                                      }}
                                    />
                                  </div>
                                </Form.Group>
                              );
                            } else if (
                              field.name === "englishTest" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    English test
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="  fa-solid fa-graduation-cap"></i>
                                    </span>
                                    <Form.Group
                                      className="form-control"
                                      styles={{ width: "100%" }}
                                    >
                                      <Select
                                        options={allTests}
                                        value={englishTest}
                                        onChange={(selected) =>
                                          setenglishTest(selected)
                                        }
                                      />
                                    </Form.Group>
                                    {/* <Form.Control
                              as="select"
                              value={englishTest}
                              onChange={(e) => {
                                setenglishTest(e.target.value);
                              }}
                            >
                              <option value="">Select</option>
                              {allTests.map((row, index) => (
                                <option value={row.name} key={index}>
                                  {row.name}
                                </option>
                              ))}
                            </Form.Control> */}
                                  </div>
                                </Form.Group>
                              );
                            } else if (field.name === "score" && field.create) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    Score
                                  </Form.Label>
                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-star"></i>
                                    </span>
                                    <Form.Control
                                      type="text"
                                      value={score}
                                      onChange={(e) => {
                                        setScore(e.target.value);
                                      }}
                                    />
                                  </div>
                                </Form.Group>
                              );
                            }
                            return null;
                          })}
                        </div>{" "}
                        {allFields1.map((row) => {
                          const field = fields.find((f) => f.name === row.key);
                          if (field && field.create === true) {
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                                key={row.key}
                              >
                                <Form.Group controlId={row.key}>
                                  <Form.Label
                                    className="label-form fw-bold text-dark pt-3"
                                    column
                                    sm={3}
                                  >
                                    {row.label}
                                  </Form.Label>

                                  {row.type === "String" && (
                                    <Form.Control
                                      type="text"
                                      value={dynamicFields[row.key] || ""}
                                      onChange={(e) => {
                                        setDynamicFields({
                                          ...dynamicFields,
                                          [row.key]: e.target.value,
                                        });
                                      }}
                                      style={{ height: "40px", width: "90%" }}
                                    />
                                  )}
                                  {row.type === "Options" && (
                                    <Form.Control
                                      as="select"
                                      className="input-form"
                                      style={{ height: "40px", width: "90%" }}
                                      value={dynamicFields[row.key] || ""}
                                      onChange={(e) => {
                                        setDynamicFields({
                                          ...dynamicFields,
                                          [row.key]: e.target.value,
                                        });
                                      }}
                                    >
                                      <option value="">Select an option</option>
                                      {row.options.map((option, index) => (
                                        <option value={option} key={index}>
                                          {option}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  )}
                                  {row.type === "Number" && (
                                    <Form.Control
                                      type="number"
                                      placeholder="Enter a number"
                                      className="input-form"
                                      style={{ height: "40px", width: "90%" }}
                                      value={dynamicFields[row.key] || ""}
                                      onChange={(e) => {
                                        setDynamicFields({
                                          ...dynamicFields,
                                          [row.key]: e.target.value,
                                        });
                                      }}
                                    />
                                  )}

                                  {row.type === "Date" && (
                                    <div
                                      key={field._id}
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        width: "100%",
                                      }}
                                    >
                                      <span className="input-group-text">
                                        <i className="fa-solid fa-calendar"></i>
                                      </span>

                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          width: "90%",
                                        }}
                                      >
                                        <Form.Control
                                          as="select"
                                          style={{ width: "20%" }}
                                          value={
                                            dynamicFields[`${row.key}Date`] ||
                                            ""
                                          }
                                          onChange={(e) => {
                                            setDynamicFields({
                                              ...dynamicFields,
                                              [`${row.key}Date`]:
                                                e.target.value,
                                            });
                                          }}
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
                                          style={{
                                            marginLeft: 20,
                                            width: "30%",
                                          }}
                                          value={
                                            dynamicFields[`${row.key}Month`] ||
                                            ""
                                          }
                                          onChange={(e) => {
                                            setDynamicFields({
                                              ...dynamicFields,
                                              [`${row.key}Month`]:
                                                e.target.value,
                                            });
                                          }}
                                        >
                                          <option value=""></option>
                                          {month.map((row, index) => (
                                            <option
                                              value={row.name}
                                              key={index}
                                            >
                                              {row.name}
                                            </option>
                                          ))}
                                        </Form.Control>
                                        <Form.Control
                                          as="select"
                                          style={{
                                            marginLeft: 20,
                                            width: "20%",
                                          }}
                                          value={
                                            dynamicFields[`${row.key}Year`] ||
                                            ""
                                          }
                                          onChange={(e) => {
                                            setDynamicFields({
                                              ...dynamicFields,
                                              [`${row.key}Year`]:
                                                e.target.value,
                                            });
                                          }}
                                        >
                                          <option value=""></option>
                                          {year.map((row, index) => (
                                            <option
                                              value={row.name}
                                              key={index}
                                            >
                                              {row.name}
                                            </option>
                                          ))}
                                        </Form.Control>
                                      </div>
                                    </div>
                                  )}

                                  {row.type === "Dropdown" && (
                                    <Form.Control
                                      as="select"
                                      className="input-form"
                                      style={{ height: "40px", width: "90%" }}
                                      value={dynamicFields[row.key] || ""}
                                      onChange={(e) => {
                                        setDynamicFields({
                                          ...dynamicFields,
                                          [row.key]: e.target.value,
                                        });
                                      }}
                                    >
                                      <option value="">Select</option>
                                      {row.options.map((option, index) => (
                                        <option value={option.name} key={index}>
                                          {option.name}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  )}
                                </Form.Group>
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </div>
                    ) : page_no === 3 ? (
                      <div className="col-md-7 box7 p-3">
                        <div className="heading-box">
                          <h4 className="fw-bold">Suggested University</h4>
                          {fields.map((field) => {
                            if (field.name === "universityId" && field.create) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    University<span className="esterik">*</span>
                                  </Form.Label>

                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-building-columns"></i>
                                    </span>
                                    <Form.Group
                                      className="form-control"
                                      styles={{ width: "100%" }}
                                    >
                                      <Select
                                        options={universities}
                                        value={universityId}
                                        required={
                                          role === "sub-agent" ? true : false
                                        }
                                        onChange={(selected) => {
                                          setUniversityId(selected);
                                        }}
                                      />
                                    </Form.Group>
                                    {/* <Form.Control
                              as="select"
                              value={universityId}
                              required
                              onChange={(e) => {
                                setUniversityId(e.target.value);
                              }}
                            >
                              <option value="">Select</option>
                              {universities.map((row, index) => (
                                <option value={row._id} key={index}>
                                  {row.universityName}
                                </option>
                              ))}
                            </Form.Control> */}
                                  </div>
                                </Form.Group>
                              );
                            } else if (
                              field.name === "programId" &&
                              field.create
                            ) {
                              return (
                                <>
                                  {" "}
                                  <Form.Group
                                    style={{ width: "90%" }}
                                    key={field._id}
                                  >
                                    <Form.Label className="text-dark fw-bold pt-2">
                                      Campus
                                    </Form.Label>

                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="fa-solid fa-book-open"></i>
                                      </span>
                                      <Form.Group
                                        className="form-control"
                                        styles={{ width: "100%" }}
                                      >
                                        <Select
                                          options={campuses}
                                          value={campus}
                                          onChange={(selected) => {
                                            setCampus(selected);
                                          }}
                                        />
                                      </Form.Group>
                                      {/* <Form.Control
                              as="select"
                              value={programId}
                              required
                              onChange={(e) => {
                                setProgramId(e.target.value);
                                const startFind = programs.find(
                                  (row) => row._id === e.target.value
                                );

                                setStartData(startFind.startData);
                              }}
                            >
                              <option value="">Select</option>
                              {programs.map((row, index) => (
                                <option value={row._id} key={index}>
                                  {row.name}-{row.subject.name}-
                                  {row.degree.name}
                                </option>
                              ))}
                            </Form.Control> */}
                                    </div>
                                  </Form.Group>
                                  <Form.Group
                                    style={{ width: "90%" }}
                                    key={field._id}
                                  >
                                    <Form.Label className="text-dark fw-bold pt-2">
                                      Degree type
                                    </Form.Label>

                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="fa-solid fa-book-open"></i>
                                      </span>
                                      <Form.Group
                                        className="form-control"
                                        styles={{ width: "100%" }}
                                      >
                                        <Select
                                          options={programTypes}
                                          value={programType}
                                          onChange={(selected) => {
                                            setProgramType(selected);
                                          }}
                                        />
                                      </Form.Group>
                                      {/* <Form.Control
                              as="select"
                              value={programId}
                              required
                              onChange={(e) => {
                                setProgramId(e.target.value);
                                const startFind = programs.find(
                                  (row) => row._id === e.target.value
                                );

                                setStartData(startFind.startData);
                              }}
                            >
                              <option value="">Select</option>
                              {programs.map((row, index) => (
                                <option value={row._id} key={index}>
                                  {row.name}-{row.subject.name}-
                                  {row.degree.name}
                                </option>
                              ))}
                            </Form.Control> */}
                                    </div>
                                  </Form.Group>
                                  <Form.Group
                                    style={{ width: "90%" }}
                                    key={field._id}
                                  >
                                    <Form.Label className="text-dark fw-bold pt-2">
                                      Program<span className="esterik">*</span>
                                    </Form.Label>

                                    <div className="input-group">
                                      <span className="input-group-text">
                                        <i className="fa-solid fa-book-open"></i>
                                      </span>
                                      <Form.Group
                                        className="form-control"
                                        styles={{ width: "100%" }}
                                      >
                                        <Select
                                          options={programs}
                                          value={programId}
                                          required
                                          onChange={(selected) => {
                                            setProgramId(selected);
                                            setStartData(selected.startData);
                                          }}
                                        />
                                      </Form.Group>
                                      {/* <Form.Control
                              as="select"
                              value={programId}
                              required
                              onChange={(e) => {
                                setProgramId(e.target.value);
                                const startFind = programs.find(
                                  (row) => row._id === e.target.value
                                );

                                setStartData(startFind.startData);
                              }}
                            >
                              <option value="">Select</option>
                              {programs.map((row, index) => (
                                <option value={row._id} key={index}>
                                  {row.name}-{row.subject.name}-
                                  {row.degree.name}
                                </option>
                              ))}
                            </Form.Control> */}
                                    </div>
                                  </Form.Group>
                                </>
                              );
                            } else if (
                              field.name === "startMonth" &&
                              field.create
                            ) {
                              return (
                                <Form.Group
                                  style={{ width: "90%" }}
                                  key={field._id}
                                >
                                  <Form.Label className="text-dark fw-bold pt-2">
                                    Session
                                  </Form.Label>

                                  <div className="input-group">
                                    <span className="input-group-text">
                                      <i className="fa-solid fa-user-clock"></i>
                                    </span>
                                    <Form.Control
                                      as="select"
                                      value={startMonth}
                                      onChange={(e) => {
                                        const selectedStartDate =
                                          e.target.value;

                                        const selectedRow = startData.find(
                                          (row) =>
                                            row.startMonth === selectedStartDate
                                        );
                                        if (selectedRow) {
                                          setStartMonth(selectedRow.startMonth);
                                          setStartYear(selectedRow.startYear);
                                        } else {
                                          setStartMonth("");
                                          setStartYear("");
                                        }
                                      }}
                                    >
                                      <option value="">Select</option>
                                      {startData.map((row, index) => (
                                        <option
                                          value={row.startMonth}
                                          key={index}
                                        >
                                          {row.startMonth} {row.startYear}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  </div>
                                </Form.Group>
                              );
                            }
                            // else if (field.name === "status" && field.create) {
                            //   return (
                            //     <Form.Group style={{ width: "90%" }} key={field._id}>
                            //       <Form.Label className="text-dark fw-bold pt-2">Lead status</Form.Label>
                            //       <Form.Control
                            //         as="select"
                            //         value={status}
                            //         onChange={(e) => {
                            //           setStatus(e.target.value);
                            //         }}
                            //       >
                            //         <option value="">Select</option>
                            //         {allStatuses.map((row, index) => (
                            //           <option value={row.name} key={index}>
                            //             {row.name}
                            //           </option>
                            //         ))}
                            //       </Form.Control>
                            //     </Form.Group>
                            //   );
                            // }

                            return null;
                          })}
                        </div>{" "}
                        {allFields3.map((row) => {
                          const field = fields.find((f) => f.name === row.key);
                          if (field && field.create === true) {
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                                key={row.key}
                              >
                                <Form.Group controlId={row.key}>
                                  <Form.Label
                                    className="label-form fw-bold text-dark pt-3"
                                    column
                                    sm={3}
                                  >
                                    {row.label}
                                  </Form.Label>

                                  {row.type === "String" && (
                                    <Form.Control
                                      type="text"
                                      value={dynamicFields[row.key] || ""}
                                      onChange={(e) => {
                                        setDynamicFields({
                                          ...dynamicFields,
                                          [row.key]: e.target.value,
                                        });
                                      }}
                                      style={{ height: "40px", width: "90%" }}
                                    />
                                  )}
                                  {row.type === "Options" && (
                                    <Form.Control
                                      as="select"
                                      className="input-form"
                                      style={{ height: "40px", width: "90%" }}
                                      value={dynamicFields[row.key] || ""}
                                      onChange={(e) => {
                                        setDynamicFields({
                                          ...dynamicFields,
                                          [row.key]: e.target.value,
                                        });
                                      }}
                                    >
                                      <option value="">Select an option</option>
                                      {row.options.map((option, index) => (
                                        <option value={option} key={index}>
                                          {option}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  )}
                                  {row.type === "Number" && (
                                    <Form.Control
                                      type="number"
                                      placeholder="Enter a number"
                                      className="input-form"
                                      style={{ height: "40px", width: "90%" }}
                                      value={dynamicFields[row.key] || ""}
                                      onChange={(e) => {
                                        setDynamicFields({
                                          ...dynamicFields,
                                          [row.key]: e.target.value,
                                        });
                                      }}
                                    />
                                  )}

                                  {row.type === "Date" && (
                                    <div
                                      key={field._id}
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        width: "100%",
                                      }}
                                    >
                                      <span className="input-group-text">
                                        <i className="fa-solid fa-calendar"></i>
                                      </span>

                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          width: "90%",
                                        }}
                                      >
                                        <Form.Control
                                          as="select"
                                          style={{ width: "20%" }}
                                          value={
                                            dynamicFields[`${row.key}Date`] ||
                                            ""
                                          }
                                          onChange={(e) => {
                                            setDynamicFields({
                                              ...dynamicFields,
                                              [`${row.key}Date`]:
                                                e.target.value,
                                            });
                                          }}
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
                                          style={{
                                            marginLeft: 20,
                                            width: "30%",
                                          }}
                                          value={
                                            dynamicFields[`${row.key}Month`] ||
                                            ""
                                          }
                                          onChange={(e) => {
                                            setDynamicFields({
                                              ...dynamicFields,
                                              [`${row.key}Month`]:
                                                e.target.value,
                                            });
                                          }}
                                        >
                                          <option value=""></option>
                                          {month.map((row, index) => (
                                            <option
                                              value={row.name}
                                              key={index}
                                            >
                                              {row.name}
                                            </option>
                                          ))}
                                        </Form.Control>
                                        <Form.Control
                                          as="select"
                                          style={{
                                            marginLeft: 20,
                                            width: "20%",
                                          }}
                                          value={
                                            dynamicFields[`${row.key}Year`] ||
                                            ""
                                          }
                                          onChange={(e) => {
                                            setDynamicFields({
                                              ...dynamicFields,
                                              [`${row.key}Year`]:
                                                e.target.value,
                                            });
                                          }}
                                        >
                                          <option value=""></option>
                                          {year.map((row, index) => (
                                            <option
                                              value={row.name}
                                              key={index}
                                            >
                                              {row.name}
                                            </option>
                                          ))}
                                        </Form.Control>
                                      </div>
                                    </div>
                                  )}

                                  {row.type === "Dropdown" && (
                                    <Form.Control
                                      as="select"
                                      className="input-form"
                                      style={{ height: "40px", width: "90%" }}
                                      value={dynamicFields[row.key] || ""}
                                      onChange={(e) => {
                                        setDynamicFields({
                                          ...dynamicFields,
                                          [row.key]: e.target.value,
                                        });
                                      }}
                                    >
                                      <option value="">Select</option>
                                      {row.options.map((option, index) => (
                                        <option value={option.name} key={index}>
                                          {option.name}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  )}
                                </Form.Group>
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </div>
                    ) : page_no === 2 ? (
                      <div className="col-md-7 box7 p-3">
                        <div className="heading-box">
                          <h4 className="fw-bold">Dynamic fields</h4>
                          {/* <Form.Group style={{ width: "90%" }}>
                    <Form.Label className="text-dark fw-bold pt-2">
                      Shift desk to
                    </Form.Label>

                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa-solid fa-user-clock"></i>
                      </span>
                      <Form.Control
                        as="select"
                        value={current_desk}
                        onChange={(e) => {
                          setCurrentDesk(e.target.value);
                        }}
                      >
                        <option value="">Select</option>
                        {members.map((row, index) => (
                          <option value={row._id} key={index}>
                            {row.username} - {row.role?.name}
                          </option>
                        ))}
                      </Form.Control>
                    </div>
                  </Form.Group> */}
                          {allFields1.map((row) => {
                            const field = fields.find(
                              (f) => f.name === row.key
                            );
                            if (field && field.create === true) {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  key={row.key}
                                >
                                  <Form.Group controlId={row.key}>
                                    <Form.Label
                                      className="label-form fw-bold text-dark pt-3"
                                      column
                                      sm={3}
                                    >
                                      {row.label}
                                    </Form.Label>

                                    {row.type === "String" && (
                                      <Form.Control
                                        type="text"
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                        style={{ height: "40px", width: "90%" }}
                                      />
                                    )}
                                    {row.type === "Options" && (
                                      <Form.Control
                                        as="select"
                                        className="input-form"
                                        style={{ height: "40px", width: "90%" }}
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                      >
                                        <option value="">
                                          Select an option
                                        </option>
                                        {row.options.map((option, index) => (
                                          <option value={option} key={index}>
                                            {option}
                                          </option>
                                        ))}
                                      </Form.Control>
                                    )}
                                    {row.type === "Number" && (
                                      <Form.Control
                                        type="number"
                                        placeholder="Enter a number"
                                        className="input-form"
                                        style={{ height: "40px", width: "90%" }}
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                      />
                                    )}

                                    {row.type === "Date" && (
                                      <div
                                        key={field._id}
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          justifyContent: "space-between",
                                          width: "100%",
                                        }}
                                      >
                                        <span className="input-group-text">
                                          <i className="fa-solid fa-calendar"></i>
                                        </span>

                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            width: "90%",
                                          }}
                                        >
                                          <Form.Control
                                            as="select"
                                            style={{ width: "20%" }}
                                            value={
                                              dynamicFields[`${row.key}Date`] ||
                                              ""
                                            }
                                            onChange={(e) => {
                                              setDynamicFields({
                                                ...dynamicFields,
                                                [`${row.key}Date`]:
                                                  e.target.value,
                                              });
                                            }}
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
                                            style={{
                                              marginLeft: 20,
                                              width: "30%",
                                            }}
                                            value={
                                              dynamicFields[
                                                `${row.key}Month`
                                              ] || ""
                                            }
                                            onChange={(e) => {
                                              setDynamicFields({
                                                ...dynamicFields,
                                                [`${row.key}Month`]:
                                                  e.target.value,
                                              });
                                            }}
                                          >
                                            <option value=""></option>
                                            {month.map((row, index) => (
                                              <option
                                                value={row.name}
                                                key={index}
                                              >
                                                {row.name}
                                              </option>
                                            ))}
                                          </Form.Control>
                                          <Form.Control
                                            as="select"
                                            style={{
                                              marginLeft: 20,
                                              width: "20%",
                                            }}
                                            value={
                                              dynamicFields[`${row.key}Year`] ||
                                              ""
                                            }
                                            onChange={(e) => {
                                              setDynamicFields({
                                                ...dynamicFields,
                                                [`${row.key}Year`]:
                                                  e.target.value,
                                              });
                                            }}
                                          >
                                            <option value=""></option>
                                            {year.map((row, index) => (
                                              <option
                                                value={row.name}
                                                key={index}
                                              >
                                                {row.name}
                                              </option>
                                            ))}
                                          </Form.Control>
                                        </div>
                                      </div>
                                    )}

                                    {row.type === "Dropdown" && (
                                      <Form.Control
                                        as="select"
                                        className="input-form"
                                        style={{ height: "40px", width: "90%" }}
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                      >
                                        <option value="">Select</option>
                                        {row.options.map((option, index) => (
                                          <option
                                            value={option.name}
                                            key={index}
                                          >
                                            {option.name}
                                          </option>
                                        ))}
                                      </Form.Control>
                                    )}
                                  </Form.Group>
                                </div>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </div>
                      </div>
                    ) : page_no === 4 ? (
                      <div className="col-md-7 box7 p-3">
                        <div className="heading-box">
                          <h3 className="fw-bold">Admission officer</h3>
                          {allFields4.map((row) => {
                            const field = fields.find(
                              (f) => f.name === row.key
                            );
                            if (field && field.create === true) {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  key={row.key}
                                >
                                  <Form.Group controlId={row.key}>
                                    <Form.Label
                                      className="label-form fw-bold text-dark pt-3"
                                      column
                                      sm={3}
                                    >
                                      {row.label}
                                    </Form.Label>

                                    {row.type === "String" && (
                                      <Form.Control
                                        type="text"
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                        style={{ height: "40px", width: "90%" }}
                                      />
                                    )}
                                    {row.type === "Options" && (
                                      <Form.Control
                                        as="select"
                                        className="input-form"
                                        style={{ height: "40px", width: "90%" }}
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                      >
                                        <option value="">
                                          Select an option
                                        </option>
                                        {row.options.map((option, index) => (
                                          <option value={option} key={index}>
                                            {option}
                                          </option>
                                        ))}
                                      </Form.Control>
                                    )}
                                    {row.type === "Number" && (
                                      <Form.Control
                                        type="number"
                                        placeholder="Enter a number"
                                        className="input-form"
                                        style={{ height: "40px", width: "90%" }}
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                      />
                                    )}

                                    {row.type === "Date" && (
                                      <div
                                        key={field._id}
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          justifyContent: "space-between",
                                          width: "100%",
                                        }}
                                      >
                                        <span className="input-group-text">
                                          <i className="fa-solid fa-calendar"></i>
                                        </span>

                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            width: "90%",
                                          }}
                                        >
                                          <Form.Control
                                            as="select"
                                            style={{ width: "20%" }}
                                            value={
                                              dynamicFields[`${row.key}Date`] ||
                                              ""
                                            }
                                            onChange={(e) => {
                                              setDynamicFields({
                                                ...dynamicFields,
                                                [`${row.key}Date`]:
                                                  e.target.value,
                                              });
                                            }}
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
                                            style={{
                                              marginLeft: 20,
                                              width: "30%",
                                            }}
                                            value={
                                              dynamicFields[
                                                `${row.key}Month`
                                              ] || ""
                                            }
                                            onChange={(e) => {
                                              setDynamicFields({
                                                ...dynamicFields,
                                                [`${row.key}Month`]:
                                                  e.target.value,
                                              });
                                            }}
                                          >
                                            <option value=""></option>
                                            {month.map((row, index) => (
                                              <option
                                                value={row.name}
                                                key={index}
                                              >
                                                {row.name}
                                              </option>
                                            ))}
                                          </Form.Control>
                                          <Form.Control
                                            as="select"
                                            style={{
                                              marginLeft: 20,
                                              width: "20%",
                                            }}
                                            value={
                                              dynamicFields[`${row.key}Year`] ||
                                              ""
                                            }
                                            onChange={(e) => {
                                              setDynamicFields({
                                                ...dynamicFields,
                                                [`${row.key}Year`]:
                                                  e.target.value,
                                              });
                                            }}
                                          >
                                            <option value=""></option>
                                            {year.map((row, index) => (
                                              <option
                                                value={row.name}
                                                key={index}
                                              >
                                                {row.name}
                                              </option>
                                            ))}
                                          </Form.Control>
                                        </div>
                                      </div>
                                    )}

                                    {row.type === "Dropdown" && (
                                      <Form.Control
                                        as="select"
                                        className="input-form"
                                        style={{ height: "40px", width: "90%" }}
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                      >
                                        <option value="">Select</option>
                                        {row.options.map((option, index) => (
                                          <option
                                            value={option.name}
                                            key={index}
                                          >
                                            {option.name}
                                          </option>
                                        ))}
                                      </Form.Control>
                                    )}
                                  </Form.Group>
                                </div>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </div>
                      </div>
                    ) : page_no === 9 ? (
                      <div className="col-md-7 box7 p-3">
                        <div className="heading-box">
                          <h3 className="fw-bold">CAS</h3>
                          {allFields9.map((row) => {
                            const field = fields.find(
                              (f) => f.name === row.key
                            );
                            if (field && field.create === true) {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  key={row.key}
                                >
                                  <Form.Group controlId={row.key}>
                                    <Form.Label
                                      className="label-form fw-bold text-dark pt-3"
                                      column
                                      sm={3}
                                    >
                                      {row.label}
                                    </Form.Label>

                                    {row.type === "String" && (
                                      <Form.Control
                                        type="text"
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                        style={{ height: "40px", width: "90%" }}
                                      />
                                    )}
                                    {row.type === "Options" && (
                                      <Form.Control
                                        as="select"
                                        className="input-form"
                                        style={{ height: "40px", width: "90%" }}
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                      >
                                        <option value="">
                                          Select an option
                                        </option>
                                        {row.options.map((option, index) => (
                                          <option value={option} key={index}>
                                            {option}
                                          </option>
                                        ))}
                                      </Form.Control>
                                    )}
                                    {row.type === "Number" && (
                                      <Form.Control
                                        type="number"
                                        placeholder="Enter a number"
                                        className="input-form"
                                        style={{ height: "40px", width: "90%" }}
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                      />
                                    )}

                                    {row.type === "Date" && (
                                      <div
                                        key={field._id}
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          justifyContent: "space-between",
                                          width: "100%",
                                        }}
                                      >
                                        <span className="input-group-text">
                                          <i className="fa-solid fa-calendar"></i>
                                        </span>

                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            width: "90%",
                                          }}
                                        >
                                          <Form.Control
                                            as="select"
                                            style={{ width: "20%" }}
                                            value={
                                              dynamicFields[`${row.key}Date`] ||
                                              ""
                                            }
                                            onChange={(e) => {
                                              setDynamicFields({
                                                ...dynamicFields,
                                                [`${row.key}Date`]:
                                                  e.target.value,
                                              });
                                            }}
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
                                            style={{
                                              marginLeft: 20,
                                              width: "30%",
                                            }}
                                            value={
                                              dynamicFields[
                                                `${row.key}Month`
                                              ] || ""
                                            }
                                            onChange={(e) => {
                                              setDynamicFields({
                                                ...dynamicFields,
                                                [`${row.key}Month`]:
                                                  e.target.value,
                                              });
                                            }}
                                          >
                                            <option value=""></option>
                                            {month.map((row, index) => (
                                              <option
                                                value={row.name}
                                                key={index}
                                              >
                                                {row.name}
                                              </option>
                                            ))}
                                          </Form.Control>
                                          <Form.Control
                                            as="select"
                                            style={{
                                              marginLeft: 20,
                                              width: "20%",
                                            }}
                                            value={
                                              dynamicFields[`${row.key}Year`] ||
                                              ""
                                            }
                                            onChange={(e) => {
                                              setDynamicFields({
                                                ...dynamicFields,
                                                [`${row.key}Year`]:
                                                  e.target.value,
                                              });
                                            }}
                                          >
                                            <option value=""></option>
                                            {year.map((row, index) => (
                                              <option
                                                value={row.name}
                                                key={index}
                                              >
                                                {row.name}
                                              </option>
                                            ))}
                                          </Form.Control>
                                        </div>
                                      </div>
                                    )}

                                    {row.type === "Dropdown" && (
                                      <Form.Control
                                        as="select"
                                        className="input-form"
                                        style={{ height: "40px", width: "90%" }}
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                      >
                                        <option value="">Select</option>
                                        {row.options.map((option, index) => (
                                          <option
                                            value={option.name}
                                            key={index}
                                          >
                                            {option.name}
                                          </option>
                                        ))}
                                      </Form.Control>
                                    )}
                                  </Form.Group>
                                </div>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </div>
                      </div>
                    ) : page_no === 5 ? (
                      <div className="col-md-7 box7 p-3">
                        <div className="heading-box">
                          <h3 className="fw-bold">Visa officer</h3>
                          {allFields5.map((row) => {
                            const field = fields.find(
                              (f) => f.name === row.key
                            );
                            if (field && field.create === true) {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  key={row.key}
                                >
                                  <Form.Group controlId={row.key}>
                                    <Form.Label
                                      className="label-form fw-bold text-dark pt-3"
                                      column
                                      sm={3}
                                    >
                                      {row.label}
                                    </Form.Label>

                                    {row.type === "String" && (
                                      <Form.Control
                                        type="text"
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                        style={{ height: "40px", width: "90%" }}
                                      />
                                    )}
                                    {row.type === "Options" && (
                                      <Form.Control
                                        as="select"
                                        className="input-form"
                                        style={{ height: "40px", width: "90%" }}
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                      >
                                        <option value="">
                                          Select an option
                                        </option>
                                        {row.options.map((option, index) => (
                                          <option value={option} key={index}>
                                            {option}
                                          </option>
                                        ))}
                                      </Form.Control>
                                    )}
                                    {row.type === "Number" && (
                                      <Form.Control
                                        type="number"
                                        placeholder="Enter a number"
                                        className="input-form"
                                        style={{ height: "40px", width: "90%" }}
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                      />
                                    )}

                                    {row.type === "Date" && (
                                      <div
                                        key={field._id}
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          justifyContent: "space-between",
                                          width: "100%",
                                        }}
                                      >
                                        <span className="input-group-text">
                                          <i className="fa-solid fa-calendar"></i>
                                        </span>

                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            width: "90%",
                                          }}
                                        >
                                          <Form.Control
                                            as="select"
                                            style={{ width: "20%" }}
                                            value={
                                              dynamicFields[`${row.key}Date`] ||
                                              ""
                                            }
                                            onChange={(e) => {
                                              setDynamicFields({
                                                ...dynamicFields,
                                                [`${row.key}Date`]:
                                                  e.target.value,
                                              });
                                            }}
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
                                            style={{
                                              marginLeft: 20,
                                              width: "30%",
                                            }}
                                            value={
                                              dynamicFields[
                                                `${row.key}Month`
                                              ] || ""
                                            }
                                            onChange={(e) => {
                                              setDynamicFields({
                                                ...dynamicFields,
                                                [`${row.key}Month`]:
                                                  e.target.value,
                                              });
                                            }}
                                          >
                                            <option value=""></option>
                                            {month.map((row, index) => (
                                              <option
                                                value={row.name}
                                                key={index}
                                              >
                                                {row.name}
                                              </option>
                                            ))}
                                          </Form.Control>
                                          <Form.Control
                                            as="select"
                                            style={{
                                              marginLeft: 20,
                                              width: "20%",
                                            }}
                                            value={
                                              dynamicFields[`${row.key}Year`] ||
                                              ""
                                            }
                                            onChange={(e) => {
                                              setDynamicFields({
                                                ...dynamicFields,
                                                [`${row.key}Year`]:
                                                  e.target.value,
                                              });
                                            }}
                                          >
                                            <option value=""></option>
                                            {year.map((row, index) => (
                                              <option
                                                value={row.name}
                                                key={index}
                                              >
                                                {row.name}
                                              </option>
                                            ))}
                                          </Form.Control>
                                        </div>
                                      </div>
                                    )}

                                    {row.type === "Dropdown" && (
                                      <Form.Control
                                        as="select"
                                        className="input-form"
                                        style={{ height: "40px", width: "90%" }}
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                      >
                                        <option value="">Select</option>
                                        {row.options.map((option, index) => (
                                          <option
                                            value={option.name}
                                            key={index}
                                          >
                                            {option.name}
                                          </option>
                                        ))}
                                      </Form.Control>
                                    )}
                                  </Form.Group>
                                </div>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </div>
                      </div>
                    ) : page_no === 10 ? (
                      <div className="col-md-7 box7 p-3">
                        <div className="heading-box">
                          <h3 className="fw-bold">Status</h3>
                          {allFields10.map((row) => {
                            const field = fields.find(
                              (f) => f.name === row.key
                            );
                            if (field && field.create === true) {
                              return (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                  key={row.key}
                                >
                                  <Form.Group controlId={row.key}>
                                    <Form.Label
                                      className="label-form fw-bold text-dark pt-3"
                                      column
                                      sm={3}
                                    >
                                      {row.label}
                                    </Form.Label>

                                    {row.type === "String" && (
                                      <Form.Control
                                        type="text"
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                        style={{ height: "40px", width: "90%" }}
                                      />
                                    )}
                                    {row.type === "Options" && (
                                      <Form.Control
                                        as="select"
                                        className="input-form"
                                        style={{ height: "40px", width: "90%" }}
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                      >
                                        <option value="">
                                          Select an option
                                        </option>
                                        {row.options.map((option, index) => (
                                          <option value={option} key={index}>
                                            {option}
                                          </option>
                                        ))}
                                      </Form.Control>
                                    )}
                                    {row.type === "Number" && (
                                      <Form.Control
                                        type="number"
                                        placeholder="Enter a number"
                                        className="input-form"
                                        style={{ height: "40px", width: "90%" }}
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                      />
                                    )}

                                    {row.type === "Date" && (
                                      <div
                                        key={field._id}
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          justifyContent: "space-between",
                                          width: "100%",
                                        }}
                                      >
                                        <span className="input-group-text">
                                          <i className="fa-solid fa-calendar"></i>
                                        </span>

                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            width: "90%",
                                          }}
                                        >
                                          <Form.Control
                                            as="select"
                                            style={{ width: "20%" }}
                                            value={
                                              dynamicFields[`${row.key}Date`] ||
                                              ""
                                            }
                                            onChange={(e) => {
                                              setDynamicFields({
                                                ...dynamicFields,
                                                [`${row.key}Date`]:
                                                  e.target.value,
                                              });
                                            }}
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
                                            style={{
                                              marginLeft: 20,
                                              width: "30%",
                                            }}
                                            value={
                                              dynamicFields[
                                                `${row.key}Month`
                                              ] || ""
                                            }
                                            onChange={(e) => {
                                              setDynamicFields({
                                                ...dynamicFields,
                                                [`${row.key}Month`]:
                                                  e.target.value,
                                              });
                                            }}
                                          >
                                            <option value=""></option>
                                            {month.map((row, index) => (
                                              <option
                                                value={row.name}
                                                key={index}
                                              >
                                                {row.name}
                                              </option>
                                            ))}
                                          </Form.Control>
                                          <Form.Control
                                            as="select"
                                            style={{
                                              marginLeft: 20,
                                              width: "20%",
                                            }}
                                            value={
                                              dynamicFields[`${row.key}Year`] ||
                                              ""
                                            }
                                            onChange={(e) => {
                                              setDynamicFields({
                                                ...dynamicFields,
                                                [`${row.key}Year`]:
                                                  e.target.value,
                                              });
                                            }}
                                          >
                                            <option value=""></option>
                                            {year.map((row, index) => (
                                              <option
                                                value={row.name}
                                                key={index}
                                              >
                                                {row.name}
                                              </option>
                                            ))}
                                          </Form.Control>
                                        </div>
                                      </div>
                                    )}

                                    {row.type === "Dropdown" && (
                                      <Form.Control
                                        as="select"
                                        className="input-form"
                                        style={{ height: "40px", width: "90%" }}
                                        value={dynamicFields[row.key] || ""}
                                        onChange={(e) => {
                                          setDynamicFields({
                                            ...dynamicFields,
                                            [row.key]: e.target.value,
                                          });
                                        }}
                                      >
                                        <option value="">Select</option>
                                        {row.options.map((option, index) => (
                                          <option
                                            value={option.name}
                                            key={index}
                                          >
                                            {option.name}
                                          </option>
                                        ))}
                                      </Form.Control>
                                    )}
                                  </Form.Group>
                                </div>
                              );
                            } else {
                              return null;
                            }
                          })}
                        </div>
                        {notesPermission && notesPermission.create ? (
                          <>
                            <Form.Group style={{ width: "90%" }}>
                              <Form.Label className="fw-bold mt-2">
                                Remarks
                              </Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Write remarks"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                              />
                            </Form.Group>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      ""
                    )}

                    {page_no === 0 ? (
                      <div className="col-md-5 ps-3 help-box-9">
                        <div className="help-box ms-4">
                          <div className="container">
                            <div className="row">
                              <div className="col-md-12">
                                <img
                                  src={helpicon}
                                  alt=""
                                  className="img-fluid"
                                ></img>
                                <div className="p-3 mt-3">
                                  <ul>
                                    <li>
                                      {" "}
                                      <h6>
                                        As a counselor you can fill our
                                        applicant{"'"}s base detail
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Allocate the application to your desk in
                                        case you wish to work further on this
                                        application.{" "}
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Shift desk once you wish to move
                                        application.
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Upload documents or skip the step.{" "}
                                      </h6>
                                    </li>
                                  </ul>
                                  {/* <h4>
                            This section allows you to create manual
                            applications and input students' personal, academic,
                            and other essential details. Use this area to enter
                            information related to students, including their
                            personal data, academic records, and additional
                            pertinent details necessary for the application
                            process
                          </h4> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : page_no === 9 ? (
                      <div className="col-md-5 ps-3 help-box-9">
                        <div className="help-box ms-4">
                          <div className="container">
                            <div className="row">
                              <div className="col-md-12">
                                <img
                                  src={helpicon}
                                  alt=""
                                  className="img-fluid"
                                ></img>
                                <div className="p-3 mt-3">
                                  <ul>
                                    <li>
                                      {" "}
                                      <h6>
                                        As a counselor you can fill our
                                        applicant{"'"}s base detail
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Allocate the application to your desk in
                                        case you wish to work further on this
                                        application.{" "}
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Shift desk once you wish to move
                                        application.
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Upload documents or skip the step.{" "}
                                      </h6>
                                    </li>
                                  </ul>
                                  {/* <h4>
                            This section allows you to create manual
                            applications and input students' personal, academic,
                            and other essential details. Use this area to enter
                            information related to students, including their
                            personal data, academic records, and additional
                            pertinent details necessary for the application
                            process
                          </h4> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : page_no === 6 ? (
                      <div className="col-md-5 ps-3 help-box-9">
                        <div className="help-box ms-4">
                          <div className="container">
                            <div className="row">
                              <div className="col-md-12">
                                <img
                                  src={helpicon}
                                  alt=""
                                  className="img-fluid"
                                ></img>
                                <div className="p-3 mt-3">
                                  <ul>
                                    <li>
                                      {" "}
                                      <h6>
                                        As a counselor you can fill our
                                        applicant{"'"}s base detail
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Allocate the application to your desk in
                                        case you wish to work further on this
                                        application.{" "}
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Shift desk once you wish to move
                                        application.
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Upload documents or skip the step.{" "}
                                      </h6>
                                    </li>
                                  </ul>
                                  {/* <h4>
                            This section allows you to create manual
                            applications and input students' personal, academic,
                            and other essential details. Use this area to enter
                            information related to students, including their
                            personal data, academic records, and additional
                            pertinent details necessary for the application
                            process
                          </h4> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : page_no === 3 ? (
                      <div className="col-md-5 ps-3 help-box-9">
                        <div className="help-box ms-4">
                          <div className="container">
                            <div className="row">
                              <div className="col-md-12">
                                <img
                                  src={helpicon}
                                  alt=""
                                  className="img-fluid"
                                ></img>
                                <div className="p-3 mt-3">
                                  <ul>
                                    <li>
                                      {" "}
                                      <h6>
                                        As a counselor you can fill our
                                        applicant{"'"}s base detail
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Allocate the application to your desk in
                                        case you wish to work further on this
                                        application.{" "}
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Shift desk once you wish to move
                                        application.
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Upload documents or skip the step.{" "}
                                      </h6>
                                    </li>
                                  </ul>
                                  {/* <h4>
                            This section allows you to create manual
                            applications and input students' personal, academic,
                            and other essential details. Use this area to enter
                            information related to students, including their
                            personal data, academic records, and additional
                            pertinent details necessary for the application
                            process
                          </h4> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : page_no === 4 ? (
                      <div className="col-md-5 ps-3 help-box-9">
                        <div className="help-box ms-4">
                          <div className="container">
                            <div className="row">
                              <div className="col-md-12">
                                <img
                                  src={helpicon}
                                  alt=""
                                  className="img-fluid"
                                ></img>
                                <div className="p-3 mt-3">
                                  <ul>
                                    <li>
                                      {" "}
                                      <h6>
                                        As an admission officer, you can view
                                        the applicant{"’"}s basic details.
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Fill out the details of your part of the
                                        application.
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Move the application to another desk
                                        when you wish to do so.
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Upload documents or skip this step.
                                      </h6>
                                    </li>
                                  </ul>
                                  {/* <h4>
                            This section allows you to create manual
                            applications and input students' personal, academic,
                            and other essential details. Use this area to enter
                            information related to students, including their
                            personal data, academic records, and additional
                            pertinent details necessary for the application
                            process
                          </h4> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : page_no === 5 ? (
                      <div className="col-md-5 ps-3 help-box-9">
                        <div className="help-box ms-4">
                          <div className="container">
                            <div className="row">
                              <div className="col-md-12">
                                <img
                                  src={helpicon}
                                  alt=""
                                  className="img-fluid"
                                ></img>
                                <div className="p-3 mt-3">
                                  <ul>
                                    <li>
                                      {" "}
                                      <h6>
                                        If you are a visa officer, you can view
                                        the applicant{"’"}s basic details.
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Fill out the details of your part of the
                                        application.
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Move the application to another desk
                                        when you wish to do so.
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Upload documents or skip this step.
                                      </h6>
                                    </li>
                                  </ul>
                                  {/* <h4>
                            This section allows you to create manual
                            applications and input students' personal, academic,
                            and other essential details. Use this area to enter
                            information related to students, including their
                            personal data, academic records, and additional
                            pertinent details necessary for the application
                            process
                          </h4> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : page_no === 7 ? (
                      <div className="col-md-5 ps-3 help-box-9">
                        <div className="help-box ms-4">
                          <div className="container">
                            <div className="row">
                              <div className="col-md-12">
                                <img
                                  src={helpicon}
                                  alt=""
                                  className="img-fluid"
                                ></img>
                                <div className="p-3 mt-3">
                                  {" "}
                                  <ul>
                                    <li>
                                      {" "}
                                      <h6>
                                        As a counselor you can fill our
                                        applicant{"'"}s base detail
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Allocate the application to your desk in
                                        case you wish to work further on this
                                        application.{" "}
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Shift desk once you wish to move
                                        application.
                                      </h6>
                                    </li>
                                    <li>
                                      <h6>
                                        Upload documents or skip the step.{" "}
                                      </h6>
                                    </li>
                                  </ul>
                                  {/* <h4>
                            This section allows you to create manual
                            applications and input students' personal, academic,
                            and other essential details. Use this area to enter
                            information related to students, including their
                            personal data, academic records, and additional
                            pertinent details necessary for the application
                            process
                          </h4> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* {loading ? (
          <CircularProgress />


        ) : (

          )} */}
                  {/* {fields.map((field) => {
                  if (field.name === "firstname" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Firstname"
                          value={firstname}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </Form.Group>
                    );
                  } else if (field.name === "lastname" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Lastname"
                          value={lastname}
                          onChange={(e) => setlastname(e.target.value)}
                        />
                      </Form.Group>
                    );
                  } else if (field.name === "gender" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                          as="select"
                          value={gender}
                          onChange={(e) => {
                            setgender(e.target.value);
                          }}
                        >
                          <option value="">Select gender</option>
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                        </Form.Control>
                      </Form.Group>
                    );
                  } else if (field.name === "email" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>
                    );
                  } else if (field.name === "phoneNo" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>Phone No.</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Phone No."
                          value={phoneNo}
                          onChange={(e) => setphoneNo(e.target.value)}
                        />
                      </Form.Group>
                    );
                  } else if (field.name === "dateOfBirth" && field.create) {
                    return (
                      <div key={field._id}>
                        <Form.Group>
                          <Form.Label className="label-form text-dark fw-bold pt-2">
                            Date of birth
                          </Form.Label>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <Form.Control
                              as="select"
                              style={{ marginLeft: 20, width: 80 }}
                              value={dateOfBirth}
                              onChange={(e) => {
                                setdateOfBirth(e.target.value);
                              }}
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
                              value={monthOfBirth}
                              onChange={(e) => {
                                setMonthOfBirth(e.target.value);
                              }}
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
                              value={yearOfBirth}
                              onChange={(e) => {
                                setyearOfBirth(e.target.value);
                              }}
                            >
                              <option value=""></option>
                              {year.map((row, index) => (
                                <option value={row.name} key={index}>
                                  {row.name}
                                </option>
                              ))}
                            </Form.Control>
                          </div>
                        </Form.Group>
                      </div>
                    );
                  } else if (field.name === "nic" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>NIC</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="NIC"
                          value={nic}
                          onChange={(e) => setNic(e.target.value)}
                        />
                      </Form.Group>
                    );
                  } else if (field.name === "passport" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>Passport</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Passport"
                          value={passport}
                          onChange={(e) => setPassport(e.target.value)}
                        />
                      </Form.Group>
                    );
                  } else if (field.name === "nationality" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>Nationality</Form.Label>
                        <Form.Control
                          as="select"
                          value={nationality}
                          onChange={(e) => {
                            setNationality(e.target.value);
                          }}
                        >
                          <option value="">Select country</option>
                          {allCountries.map((row, index) => (
                            <option value={row.name} key={index}>
                              {row.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    );
                  } else if (field.name === "countryLivingIn" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label> Currently living in</Form.Label>
                        <Form.Control
                          as="select"
                          value={countryLivingIn}
                          onChange={(e) => {
                            setcountryLivingIn(e.target.value);
                          }}
                        >
                          <option value="">Select country</option>
                          {allCountries.map((row, index) => (
                            <option value={row.name} key={index}>
                              {row.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    );
                  } else if (field.name === "address" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Address"
                          value={address}
                          onChange={(e) => setaddress(e.target.value)}
                        />
                      </Form.Group>
                    );
                  } else if (field.name === "postalCode" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Postal Code"
                          value={postalCode}
                          onChange={(e) => setpostalCode(e.target.value)}
                        />
                      </Form.Group>
                    );
                  } else if (field.name === "province" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>Province</Form.Label>
                        <Form.Control
                          as="select"
                          value={province}
                          onChange={(e) => {
                            setprovince(e.target.value);
                          }}
                        >
                          <option value="">Select province</option>
                          {allProvinces.map((row, index) => (
                            <option value={row.name} key={index}>
                              {row.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    );
                  } else if (field.name === "city" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          as="select"
                          value={city}
                          onChange={(e) => {
                            setcity(e.target.value);
                          }}
                        >
                          <option value="">Select city</option>
                          {allCities.map((row, index) => (
                            <option value={row.name} key={index}>
                              {row.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    );
                  } else if (field.name === "region" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>Region</Form.Label>
                        <Form.Control
                          as="select"
                          value={region}
                          onChange={(e) => {
                            setregion(e.target.value);
                          }}
                        >
                          <option value="">Select</option>
                          {allRegions.map((row, index) => (
                            <option value={row.name} key={index}>
                              {row.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    );
                    } else if (
                      field.name === "lastEducationCountry" &&
                      field.create
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label> Last education country</Form.Label>
                          <Form.Control
                            as="select"
                            value={lastEducationCountry}
                            onChange={(e) => {
                              setlastEducationCountry(e.target.value);
                            }}
                          >
                            <option value="">Select country</option>
                            {allCountries.map((row, index) => (
                              <option value={row.name} key={index}>
                                {row.name}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      );
                    } else if (
                      field.name === "lastQualification" &&
                      field.create
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label>Last qualifications</Form.Label>
                          <Form.Control
                            as="select"
                            value={lastQualification}
                            onChange={(e) => {
                              setlastQualification(e.target.value);
                            }}
                          >
                            <option value="">Select</option>
                            {qualifications.map((row, index) => (
                              <option value={row.name} key={index}>
                                {row.name}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      );
                    } else if (field.name === "lastInstitution" && field.create) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label>Last institution</Form.Label>
                          <Form.Control
                            as="select"
                            value={lastInstitution}
                            onChange={(e) => {
                              setlastInstitution(e.target.value);
                            }}
                          >
                            <option value="">Select</option>
                            {allInstitutions.map((row, index) => (
                              <option value={row.name} key={index}>
                                {row.name}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      );
                    } else if (field.name === "universityId" && field.create) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label>University</Form.Label>
                          <Form.Control
                            as="select"
                            value={universityId}
                            onChange={(e) => {
                              setUniversityId(e.target.value);
                            }}
                          >
                            <option value="">Select</option>
                            {universities.map((row, index) => (
                              <option value={row._id} key={index}>
                                {row.universityName}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      );
                    } else if (field.name === "programId" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>Program</Form.Label>
                        <Form.Control
                          as="select"
                          value={programId}
                          onChange={(e) => {
                            setProgramId(e.target.value);
                            const startFind = programs.find(
                              (row) => row._id === e.target.value
                            );

                            setStartData(startFind.startData);
                          }}
                        >
                          <option value="">Select</option>
                          {programs.map((row, index) => (
                            <option value={row._id} key={index}>
                              {row.name}-{row.subject.name}-{row.degree.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    );
                  } else if (field.name === "startMonth" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>Start Month & Year</Form.Label>
                        <Form.Control
                          as="select"
                          value={startMonth}
                          onChange={(e) => {
                            const selectedStartDate = e.target.value;

                            const selectedRow = startData.find(
                              (row) => row.startMonth === selectedStartDate
                            );
                            if (selectedRow) {
                              setStartMonth(selectedRow.startMonth);
                              setStartYear(selectedRow.startYear);
                            } else {
                              setStartMonth("");
                              setStartYear("");
                            }
                          }}
                        >
                          <option value="">Select</option>
                          {startData.map((row, index) => (
                            <option value={row.startMonth} key={index}>
                              {row.startMonth} {row.startYear}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    );
                  } else if (field.name === "englishTest" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>English test</Form.Label>
                        <Form.Control
                          as="select"
                          value={englishTest}
                          onChange={(e) => {
                            setenglishTest(e.target.value);
                          }}
                        >
                          <option value="">Select</option>
                          {allTests.map((row, index) => (
                            <option value={row.name} key={index}>
                              {row.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    );
                  } else if (field.name === "CGPA" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>CGPA</Form.Label>
                        <Form.Control
                          type="text"
                          value={CGPA}
                          onChange={(e) => {
                            setCGPA(e.target.value);
                          }}
                        />
                      </Form.Group>
                    );
                  } else if (field.name === "score" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>Score</Form.Label>
                        <Form.Control
                          type="text"
                          value={score}
                          onChange={(e) => {
                            setScore(e.target.value);
                          }}
                        />
                      </Form.Group>
                    );
                  } else if (field.name === "status" && field.create) {
                    return (
                      <Form.Group style={{ width: "90%" }} key={field._id}>
                        <Form.Label>Lead status</Form.Label>
                        <Form.Control
                          as="select"
                          value={status}
                          onChange={(e) => {
                            setStatus(e.target.value);
                          }}
                        >
                          <option value="">Select</option>
                          {allStatuses.map((row, index) => (
                            <option value={row.name} key={index}>
                              {row.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    );
                  }
                  return null;
                })}






                {allFields.map((row) => {
                  const field = fields.find((f) => f.name === row.key);
                  if (field && field.create === true) {
                    return (
                      <div
                        style={{ display: "flex", flexDirection: "column" }}
                        key={row.key}
                      >
                        <Form.Group controlId={row.key}>
                          <Form.Label className="label-form" column sm={3}>
                            {row.label}
                          </Form.Label>

                          {row.type === "String" && (
                            <Form.Control
                              type="text"
                              className="input-form"
                              value={dynamicFields[row.key] || ""}
                              onChange={(e) => {
                                setDynamicFields({
                                  ...dynamicFields,
                                  [row.key]: e.target.value,
                                });
                              }}
                              style={{ width: "90%" }}
                            />
                          )}
                          {row.type === "Options" && (
                            <Form.Control
                              as="select"
                              className="input-form"
                              style={{ height: "40px", width: "90%" }}
                              value={dynamicFields[row.key] || ""}
                              onChange={(e) => {
                                setDynamicFields({
                                  ...dynamicFields,
                                  [row.key]: e.target.value,
                                });
                              }}
                            >
                              <option value="">Select an option</option>
                              {row.options.map((option, index) => (
                                <option value={option} key={index}>
                                  {option}
                                </option>
                              ))}
                            </Form.Control>
                          )}
                          {row.type === "Number" && (
                            <Form.Control
                              type="number"
                              placeholder="Enter a number"
                              className="input-form"
                              style={{ height: "40px", width: "90%" }}
                              value={dynamicFields[row.key] || ""}
                              onChange={(e) => {
                                setDynamicFields({
                                  ...dynamicFields,
                                  [row.key]: e.target.value,
                                });
                              }}
                            />
                          )}

                          {row.type === "Date" && (
                            <div key={field._id}>
                              <Form.Group>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  <Form.Control
                                    as="select"
                                    style={{ marginLeft: 20, width: 80 }}
                                    value={
                                      dynamicFields[`${row.key}Date`] || ""
                                    }
                                    onChange={(e) => {
                                      setDynamicFields({
                                        ...dynamicFields,
                                        [`${row.key}Date`]: e.target.value,
                                      });
                                    }}
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
                                    value={
                                      dynamicFields[`${row.key}Month`] || ""
                                    }
                                    onChange={(e) => {
                                      setDynamicFields({
                                        ...dynamicFields,
                                        [`${row.key}Month`]: e.target.value,
                                      });
                                    }}
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
                                    value={
                                      dynamicFields[`${row.key}Year`] || ""
                                    }
                                    onChange={(e) => {
                                      setDynamicFields({
                                        ...dynamicFields,
                                        [`${row.key}Year`]: e.target.value,
                                      });
                                    }}
                                  >
                                    <option value=""></option>
                                    {year.map((row, index) => (
                                      <option value={row.name} key={index}>
                                        {row.name}
                                      </option>
                                    ))}
                                  </Form.Control>
                                </div>
                              </Form.Group>
                            </div>
                          )}

                          {row.type === "Dropdown" && (
                            <Form.Control
                              as="select"
                              className="input-form"
                              style={{ height: "40px", width: "90%" }}
                              value={dynamicFields[row.key] || ""}
                              onChange={(e) => {
                                setDynamicFields({
                                  ...dynamicFields,
                                  [row.key]: e.target.value,
                                });
                              }}
                            >
                              <option value="">Select</option>
                              {row.options.map((option, index) => (
                                <option value={option.name} key={index}>
                                  {option.name}
                                </option>
                              ))}
                            </Form.Control>
                          )}
                        </Form.Group>
                      </div>
                    );
                    } else {
                      return null;
                    }
                  })} */}{" "}
                </div>
                {role !== "sub-agent" ? (
                  <div className="row ps-3">
                    <Form.Group style={{ width: "50%" }}>
                      <Form.Label className="text-dark fw-bold pt-2">
                        Allocate the desk to either yourself or shift to another
                        person
                      </Form.Label>

                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fa-solid fa-user-clock"></i>
                        </span>
                        <Form.Control
                          as="select"
                          style={{ height: "40px" }}
                          value={current_desk}
                          onChange={(e) => {
                            setCurrentDesk(e.target.value);
                          }}
                        >
                          <option value="">Select</option>
                          {members.map((row, index) => (
                            <option value={row._id} key={index}>
                              {row.username} - {row.role?.name}
                            </option>
                          ))}
                        </Form.Control>
                      </div>
                    </Form.Group>
                  </div>
                ) : (
                  ""
                )}
              </div>{" "}
              <Button
                variant="btn btn-primary green_bg_logo"
                type="submit"
                className="px-5 py-2"
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewApplication;
