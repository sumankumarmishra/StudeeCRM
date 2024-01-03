import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Button, Form, Modal } from "react-bootstrap";
import "./appfleid.css";
import EmailModel from "../MyCases/EmailModel";
import SMSModal from "../MyCases/SMSModal";
import Logs from "./Logs";
import Desks from "./Desks";
import DocumentModel from "../MyCases/DocumentModel";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import SureModal from "../../components/SureModel/SureModal";

const UpdateApplication = ({ title }) => {
  const { id, studentId } = useParams();
  const location = useLocation();
  const memberId = localStorage.getItem("id");
  const application = location.state.application;
  const [data, setData] = useState([]);
  const [application_id, setApplicationId] = useState("");
  const [offer_status, setOfferStatus] = useState("");
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpColor, setPopupColor] = useState("orange");
  const [case_owner_name, setCaseOwnerName] = useState("");
  const [allFields10, setAllFields10] = useState([]);

  const [popUpText, setPopupText] = useState("");
  const [campus, setCampus] = useState("");
  const [campuses, setCampuses] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [allFields9, setAllFields9] = useState([]);
  const [filteredCampus, setFilteredCampuses] = useState([]);
  const [programType, setProgramType] = useState("");
  const [programTypeName, setProgramTypeName] = useState("");
  const [programTypeDocuments, setProgramTypeDocuments] = useState([]);
  const [programTypes, setProgramTypes] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [universities, setUniversities] = useState([]);
  const [passport, setPassport] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [startData, setStartData] = useState([]);
  const [emailField, setEmailField] = useState(false);
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [gender, setgender] = useState("");
  const [score, setScore] = useState("");
  const [province, setprovince] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setlastname] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState(data.email);
  const [phoneNo, setphoneNo] = useState(data.phoneNo);
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [monthOfBirth, setMonthOfBirth] = useState("");
  const [yearOfBirth, setyearOfBirth] = useState("");
  const [address, setaddress] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [city, setcity] = useState("");
  const [countryLivingIn, setcountryLivingIn] = useState("");
  const [region, setregion] = useState("");
  const [allRegions, setAllRegions] = useState([]);
  const [nic, setNic] = useState("");
  const [lastEducationCountry, setlastEducationCountry] = useState("");
  const [lastQualification, setlastQualification] = useState("");
  const [qualifications, setQualifications] = useState([]);
  const [lastInstitution, setlastInstitution] = useState("");
  const [allInstitutions, setAllInstitutions] = useState([]);
  const [CGPA, setCGPA] = useState("");
  const [allStatuses, setAllStatuses] = useState([]);
  const [status, setStatus] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [allProvinces, setAllProvinces] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [programId, setProgramId] = useState("");
  const [notes, setNotes] = useState("");
  const [notesPermission, setNotesPermission] = useState({});
  const [programName, setProgramName] = useState("");
  const [allTests, setAllTests] = useState([]);
  const [englishTest, setenglishTest] = useState("");
  const [programs, setPrograms] = useState([]);
  const [allFields, setAllFields] = useState([]);
  const [allFields0, setAllFields0] = useState([]);
  const [allFields1, setAllFields1] = useState([]);
  const [allFields3, setAllFields3] = useState([]);
  const [allFields4, setAllFields4] = useState([]);
  const [allFields5, setAllFields5] = useState([]);
  const [dynamicFields, setDynamicFields] = useState([]);
  const [deleteModal, setDeletedModal] = useState(false);
  const [fields, setFields] = useState([]);
  const roleId = localStorage.getItem("roleId");
  const [documentPermission, setDocumentPermission] = useState(false);
  const [logs, setLogs] = useState([]);
  const [desks, setDesks] = useState([]);
  const [month, setMonth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState([]);
  const member = localStorage.getItem("id");
  const token = localStorage.getItem("ieodkvToken");
  const role = localStorage.getItem("role");
  const [page_no, setPageNo] = useState(0);

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
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/applications/applicationById/${id}`,
        config
      )
      .then((response) => {
        setData(response.data);
        setFirstName(response.data.firstname);
        setApplicationId(response.data.application_id);
        setlastname(response.data.lastname);
        setLogs(response.data.logs);
        setCaseOwnerName(response.data.case_owner);
        setDesks(response.data.desks);
        setPassport(response.data.passport);
        setUniversityId(response.data.universityId?._id);
        setenglishTest(response.data.englishTest);
        setOfferStatus(response.data.offer_status);
        setProgramId(response.data.programId?._id);
        setCampus(response.data.campus);
        setProgramType(response.data.programType);
        setProgramName(response.data.programId?.name);
        setgender(response.data.gender);
        setStartMonth(response.data.startMonth);
        setCGPA(response.data.CGPA);
        setStatus(response.data.status);
        setStartYear(response.data.startYear);
        setNotes(response.data.notes);
        setScore(response.data.score);
        setNationality(response.data.nationality);
        setlastEducationCountry(response.data.lastEducationCountry);
        setlastInstitution(response.data.lastInstitution);
        setlastQualification(response.data.lastQualification);
        setEmail(response.data.email);
        setphoneNo(response.data.phoneNo);
        setpostalCode(response.data.postalCode);
        setdateOfBirth(response.data.dateOfBirth);
        setMonthOfBirth(response.data.monthOfBirth);
        setyearOfBirth(response.data.yearOfBirth);
        setaddress(response.data.address);
        setprovince(response.data.province);
        setcity(response.data.city);
        setregion(response.data.region);
        setcountryLivingIn(response.data.countryLivingIn);
        setNic(response.data.nic);
        try {
          const sessionStorage = localStorage.getItem(`fields`);
          const userGet = JSON.parse(sessionStorage);
          // axios
          //   .get("https://crm.internationaleducationoffice.co.uk/fields", config)
          //   .then((response) => {
          const allFields = userGet;
          const state2 = allFields.filter((row) => row.state === 1);
          setAllFields(state2);
          const state1 = allFields.filter((row) => row.state === 1);
          setAllFields1(state1);
          const state9 = userGet.filter((row) => row.state === 9);
          setAllFields9(state9);
          const state0 = allFields.filter((row) => row.state === 0);
          setAllFields0(state0);
          const state3 = allFields.filter((row) => row.state === 3);
          setAllFields3(state3);
          const state4 = allFields.filter((row) => row.state === 4);
          setAllFields4(state4);
          const state5 = allFields.filter((row) => row.state === 5);
          setAllFields5(state5);
          const state10 = userGet.filter((row) => row.state === 10);
          setAllFields10(state10);

          if (response.data.dynamicFields) {
            const dynamicFieldsKeys = Object.keys(response.data.dynamicFields);
            const responseKeys = allFields.map((field) => field.key);
            const allKeys = [
              ...new Set([...dynamicFieldsKeys, ...responseKeys]),
            ];

            const updatedDynamicFields = allKeys.reduce((fields, key) => {
              fields[key] = response.data.dynamicFields[key] || "";
              return fields;
            }, {});

            setDynamicFields(updatedDynamicFields);
          }
          // });
          // .catch((error) => {
          //   console.log(error);
          // });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // axios
    //   .get(
    //     `https://crm.internationaleducationoffice.co.uk/roles/${roleId}`,
    //     config
    //   )
    //   .then((response) => {
    //     setFields(response.data.policy);
    //     const notesCleared = response.data?.policy.find(
    //       (row) => row.name === "notes"
    //     );

    //     setNotesPermission(notesCleared);
    //     setDocumentPermission(response.data.table?.documentField);

    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    try {
      const sessionStorage = localStorage.getItem(`role_Data${roleId}`);
      const userGet = JSON.parse(sessionStorage);
      // const userGet = response.data;
      setFields(userGet.policy);
      const notesCleared = userGet?.policy.find((row) => row.name === "notes");

      setNotesPermission(notesCleared);
      setDocumentPermission(userGet.table?.documentField);

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
        `https://crm.internationaleducationoffice.co.uk/members/member1/${memberId}`,
        config
      )
      .then((response) => {
        setEmailField(response.data?.role?.table.emailField);
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
            documents_list: row.documents_list,
            label: `${row.name} - ${row.graduate}`,
            name: row.name,
          };
        });

        setProgramTypes(typeArrange);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://crm.internationaleducationoffice.co.uk/programs", config)
      .then((response) => {
        setFilteredPrograms(response.data);
        // setPrograms(response.data);
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
        setUniversities(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
        "https://crm.internationaleducationoffice.co.uk/core-settings/qualifications",
        config
      )
      .then((response) => {
        setQualifications(response.data.data);
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
        setAllCountries(response.data.data);
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
        setAllTests(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (countryLivingIn) {
      axios
        .get(
          `https://crm.internationaleducationoffice.co.uk/core-settings/city`,
          config
        )
        .then((response) => {
          const countryFind = response.data.data.filter(
            (row) => row.country === countryLivingIn
          );
          setAllCities(countryFind);
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
            (row) => row.country === countryLivingIn
          );
          setAllProvinces(provinceFind);
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
            (row) => row.country === countryLivingIn
          );
          setAllRegions(regionFind);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(
          `https://crm.internationaleducationoffice.co.uk/core-settings/last-institution`,
          config
        )
        .then((response) => {
          const institutionFind = response.data.data.filter(
            (row) => row.country === countryLivingIn
          );
          setAllInstitutions(institutionFind);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (programId) {
      axios
        .get("https://crm.internationaleducationoffice.co.uk/programs", config)
        .then((response) => {
          const startFind = response.data.find((row) => row._id === programId);

          setStartData(startFind.startData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [countryLivingIn, programId]);
  useEffect(() => {
    if (universityId) {
      // const findCampus = filteredCampus.find(
      //   (row) => row.university._id === universityId
      // );
      // const findPrograms = filteredPrograms.find(
      //   (row) => row.university._id === universityId
      // );

      axios
        .get(
          `https://crm.internationaleducationoffice.co.uk/programs/university/${universityId}`,
          config
        )
        .then((response) => {
          setPrograms(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(
          `https://crm.internationaleducationoffice.co.uk/campus/${universityId}`,
          config
        )
        .then((response) => {
          setCampuses(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [universityId]);

  useEffect(() => {
    if (programType && campus && universityId) {
      const findPrograms = filteredPrograms.filter(
        (row) =>
          row.university._id === universityId &&
          row.programType.value === programType &&
          row.campus.name === campus
      );
      setPrograms(findPrograms);
      //   axios
      //     .get(
      //       `https://crm.internationaleducationoffice.co.uk/campus/${universityId}`,
      //       config
      //     )
      //     .then((response) => {
      //       setCampuses(response.data);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
    }
    if (programType) {
      const findTypeName = programTypes.find(
        (row) => row.value === programType
      );
      setProgramTypeName(findTypeName?.label);
      setProgramTypeDocuments(findTypeName?.documents_list);
    }
  }, [programType, campus, universityId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = {
      universityId,
      programId,
      startMonth,
      startYear,
      passport,
      status,
      notes: notes,
      gender,
      province,
      firstname,
      dynamicFields,
      score,
      englishTest,
      offer_status,
      lastname,
      nationality,
      email,
      phoneNo,
      member,
      dateOfBirth,
      monthOfBirth,
      yearOfBirth,
      address,
      postalCode,
      city,
      countryLivingIn,
      region,
      nic,
      lastEducationCountry,
      lastQualification,
      lastInstitution,
      CGPA,
    };

    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/applications/update/${id}/${studentId}`,
        formdata,
        config
      )
      .then((response) => {
        console.log(dynamicFields);
        setPopupshow(true);
        setPopupText("Application Updated");
        setErrorShow(false);
        setPopupColor("orange");
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data) {
          setErrorShow(true);
          setErrorMessage(error.response.data);
        }
      });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {popUpShow ? (
          <PopupAlert popUpText={popUpText} backgroundColor={popUpColor} />
        ) : (
          ""
        )}

        {/* Delete modal */}
        <Modal show={deleteModal} onHide={setDeletedModal}>
          <Modal.Header></Modal.Header>
          <Modal.Body>
            <SureModal
              url={
                "https://crm.internationaleducationoffice.co.uk/applications/"
              }
              ids={[id]}
              name={["Application", "Applications"]}
              setPopupText={setPopupText}
              setPopupshow={setPopupshow}
              navigate={"/applications"}
              showText={""}
              setPopupColor={setPopupColor}
              setUpClose={setDeletedModal}
              config={config}
            />
          </Modal.Body>
        </Modal>
        <div className="top-new">
          <h1 className="heading-top text-dark ps-3 fw-bold">
            <a
              href={application ? `/applications` : `/my-cases`}
              style={{ color: "black" }}
            >
              Applications{" "}
            </a>
            &gt; Update Applications
          </h1>
        </div>

        <div className="btn-group">
          <div className="gap-3 mt-2">
            <button
              className="ms-4 btn btn-primary"
              style={{ backgroundColor: page_no === 0 && "#5a5bda" }}
              onClick={() => setPageNo(0)}
            >
              <i className="bi bi-person-circle me-2"></i> Counselor
            </button>
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
            {/*  <button
              className="btn btn-primary ms-2"
              style={{ backgroundColor: page_no === 3 && "#5a5bda" }}
              onClick={() => setPageNo(3)}
            >
              <i className="bi bi-bank2 me-2"></i>Suggested University
            </button>  */}
            <button
              className="btn btn-primary ms-2"
              style={{ backgroundColor: page_no === 4 && "#5a5bda" }}
              onClick={() => setPageNo(4)}
            >
              <i className="fa-solid fa-table-list me-2"></i> Admission officer
            </button>{" "}
            <button
              className="btn btn-primary ms-2"
              style={{ backgroundColor: page_no === 10 && "#5a5bda" }}
              onClick={() => setPageNo(10)}
            >
              <i className="fa-solid fa-table-list me-2"></i> Status
            </button>
            <button
              className="btn btn-primary ms-2"
              style={{ backgroundColor: page_no === 9 && "#5a5bda" }}
              onClick={() => setPageNo(9)}
            >
              <i className="fa-solid fa-table-list me-2"></i> CAS
            </button>
            <button
              className="btn btn-primary ms-2"
              style={{ backgroundColor: page_no === 5 && "#5a5bda" }}
              onClick={() => setPageNo(5)}
            >
              {" "}
              <i className="fa-solid fa-table-list me-2"></i> Visa officer
            </button>
            {/* <button
              className="btn btn-primary ms-2"
              style={{ backgroundColor: page_no === 2 && "#5a5bda" }}
              onClick={() => setPageNo(2)}
            >
              <i className="fa-solid fa-table-list me-2"></i> Dynamic Fields
            </button> */}
            {documentPermission && (
              <button
                className="ms-2 btn btn-primary"
                style={{ backgroundColor: page_no === 6 && "#5a5bda" }}
                onClick={() => setPageNo(6)}
              >
                <i className="fa-solid fa-file-invoice me-2"></i> Documents
              </button>
            )}
            {role === "superadmin" ? (
              <button
                className="ms-2 btn btn-danger"
                onClick={() => setDeletedModal(true)}
              >
                <i className="fa-solid fa-trash me-2"></i> Delete
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

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
                  <Form.Group
                    style={{
                      width: "90%",
                    }}
                  >
                    <Form.Label className="text-dark fw-bold pt-2">
                      Application Id
                    </Form.Label>
                    <div
                      className="input-group"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <span className="input-group-text">
                        <i className="fa-solid fa-key"></i>
                      </span>

                      <p style={{ margin: "0px 20px" }}>{application_id}</p>
                    </div>
                  </Form.Group>
                  {fields.map((field) => {
                    if (
                      field.name === "firstname" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            First name<span className="esterik">*</span>
                          </Form.Label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fa-solid fa-user-tie"></i>
                            </span>
                            {field.update ? (
                              <Form.Control
                                type="text"
                                placeholder="Firstname"
                                value={firstname}
                                required
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                            ) : (
                              <p>{firstname ? firstname : "-"}</p>
                            )}
                          </div>
                        </Form.Group>
                      );
                    } else if (
                      field.name === "lastname" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Last name<span className="esterik">*</span>
                          </Form.Label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fa-solid fa-user-tie"></i>
                            </span>

                            {field.update ? (
                              <Form.Control
                                type="text"
                                placeholder="Lastname"
                                value={lastname}
                                required
                                onChange={(e) => setlastname(e.target.value)}
                              />
                            ) : (
                              <p>{lastname ? lastname : "-"}</p>
                            )}
                          </div>
                        </Form.Group>
                      );
                    } else if (
                      field.name === "gender" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Gender
                          </Form.Label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fa-solid fa-person-half-dress"></i>
                            </span>
                            {field.update ? (
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
                            ) : (
                              <p>{gender ? gender : "-"}</p>
                            )}
                          </div>
                        </Form.Group>
                      );
                    } else if (
                      field.name === "email" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Email<span className="esterik">*</span>
                          </Form.Label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fa-solid fa-envelope"></i>
                            </span>

                            {field.update ? (
                              <Form.Control
                                type="email"
                                placeholder="Email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            ) : (
                              <p>{email ? email : "-"}</p>
                            )}
                          </div>
                        </Form.Group>
                      );
                    } else if (
                      field.name === "phoneNo" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Phone no<span className="esterik">*</span>
                          </Form.Label>
                          <div className="input-group">
                            <span className="input-group-text"></span>
                            {field.update ? (
                              <PhoneInput
                                country={"pk"} // Set the default country
                                value={phoneNo}
                                required
                                onChange={(value, data) =>
                                  setphoneNo(`+${value}`)
                                }
                              />
                            ) : (
                              <p>{phoneNo ? phoneNo : "-"}</p>
                            )}
                          </div>
                        </Form.Group>
                      );
                    } else if (
                      field.name === "nationality" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Nationality
                          </Form.Label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fa-solid fa-flag"></i>
                            </span>
                            {field.update ? (
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
                            ) : (
                              <p>{nationality ? nationality : "-"}</p>
                            )}
                          </div>
                        </Form.Group>
                      );
                    } else if (
                      field.name === "dateOfBirth" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <div key={field._id}>
                          <Form.Group style={{ width: "90%" }}>
                            <Form.Label className="label-form text-dark fw-bold pt-2">
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
                              {field.update ? (
                                <>
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
                                </>
                              ) : (
                                <p>
                                  {dateOfBirth && monthOfBirth && yearOfBirth
                                    ? `${dateOfBirth} - ${monthOfBirth} - ${yearOfBirth}`
                                    : "-"}
                                </p>
                              )}
                            </div>
                          </Form.Group>
                        </div>
                      );
                    } else if (
                      field.name === "address" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Address
                          </Form.Label>

                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-solid fa-map-location-dot"></i>
                              </span>

                              <Form.Control
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setaddress(e.target.value)}
                              />
                            </div>
                          ) : (
                            <p>{address ? address : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "postalCode" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Postal code
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-solid fa-code"></i>
                              </span>
                              <Form.Control
                                type="text"
                                placeholder="Postal Code"
                                value={postalCode}
                                onChange={(e) => setpostalCode(e.target.value)}
                              />
                            </div>
                          ) : (
                            <p>{postalCode ? postalCode : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "countryLivingIn" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            {" "}
                            Currently living in
                          </Form.Label>

                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-solid fa-flag"></i>
                              </span>
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
                            </div>
                          ) : (
                            <p>{countryLivingIn ? countryLivingIn : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "city" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            City
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-solid fa-city"></i>
                              </span>
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
                            </div>
                          ) : (
                            <p>{city ? city : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "region" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Region
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-solid fa-map-location-dot"></i>
                              </span>

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
                            </div>
                          ) : (
                            <p>{region ? region : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "province" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Province
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-solid fa-map-location-dot"></i>
                              </span>
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
                            </div>
                          ) : (
                            <p>{province ? province : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "nic" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            NIC
                          </Form.Label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fa-solid fa-address-card"></i>
                            </span>
                            {field.update ? (
                              <Form.Control
                                type="text"
                                placeholder="NIC"
                                value={nic}
                                onChange={(e) => setNic(e.target.value)}
                              />
                            ) : (
                              <p>{nic ? nic : "-"}</p>
                            )}
                          </div>
                        </Form.Group>
                      );
                    } else if (
                      field.name === "passport" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Passport
                          </Form.Label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="fa-solid fa-passport"></i>
                            </span>
                            {field.update ? (
                              <Form.Control
                                type="text"
                                placeholder="Passport"
                                value={passport}
                                onChange={(e) => setPassport(e.target.value)}
                              />
                            ) : (
                              <p>{passport ? passport : "-"}</p>
                            )}
                          </div>
                        </Form.Group>
                      );
                    }
                    return null;
                  })}
                  <h5
                    className="fw-bold"
                    style={{ textDecoration: "underline", margin: "10px 0px" }}
                  >
                    Academic Details
                  </h5>
                  {fields.map((field) => {
                    if (
                      field.name === "lastEducationCountry" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Last education country
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-solid fa-flag"></i>
                              </span>
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
                            </div>
                          ) : (
                            <p>
                              {lastEducationCountry
                                ? lastEducationCountry
                                : "-"}
                            </p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "lastQualification" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Last qualification
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="  fa-solid fa-graduation-cap"></i>
                              </span>
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
                            </div>
                          ) : (
                            <p>{lastQualification ? lastQualification : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "lastInstitution" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Last institution
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="  fa-solid fa-graduation-cap"></i>
                              </span>
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
                            </div>
                          ) : (
                            <p>{lastInstitution ? lastInstitution : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "CGPA" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            CGPA
                          </Form.Label>
                          {field.update ? (
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
                          ) : (
                            <p>{CGPA ? CGPA : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "englishTest" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            English test
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="  fa-solid fa-graduation-cap"></i>
                              </span>
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
                            </div>
                          ) : (
                            <p>{englishTest ? englishTest : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "score" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Score
                          </Form.Label>
                          {field.update ? (
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
                          ) : (
                            <p>{score ? score : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else {
                      return null;
                    }
                  })}
                  <h5
                    className="fw-bold"
                    style={{ textDecoration: "underline", margin: "10px 0px" }}
                  >
                    Suggested University
                  </h5>
                  {fields.map((field) => {
                    if (
                      field.name === "universityId" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            University<span className="esterik">*</span>
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-solid fa-building-columns"></i>
                              </span>
                              <Form.Control
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
                              </Form.Control>
                            </div>
                          ) : (
                            <p>{universityId ? universityId : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "campus" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Campus
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-solid fa-book-open"></i>
                              </span>
                              <Form.Control
                                as="select"
                                value={campus}
                                onChange={(e) => {
                                  setCampus(e.target.value);
                                }}
                              >
                                <option value="">Select</option>
                                {campuses.map((row, index) => (
                                  <option value={row.name} key={index}>
                                    {row.name}
                                  </option>
                                ))}
                              </Form.Control>
                            </div>
                          ) : (
                            <p>{campus ? campus : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "programType" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Degree type
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-solid fa-book-open"></i>
                              </span>
                              <Form.Control
                                as="select"
                                value={programType}
                                onChange={(e) => {
                                  setProgramType(e.target.value);
                                }}
                              >
                                <option value="">Select</option>
                                {programTypes.map((row, index) => {
                                  return (
                                    <option value={row.value} key={index}>
                                      {row.label}
                                    </option>
                                  );
                                })}
                              </Form.Control>
                            </div>
                          ) : (
                            <p>{programTypeName ? programTypeName : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "programId" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Program<span className="esterik">*</span>
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-solid fa-book-open"></i>
                              </span>
                              <Form.Control
                                as="select"
                                value={programId}
                                required
                                onChange={(e) => {
                                  setProgramId(e.target.value);
                                  const startFind = programs?.find(
                                    (row) => row._id === e.target.value
                                  );

                                  setStartData(startFind?.startData);
                                }}
                              >
                                <option value="">Select</option>
                                {programs.map((row, index) => (
                                  <option value={row._id} key={index}>
                                    {row.name}
                                  </option>
                                ))}
                              </Form.Control>
                            </div>
                          ) : (
                            <p>{programId ? programName : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "startMonth" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Session
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-solid fa-user-clock"></i>
                              </span>
                              <Form.Control
                                as="select"
                                value={startMonth}
                                onChange={(e) => {
                                  const selectedStartDate = e.target.value;

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
                                  <option value={row.startMonth} key={index}>
                                    {row.startMonth} {row.startYear}
                                  </option>
                                ))}
                              </Form.Control>
                            </div>
                          ) : (
                            <p>
                              {startMonth
                                ? `${startMonth} - ${startYear}`
                                : "-"}
                            </p>
                          )}
                        </Form.Group>
                      );
                      {
                        /* } else if (
                      field.name === "status" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Status
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-solid fa-user-clock"></i>
                              </span>
                              <Form.Control
                                as="select"
                                value={status}
                                onChange={(e) => {
                                  setStatus(e.target.value);
                                }}
                              >
                                <option value="">Select status</option>
                                {allStatuses.map((row, index) => (
                                  <option value={row.name} key={index}>
                                    {row.name}
                                  </option>
                                ))}
                              </Form.Control>
                            </div>
                          ) : (
                            <p>{status}</p>
                          )}
                        </Form.Group>
                      ); */
                      }
                    } else {
                      return null;
                    }
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
                                  value={dynamicFields[`${row.key}Date`] || ""}
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
                                  style={{ marginLeft: 20, width: "30%" }}
                                  value={dynamicFields[`${row.key}Month`] || ""}
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
                                  style={{ marginLeft: 20, width: "20%" }}
                                  value={dynamicFields[`${row.key}Year`] || ""}
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
                  <h3 className="fw-bold">Academic Details</h3>
                  {loading ? <CircularProgress /> : ""}

                  {fields.map((field) => {
                    if (
                      field.name === "lastEducationCountry" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Last education country
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-solid fa-flag"></i>
                              </span>
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
                            </div>
                          ) : (
                            <p>
                              {lastEducationCountry
                                ? lastEducationCountry
                                : "-"}
                            </p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "lastQualification" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Last qualification
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="  fa-solid fa-graduation-cap"></i>
                              </span>
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
                            </div>
                          ) : (
                            <p>{lastQualification ? lastQualification : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "lastInstitution" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Last institution
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="  fa-solid fa-graduation-cap"></i>
                              </span>
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
                            </div>
                          ) : (
                            <p>{lastInstitution ? lastInstitution : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "CGPA" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            CGPA
                          </Form.Label>
                          {field.update ? (
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
                          ) : (
                            <p>{CGPA ? CGPA : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "englishTest" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            English test
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="  fa-solid fa-graduation-cap"></i>
                              </span>
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
                            </div>
                          ) : (
                            <p>{englishTest ? englishTest : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "score" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Score
                          </Form.Label>
                          {field.update ? (
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
                          ) : (
                            <p>{score ? score : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
                {allFields1.map((row) => {
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
                                  value={dynamicFields[`${row.key}Date`] || ""}
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
                                  style={{ marginLeft: 20, width: "30%" }}
                                  value={dynamicFields[`${row.key}Month`] || ""}
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
                                  style={{ marginLeft: 20, width: "20%" }}
                                  value={dynamicFields[`${row.key}Year`] || ""}
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
                  <h3 className="fw-bold">Dynamic Fields</h3>
                  {allFields.map((row) => {
                    const field = fields.find((f) => f.name === row.key);
                    if (field && (field.update || field.read)) {
                      return (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
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
                            {row.type === "String" &&
                              (field.update ? (
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
                                  style={{ width: "30%" }}
                                />
                              ) : (
                                <p>
                                  {field.read && field
                                    ? dynamicFields[row.key]
                                    : "-"}
                                </p>
                              ))}
                            {row.type === "Options" &&
                              (field.update ? (
                                <Form.Control
                                  as="select"
                                  className="input-form"
                                  style={{ height: "40px", width: "30%" }}
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
                              ) : (
                                <p>
                                  {field.read && field
                                    ? dynamicFields[row.key]
                                    : "-"}
                                </p>
                              ))}
                            {row.type === "Number" &&
                              (field.update ? (
                                <Form.Control
                                  type="number"
                                  placeholder="Enter a number"
                                  className="input-form"
                                  style={{ height: "40px", width: "30%" }}
                                  value={dynamicFields[row.key] || ""}
                                  onChange={(e) => {
                                    setDynamicFields({
                                      ...dynamicFields,
                                      [row.key]: e.target.value,
                                    });
                                  }}
                                />
                              ) : (
                                <p>
                                  {field.read && field
                                    ? dynamicFields[row.key]
                                    : "-"}
                                </p>
                              ))}
                            {row.type === "Date" &&
                              (field.update ? (
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
                              ) : (
                                <p>
                                  {field.read && field
                                    ? `${dynamicFields[`${row.key}Date`]} - 
                                ${dynamicFields[`${row.key}Month`]} - 
                                ${dynamicFields[`${row.key}Year`]}`
                                    : "-"}
                                </p>
                              ))}

                            {row.type === "Dropdown" &&
                              (field.update ? (
                                <Form.Control
                                  as="select"
                                  className="input-form"
                                  style={{ height: "40px", width: "30%" }}
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
                              ) : (
                                <p>
                                  {field.read && field
                                    ? dynamicFields[row.key]
                                    : "-"}
                                </p>
                              ))}
                          </Form.Group>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            ) : page_no === 6 ? (
              <div className="col-md-7 box7 p-3">
                <div className="heading-box">
                  <DocumentModel
                    selectedRow={data}
                    list={programTypeDocuments}
                    newApp={false}
                  />
                </div>
              </div>
            ) : page_no === 3 ? (
              <div className="col-md-7 box7 p-3">
                <div className="heading-box">
                  <h3 className="fw-bold">Suggested University</h3>

                  {fields.map((field) => {
                    if (
                      field.name === "universityId" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            University
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-solid fa-building-columns"></i>
                              </span>
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
                            </div>
                          ) : (
                            <p>{universityId ? universityId : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "programId" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Program
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-solid fa-book-open"></i>
                              </span>
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
                                    {row.name}-{row.subject.name}-
                                    {row.degree.name}
                                  </option>
                                ))}
                              </Form.Control>
                            </div>
                          ) : (
                            <p>{programId ? programId : "-"}</p>
                          )}
                        </Form.Group>
                      );
                    } else if (
                      field.name === "startMonth" &&
                      (field.update || field.read)
                    ) {
                      return (
                        <Form.Group style={{ width: "90%" }} key={field._id}>
                          <Form.Label className="text-dark fw-bold pt-2">
                            Session
                          </Form.Label>
                          {field.update ? (
                            <div className="input-group">
                              <span className="input-group-text">
                                <i className="fa-solid fa-user-clock"></i>
                              </span>
                              <Form.Control
                                as="select"
                                value={startMonth}
                                onChange={(e) => {
                                  const selectedStartDate = e.target.value;

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
                                  <option value={row.startMonth} key={index}>
                                    {row.startMonth} {row.startYear}
                                  </option>
                                ))}
                              </Form.Control>
                            </div>
                          ) : (
                            <p>
                              {startMonth
                                ? `${startMonth} - ${startYear}`
                                : "-"}
                            </p>
                          )}
                        </Form.Group>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
                {allFields3.map((row) => {
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
                                  value={dynamicFields[`${row.key}Date`] || ""}
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
                                  style={{ marginLeft: 20, width: "30%" }}
                                  value={dynamicFields[`${row.key}Month`] || ""}
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
                                  style={{ marginLeft: 20, width: "20%" }}
                                  value={dynamicFields[`${row.key}Year`] || ""}
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
            ) : page_no === 4 ? (
              <div className="col-md-7 box7 p-3">
                <div className="heading-box">
                  <h3 className="fw-bold">Admission officer</h3>

                  {allFields4.map((row) => {
                    const field = fields.find((f) => f.name === row.key);
                    if (field && field.create === true) {
                      return (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
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
                                    style={{ marginLeft: 20, width: "30%" }}
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
                                    style={{ marginLeft: 20, width: "20%" }}
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
              </div>
            ) : page_no === 9 ? (
              <div className="col-md-7 box7 p-3">
                <div className="heading-box">
                  <h3 className="fw-bold">CAS</h3>
                  {allFields9.map((row) => {
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
                                    style={{
                                      marginLeft: 20,
                                      width: "30%",
                                    }}
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
                                    style={{
                                      marginLeft: 20,
                                      width: "20%",
                                    }}
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
              </div>
            ) : page_no === 5 ? (
              <div className="col-md-7 box7 p-3">
                <div className="heading-box">
                  <h3 className="fw-bold">Visa officer</h3>
                  {allFields5.map((row) => {
                    const field = fields.find((f) => f.name === row.key);
                    if (field && field.create === true) {
                      return (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
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
                                    style={{ marginLeft: 20, width: "30%" }}
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
                                    style={{ marginLeft: 20, width: "20%" }}
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
              </div>
            ) : page_no === 10 ? (
              <div className="col-md-7 box7 p-3">
                <div className="heading-box">
                  <h3 className="fw-bold">Status</h3>
                  <Form.Group style={{ width: "90%" }}>
                    <Form.Label className="text-dark fw-bold pt-2">
                      Admission Status
                    </Form.Label>

                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa-solid fa-user-clock"></i>
                      </span>
                      <Form.Control
                        as="select"
                        value={status}
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                      >
                        <option value="">Select status</option>
                        {allStatuses.map((row, index) => (
                          <option value={row.name} key={index}>
                            {row.name}
                          </option>
                        ))}
                      </Form.Control>
                    </div>
                  </Form.Group>
                  {allFields10.map((row) => {
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
                                    style={{
                                      marginLeft: 20,
                                      width: "30%",
                                    }}
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
                                    style={{
                                      marginLeft: 20,
                                      width: "20%",
                                    }}
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
                {notesPermission && notesPermission.create ? (
                  <>
                    <Form.Group style={{ width: "90%" }}>
                      <Form.Label className="fw-bold mt-2">Remarks</Form.Label>
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
            <div className="col-md-5 ps-3 box-9">
              {emailField || role === "superadmin" ? (
                <>
                  <div className="box8 p-3">
                    <h4 className="fw-bold">
                      <i
                        className="fa-solid fa-envelope pe-2 pt-2"
                        style={{ color: "red" }}
                      ></i>
                      Send Email
                    </h4>

                    <EmailModel
                      selectedRow={email}
                      applicationId={id}
                      setPopupColor={setPopupColor}
                      setPopupText={setPopupText}
                      setPopupshow={setPopupshow}
                    />

                    {/* <td>Email</td>
               <input type="email" className="form-control"></input>

               <td>Subject</td>
               <input type="text" className="form-control"></input> */}
                  </div>

                  <div className="box8 p-3 mt-3">
                    <h4 className="fw-bold">
                      <i
                        className="fa-solid fa-paper-plane pe-2"
                        style={{ color: "green" }}
                      ></i>
                      Send SMS
                    </h4>

                    <SMSModal
                      selectedRow={phoneNo}
                      setPopupText={setPopupText}
                      setPopupColor={setPopupColor}
                      applicationId={id}
                      setPopupshow={setPopupshow}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="box10 p-3 mt-3">
                <h4 className="fw-bold">
                  <i
                    className="fa-solid fa-rectangle-list pe-2"
                    style={{ color: "#0D6EFD" }}
                  ></i>
                  Logs
                </h4>

                <Logs data={logs} />
              </div>

              <div className="box10 p-3 mt-3">
                <h4 className="fw-bold">
                  <i
                    className="fa-solid fa-desktop pe-2"
                    style={{ color: "#FE7809" }}
                  ></i>
                  Desks
                </h4>

                <Desks data={desks} />
              </div>
            </div>
          </div>
        </div>

        {/* {loading ? (
          <CircularProgress />
        ) : ( )} */}

        <div className="bottom">
          <div className="right">
            {errorShow ? (
              <div style={{ color: "red", fontSize: 10 }}>{errorMessage}</div>
            ) : null}

            <Form onSubmit={handleSubmit}>
              <div>
                {/* {fields.map((field) => {
                  if (field.name === "firstname" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
                        <Form.Label>Frstname</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Firstname"
                          value={firstname}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </Form.Group>
                    );
                  } else if (field.name === "lastname" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Lastname"
                          value={lastname}
                          onChange={(e) => setlastname(e.target.value)}
                        />
                      </Form.Group>
                    );
                  } else if (field.name === "gender" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
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
                  } else if (field.name === "email" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>
                    );
                  } else if (field.name === "phoneNo" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
                        <Form.Label>Phone No.</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Phone No."
                          value={phoneNo}
                          onChange={(e) => setphoneNo(e.target.value)}
                        />
                      </Form.Group>
                    );
                  } else if (field.name === "dateOfBirth" && field.update) {
                    return (
                      <div key={field._id}>
                        <Form.Group>
                          <Form.Label className="label-form">
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
                  } else if (field.name === "nic" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
                        <Form.Label>NIC</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="NIC"
                          value={nic}
                          onChange={(e) => setNic(e.target.value)}
                        />
                      </Form.Group>
                    );
                  } else if (field.name === "passport" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
                        <Form.Label>Passport</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Passport"
                          value={passport}
                          onChange={(e) => setPassport(e.target.value)}
                        />
                      </Form.Group>
                    );
                  } else if (field.name === "nationality" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
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
                  } else if (field.name === "countryLivingIn" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
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
                  } else if (field.name === "address" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Address"
                          value={address}
                          onChange={(e) => setaddress(e.target.value)}
                        />
                      </Form.Group>
                    );
                  } else if (field.name === "postalCode" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Postal Code"
                          value={postalCode}
                          onChange={(e) => setpostalCode(e.target.value)}
                        />
                      </Form.Group>
                    );
                  } else if (field.name === "province" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
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
                  } else if (field.name === "city" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
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
                  } else if (field.name === "region" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
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
                    field.update
                  ) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
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
                    field.update
                  ) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
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
                  } else if (field.name === "lastInstitution" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
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
                  } else if (field.name === "universityId" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
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
                  } else if (field.name === "programId" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
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
                  } else if (field.name === "startMonth" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
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
                  } else if (field.name === "englishTest" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
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
                  } else if (field.name === "CGPA" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
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
                  } else if (field.name === "score" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
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
                  } else if (field.name === "status" && field.update) {
                    return (
                      <Form.Group style={{ width: "30%" }} key={field._id}>
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
                })} */}

                {/* Dynamic fields
                {allFields.map((row) => {
                  const field = fields.find((f) => f.name === row.key);
                  if (field && field.update === true) {
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
                              style={{ width: "30%" }}
                            />
                          )}
                          {row.type === "Options" && (
                            <Form.Control
                              as="select"
                              className="input-form"
                              style={{ height: "40px", width: "30%" }}
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
                              style={{ height: "40px", width: "30%" }}
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
                              style={{ height: "40px", width: "30%" }}
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
                })} */}

                <Form.Group style={{ width: "90%" }}>
                  <Form.Label className="text-dark fw-bold pt-2">
                    Case Owner
                  </Form.Label>
                  <p>{case_owner_name}</p>
                  {/* <div className="input-group">
            <span className="input-group-text">
              <i className="fa-solid fa-user-clock"></i>
            </span>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value="">Select status</option>
              {allStatuses.map((row, index) => (
                <option value={row.name} key={index}>
                  {row.name}
                </option>
              ))}
            </Form.Control>
          </div> */}
                </Form.Group>
              </div>
              <Button
                variant="btn btn-primary green_bg_logo"
                type="submit"
                className="px-5 py-2"
              >
                Update
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateApplication;
