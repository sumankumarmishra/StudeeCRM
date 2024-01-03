import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import ReactQuill from "react-quill";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import PopupAlert from "../../components/popupalert/popupAlert";
import { allLanguages } from "../../components/Data/data";
import { useNavigate, useParams } from "react-router-dom";

const NewProgram = ({ title }) => {
  const [name, setName] = useState("");
  const { urlName, campusUrlName } = useParams();
  const [university, setUniversity] = useState("");
  const [startData, setStartData] = useState([]);
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [eligibility_entry, setEligibilityEntry] = useState([]);
  const [all_eligibility_entry, setAllEligibilityEntries] = useState([]);
  const [annualTutionFees, setTuitionFees] = useState();
  const [pace, setPace] = useState([]);
  const [allPaces, setAllPaces] = useState([]);
  const [languageThoughtIn, setLanguageThoughtIn] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [duration, setDuration] = useState("");
  const [scholarship, setSchorlarship] = useState(0);
  const [programOverview, setOverview] = useState("");
  const [image, setImage] = useState(null);
  const [programType, setProgramType] = useState("");
  const [allUniversities, setAllUniversities] = useState([]);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const [campus, setCampus] = useState("");
  const [campuses, setAllCampuses] = useState([]);
  const [subject, setSubject] = useState("");
  const [degree, setDegree] = useState("");
  const [allSubjects, setAllSubjects] = useState([]);
  const [allPrograms, setAllPrograms] = useState([]);
  const [allDegree, setAllDegree] = useState([]);
  const [allProgramTypes, setAllProgramTypes] = useState([]);
  const allDeliveryMethods = ["On campus", "Online", "Blended Learning"];
  const navigate = useNavigate();
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/universities/university1/${urlName}`,
        config
      )
      .then((response) => {
        setUniversity(response.data?._id);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/campus/campus1/${urlName}/${campusUrlName}`,
        config
      )
      .then((response) => {
        setCampus(response.data?._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [campus, university]);

  useEffect(() => {
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/core-settings/program-catalogue",
        config
      )
      .then((response) => {
        setAllPrograms(response.data?.data);
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
        setAllUniversities(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/core-settings/program-pace-catalogue",
        config
      )
      .then((response) => {
        const paceArrange = response.data.data.map((row) => {
          return {
            value: row.name,
            label: row.name,
            name: row.name,
          };
        });
        setAllPaces(paceArrange);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://crm.internationaleducationoffice.co.uk/subjects", config)
      .then((response) => {
        setAllSubjects(response.data);
        const findEligibility = response.data.map((row) => {
          return {
            name: row._id,
            label: row.name,
            value: row._id,
          };
        });
        setAllEligibilityEntries(findEligibility);
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
        "https://crm.internationaleducationoffice.co.uk/programTypes",
        config
      )
      .then((response) => {
        setAllProgramTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (university) {
      axios
        .get(
          `https://crm.internationaleducationoffice.co.uk/campus/${university}`,
          config
        )
        .then((response) => {
          setAllCampuses(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (subject) {
      axios
        .get(
          `https://crm.internationaleducationoffice.co.uk/degree/${subject}`,
          config
        )
        .then((response) => {
          setAllDegree(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [university, subject]);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  // Function to delete an item by index
  const deleteItem = (indexToDelete) => {
    const updatedStartData = startData.filter(
      (_, index) => index !== indexToDelete
    );
    setStartData(updatedStartData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("university", university);
    formData.append("scholarship", scholarship);
    formData.append("deliveryMethod", deliveryMethod);
    formData.append("subject", subject);
    formData.append("degree", degree);
    formData.append("campus", campus);
    formData.append("languageThoughtIn", languageThoughtIn);
    formData.append("annualTutionFees", annualTutionFees);
    formData.append("programOverview", programOverview);
    formData.append("programType", programType);
    formData.append("duration", duration);
    formData.append("image", image);
    startData.forEach((startDate, index) => {
      formData.append(`startData[${index}][startMonth]`, startDate.startMonth);
      formData.append(`startData[${index}][startYear]`, startDate.startYear);
    });
    pace.forEach((item, index) => {
      formData.append(`pace[${index}]`, item.name);
    });
    eligibility_entry.forEach((item, index) => {
      formData.append(`eligibility_entry[${index}]`, item.name);
    });
    if (startData.length > 0) {
      axios
        .post(
          "https://crm.internationaleducationoffice.co.uk/programs",
          formData,
          config
        )
        .then((response) => {
          setName("");
          setEligibilityEntry([]);
          setImage(null);
          setSubject("");
          setDegree("");
          setStartData([]);
          setOverview("");
          setOverview("");
          setProgramType("");
          setSchorlarship(null);
          setUniversity("");
          setDuration("");
          setTuitionFees("");
          setPopupText("Program Added");
          setPopupshow(true);
          setTimeout(() => {
            setPopupshow(false);
            navigate(`/${urlName}/${campusUrlName}/programs`);
          }, 2000);
          setErrorShow(false);
        })
        .catch((error) => {
          console.log(error);
          setErrorShow(true);
          if (error.response.data) {
            alert(error.response.data);
          }
        });
    } else {
      alert("Must add atleast one session.");
    }
  };

  const handleAdd = () => {
    setStartData([
      ...startData,
      {
        startMonth: startMonth,
        startYear: startYear,
      },
    ]);
    setStartMonth("");
    setStartYear("");
  };

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    setSubject(selectedSubject);
    // Use filteredSubjects array for further processing or rendering
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div style={{ margin: 40 }}>
          <h2 className="heading-top text-dark ps-3 fw-bold">
            <a href={`/universities`}>Universities</a> &gt;{" "}
            <a href={`/campus/${urlName}`}>Campus</a>
            &gt; <a href={`/${urlName}/${campusUrlName}/programs`}>Programs</a>
            &gt; Add Program
          </h2>
          {popUpShow ? (
            <PopupAlert popUpText={popUpText} backgroundColor={"#8AFF8A"} />
          ) : (
            ""
          )}
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit}
          >
            {/*University name*/}
            <h5 className="mt-3">
              University Name<span style={{ color: "red" }}>*</span>
            </h5>
            <select
              value={university}
              onChange={(e) => {
                setUniversity(e.target.value);
              }}
              required
              className="input-programs"
              disabled
            >
              <option value="">Select University</option>
              {allUniversities.map((row) => (
                <option value={row._id} key={row.universityName}>
                  {row.universityName}
                </option>
              ))}
            </select>
            {/*Campus name*/}
            <h5 className="mt-3">
              Select campus<span style={{ color: "red" }}>*</span>
            </h5>
            <select
              value={campus}
              onChange={(e) => {
                setCampus(e.target.value);
              }}
              disabled
              required
              className="input-programs"
            >
              <option value="">Select Campus</option>
              {campuses.map((row) => (
                <option value={row._id} key={row._id}>
                  {row.name}
                </option>
              ))}
            </select>
            {/*Name*/}
            <h5 className="mt-3">
              Program Name<span style={{ color: "red" }}>*</span>
            </h5>
            <input
              type="text"
              className="input-programs"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />

            {/*Duration*/}
            <h5 className="mt-3">Duration</h5>
            <input
              type="text"
              className="input-programs"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            {/*Pace*/}

            <h5 className="mt-3">Pace</h5>
            <Select
              options={allPaces}
              className="input-programs"
              isMulti
              value={pace}
              onChange={(selected) => setPace(selected)}
            />

            {/*Delivery Method*/}

            <h5 className="mt-3">Delivery Method</h5>
            <select
              value={deliveryMethod}
              className="input-programs"
              onChange={(e) => setDeliveryMethod(e.target.value)}
            >
              <option value=""></option>
              {allDeliveryMethods.map((row) => (
                <option value={row}>{row}</option>
              ))}
            </select>
            {/*Languaes*/}

            <h5 className="mt-3">Language taught in</h5>
            <select
              value={languageThoughtIn}
              className="input-programs"
              onChange={(e) => setLanguageThoughtIn(e.target.value)}
            >
              <option value=""></option>
              {allLanguages.map((row) => (
                <option value={row.name}>{row.name}</option>
              ))}
            </select>
            {/*Degree*/}

            <h5 className="mt-3">
              Degree<span style={{ color: "red" }}>*</span>
            </h5>

            <select
              className="input-programs"
              value={programType}
              required
              onChange={(e) => setProgramType(e.target.value)}
            >
              <option value=""></option>
              {allProgramTypes.map((row) => (
                <option value={row._id}>
                  {row.name}-{row.graduate}
                </option>
              ))}
            </select>
            {/*Subject*/}

            <h5 className="mt-3">
              Subject (Specialization)<span style={{ color: "red" }}>*</span>
            </h5>
            <select
              value={subject}
              required
              className="input-programs"
              onChange={handleSubjectChange}
            >
              <option value=""> Select Subject</option>
              {allSubjects.map((row, index) => (
                <option value={row._id} key={index}>
                  {" "}
                  {row.name}
                </option>
              ))}
            </select>
            {/*Degree*/}
            <h5 className="mt-3">
              Faculty<span style={{ color: "red" }}>*</span>
            </h5>

            <select
              value={degree}
              required
              className="input-programs"
              onChange={(e) => {
                setDegree(e.target.value);
              }}
            >
              <option value=""> Select Subject</option>
              {allDegree.map((row, index) => (
                <option value={row._id} key={index}>
                  {row.name}
                </option>
              ))}
            </select>
            {/*Eligibility Search Keywords*/}

            <h5 className="mt-3">Eligibility Search Keywords</h5>
            <Select
              options={all_eligibility_entry}
              className="input-programs"
              isMulti
              value={eligibility_entry}
              onChange={(selected) => setEligibilityEntry(selected)}
            />
            {/*Image*/}

            <h5 className="mt-3">Banner Image</h5>
            <input
              type="file"
              id="myFile"
              accept=".png, .jpg, .jpeg"
              name="myFile"
              className="input-country form-control"
              onChange={handleImageUpload}
              style={{ marginTop: 10, marginBottom: 10, width: "600px" }}
            />

            {/*Annual fees*/}

            <h5 className="mt-3">
              Annual Tuition Fees<span style={{ color: "red" }}>*</span>
            </h5>
            <input
              type="number"
              className="input-programs"
              value={annualTutionFees}
              required
              onChange={(e) => setTuitionFees(e.target.value)}
            />
            {/*Annual fees*/}

            <h5 className="mt-3">Scholarship</h5>
            <input
              type="number"
              className="input-programs"
              value={scholarship}
              onChange={(e) => setSchorlarship(e.target.value)}
            />
            <h4>
              Sessions<span style={{ color: "red" }}>*</span>
            </h4>
            <div style={{ display: "flex" }}>
              <h5>Start date: </h5>

              <select
                style={{ marginLeft: 6, width: 170 }}
                // className="input-programs"
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
              >
                <option value=""></option>
                {month.map((row, index) => (
                  <option value={row.name} key={index}>
                    {row.name}
                  </option>
                ))}
              </select>
              <select
                style={{ marginLeft: 6, width: 120 }}
                // className="input-programs"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
              >
                <option value=""></option>
                {year.map((row, index) => (
                  <option value={row.name} key={index}>
                    {row.name}
                  </option>
                ))}
              </select>
            </div>

            <p
              onClick={handleAdd}
              className="btn btn-primary mt-2"
              style={{
                cursor: "pointer",
                width: 100,
                borderRadius: 5,
                textAlign: "center",
              }}
            >
              Add
            </p>
            {startData.map((row, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "40%",
                }}
              >
                <div>
                  <p>
                    {index + 1}. {row.startMonth} {row.startYear}
                  </p>
                </div>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteItem(index)}
                >
                  X
                </p>
              </div>
            ))}

            {/*Program Overview*/}
            <h4>Program Overview</h4>
            <ReactQuill
              value={programOverview}
              className="input-programs"
              onChange={(value) => setOverview(value)}
            />

            {errorShow ? <p style={{ color: "red" }}>{errorMessage}</p> : ""}
            <input
              type="submit"
              style={{ width: 100 }}
              className="btn btn-primary green_bg_logo"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProgram;
