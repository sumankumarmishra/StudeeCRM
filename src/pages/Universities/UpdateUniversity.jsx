import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import ReactQuill from "react-quill";
import PopupAlert from "../../components/popupalert/popupAlert";
import { RxCross1 } from "react-icons/rx";
import Button from "react-bootstrap/Button";
import { useLocation, useNavigate } from "react-router-dom";

const Updateuniversity = ({ title }) => {
  const locationParmas = useLocation();
  const data = locationParmas.state.data;
  const id = data._id;
  const [universityName, setName] = useState(data.universityName);
  const [allUniversities, setAllUniversites] = useState([]);
  const [whyStudyHere, setWhyStudyHere] = useState(data.whyStudyHere);
  const [personName, setPersonName] = useState(data.whatUniSays.personName);
  const [admissionRequirements, setAdmissionRequirements] = useState(
    data.admissionRequirements
  );
  const [personImage, setPersonImage] = useState(null);
  const [position, setPosition] = useState(data.whatUniSays.position);
  const [message, setMessage] = useState(data.whatUniSays.message);
  const [feesAndfunding, setFeesAndFundings] = useState(data.feesAndfunding);
  const [country, setCountry] = useState(data.country._id);
  const [allCountries, setAllCountries] = useState([]);
  const [city, setCity] = useState(data.city._id);
  const [allCities, setAllCities] = useState([]);
  const [location, setLocation] = useState(data.location);
  const [internationalStudents, setInternationalStudents] = useState(
    data.internationalStudents
  );
  const [nationalities, setNationalities] = useState(data.nationalities);
  const [studyAbroadDescription, setStudyAbroadDescription] = useState(
    data.studyAbroadDescription
  );
  const [logoImage, setLogoImage] = useState(null);
  const [banner, setBanner] = useState(null);
  const [type, setType] = useState(data.type);

  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [studentVisa, setStudentVisa] = useState(data.studentVisa);
  const [errorShow, setErrorShow] = useState(false);
  const [lifeOfInternationalStudents, setLifeOfInternationlStudents] = useState(
    data.lifeOfInternationalStudents
  );
  const [studentFacilities, setStudentFacilities] = useState(
    data.studentFacilities
  );
  const [facilityName, setFacilityName] = useState("");
  const [facilityData, setFacilityData] = useState([]);
  const [nameOfFacility, setnameOfFacility] = useState("");
  const [count, setCount] = useState();
  const [allFacilities, setAllFacilities] = useState([]);
  const [facilitiesData, setFacilitiesData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get("https://crm.internationaleducationoffice.co.uk/facilities", config)
      .then((response) => {
        setAllFacilities(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://crm.internationaleducationoffice.co.uk/core-settings/university", config)
      .then((response) => {
        setAllUniversites(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://crm.internationaleducationoffice.co.uk/countries", config)
      .then((response) => {
        setAllCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (country) {
      axios
        .get(`https://crm.internationaleducationoffice.co.uk/cities/${country}`, config)
        .then((response) => {
          setAllCities(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [country]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("universityName", universityName);
    formData.append("type", type);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("logoImage", logoImage);
    formData.append("admissionRequirements", admissionRequirements);
    formData.append("banner", banner);
    formData.append("studentVisa", studentVisa);
    formData.append("nationalities", nationalities);
    formData.append("studyAbroadDescription", studyAbroadDescription);
    formData.append("location", location);
    formData.append("internationalStudents", internationalStudents);
    formData.append("personImage", personImage);
    formData.append("personName", personName);
    formData.append("message", message);
    formData.append("feesAndfunding", feesAndfunding);
    formData.append("position", position);
    formData.append("whyStudyHere", whyStudyHere);
    formData.append("lifeOfInternationalStudents", lifeOfInternationalStudents);
    studentFacilities.forEach((facility, index) => {
      formData.append(`studentFacilities[${index}][name]`, facility.name);
      formData.append(`studentFacilities[${index}][image]`, facility.image);
      facility.allFacilities.forEach((row, rowIndex) => {
        formData.append(
          `studentFacilities[${index}][allFacilities][${rowIndex}][nameOfFacility]`,
          row.nameOfFacility
        );
        formData.append(
          `studentFacilities[${index}][allFacilities][${rowIndex}][count]`,
          row.count
        );
      });
    });
    axios
      .patch(`https://crm.internationaleducationoffice.co.uk/universities/${id}`, formData, config)
      .then((response) => {
        setPopupText("University Updated");
        setPopupshow(true);
        setTimeout(() => {
          setPopupshow(false);
          navigate("/universities");
        }, 2000);
        setErrorShow(false);
      })
      .catch((error) => {
        console.log(error.request.data);
        setErrorShow(true);
        setErrorMessage(error.request.data);
      });
  };

  const handleLogoImage = (event) => {
    setLogoImage(event.target.files[0]);
  };
  const handleBanner = (event) => {
    setBanner(event.target.files[0]);
  };
  const handlePersonImage = (event) => {
    setPersonImage(event.target.files[0]);
  };

  const handleFacilities = () => {
    // Check if the same name and nameOfFacility combination already exists
    const existingFacility = studentFacilities.find(
      (facility) =>
        facility.name === facilityName &&
        facility.allFacilities.find(
          (item) => item.nameOfFacility === nameOfFacility
        )
    );

    if (existingFacility) {
      // Show error message or handle duplicate entry
      alert("Duplicate entry found.");
    } else {
      const updatedFacilities = [...studentFacilities];
      const existingFacilityIndex = updatedFacilities.findIndex(
        (facility) => facility.name === facilityName
      );

      if (existingFacilityIndex !== -1) {
        const existingFacilities =
          updatedFacilities[existingFacilityIndex].allFacilities;
        const newFacilities = facilityData.filter(
          ({ nameOfFacility }) =>
            !existingFacilities.some(
              (item) => item.nameOfFacility === nameOfFacility
            )
        );

        updatedFacilities[existingFacilityIndex].allFacilities.push(
          ...newFacilities.map(({ nameOfFacility, count }) => ({
            nameOfFacility,
            count,
          }))
        );
      } else {
        // Add a new entry if the name doesn't exist
        updatedFacilities.push({
          name: facilityName,
          allFacilities: facilityData.map(({ nameOfFacility, count }) => ({
            nameOfFacility,
            count,
          })),
        });
      }

      setStudentFacilities(updatedFacilities);
      setFacilityData([]);
      setFacilityName("");
    }
  };

  const AddFacilityData = () => {
    setFacilityData([...facilityData, { nameOfFacility, count }]);
  };

  const handleDeleteFacility1 = (nameOfFacility) => {
    setFacilityData(
      facilityData.filter((row) => row.nameOfFacility !== nameOfFacility)
    );
  };

  const handleDeleteFixedFaciltiy = (name) => {
    setStudentFacilities(studentFacilities.filter((row) => row.name !== name));
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div style={{ margin: 40 }}>
          <h2 className="heading-top text-dark fw-bold">
            <a href="/universities" style={{color: "black"}}> Universities </a>
            &gt; Update University
          </h2>
          {popUpShow ? (
            <PopupAlert popUpText={popUpText} backgroundColor={"#FFC300"} />
          ) : (
            ""
          )}
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit}
          >
            {/*Name*/}

            <h5 className="mt-3 fw-bold">University Name</h5>
            <select
              className="input-programs"
              value={universityName}
              onChange={(e) => {
                setName(e.target.value);
              }}
            >
              <option value=""></option>
              {allUniversities.map((row, index) => (
                <option key={index} value={row.name}>
                  {row.name}
                </option>
              ))}
            </select>

            {/* Type*/}
            <h4></h4>
            <h5 className="mt-3 fw-bold">Program Type</h5>
            <select
              className="input-programs"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value=""></option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>

            <h5 className="mt-3 fw-bold">Country</h5>
            <select
              style={{ width: "40%", height: 70 }}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value=""></option>
              {allCountries.map((row) => (
                <option value={row._id} key={row._id}>
                  {row.name}
                </option>
              ))}
            </select>

            <h5 className="mt-3 fw-bold">City</h5>
            <select
              style={{ width: "40%", height: 70 }}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value=""></option>
              {allCities.map((row) => (
                <option value={row._id} key={row._id}>
                  {row.name}
                </option>
              ))}
            </select>
            {/*Logo Image*/}
            <h4 className="mt-2">Logo Image</h4>
            <input
              type="file"
              id="myFile"
              accept=".png, .jpg, .jpeg .jfif"
              name="myFile"
              className="input-country form-control"
              onChange={handleLogoImage}
              style={{ marginTop: 10, marginBottom: 10, width: "600px" }}
            />
            {/*Banner Image*/}
            <h4>Banner Image</h4>
            <input
              type="file"
              id="myFile"
              accept=".png, .jpg, .jpeg .jfif"
              name="myFile"
              className="input-country form-control"
              onChange={handleBanner}
              style={{ marginTop: 10, marginBottom: 10, width: "600px" }}
            />
            {/*location*/}
            <h4>Location</h4>
            <ReactQuill
              className="input-programs"
              value={location}
              onChange={(value) => setLocation(value)}
            />

            {/*What uni says*/}
            <h4 className="fw-bold">What Uni Says</h4>
            <h5 className="pt-2">Person Name</h5>
            <input
              type="text"
              className="input-programs"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
            />
            <h5>Person Image</h5>
            <input
              type="file"
              id="myFile"
              accept=".png, .jpg, .jpeg"
              name="myFile"
              className="input-country form-control"
              onChange={handlePersonImage}
              style={{ marginTop: 10, marginBottom: 10, width: "600px" }}
            />

            <h5>Position</h5>
            <input
              type="text"
              className="input-programs"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <h5>Message</h5>
            <ReactQuill
              className="input-programs"
              value={message}
              onChange={(value) => setMessage(value)}
            />
            {/*Admission requirements*/}
            <h4>Program's admission requirements</h4>

            <ReactQuill
              value={admissionRequirements}
              className="input-programs"
              onChange={(value) => setAdmissionRequirements(value)}
            />
            {/*Fees and funding*/}
            <h4>Fees and funding</h4>

            <ReactQuill
              value={feesAndfunding}
              className="input-programs"
              onChange={(value) => setFeesAndFundings(value)}
            />
            {/*Why study here*/}
            <h4>Why study here</h4>
            <ReactQuill
              value={whyStudyHere}
              className="input-programs"
              onChange={(value) => setWhyStudyHere(value)}
            />
            {/*Visa*/}
            <h4>Visa requirement description</h4>
            <ReactQuill
              value={studentVisa}
              className="input-programs"
              onChange={(value) => setStudentVisa(value)}
            />
            {/*Study Abroad Description*/}
            <h4>Study Abroad Description</h4>
            <ReactQuill
              value={studyAbroadDescription}
              className="input-programs"
              onChange={(value) => setStudyAbroadDescription(value)}
            />
            {/*lifeOfInternationalStudents*/}
            <h4>Life Of International Students</h4>
            <ReactQuill
              value={lifeOfInternationalStudents}
              className="input-programs"
              onChange={(value) => setLifeOfInternationlStudents(value)}
            />
            {/*Nationalities*/}
            <h5>No. of Nationalities</h5>
            <input
              type="text"
              className="input-programs"
              value={nationalities}
              onChange={(e) => setNationalities(e.target.value)}
            />
            {/*International Students*/}
            <h5>No. of International Students</h5>
            <input
              type="text"
              className="input-programs"
              value={internationalStudents}
              onChange={(e) => setInternationalStudents(e.target.value)}
            />
            {/*Student Facilities*/}
            <h4>Student Facilities</h4>
            <select
              className="input-programs"
              value={facilityName}
              onChange={(e) => {
                const selectedFacility = allFacilities.find(
                  (facility) => facility._id === e.target.value
                );
                setFacilityName(e.target.value);
                setFacilitiesData(selectedFacility.allFacilities);
              }}
            >
              <option value=""></option>
              {allFacilities.map((row, index) => (
                <option key={index} value={row._id}>
                  {row.name}
                </option>
              ))}
            </select>

            <p>{facilityName}</p>
            {facilityName !== "" ? (
              <div className="splash-uni allPrograms">
                <select
                  value={nameOfFacility}
                  className="input-programs"
                  onChange={(e) => setnameOfFacility(e.target.value)}
                >
                  <option value=""></option>
                  {facilitiesData.map((row, index) => (
                    <option value={row} key={index}>
                      {row}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />
                <div
                  onClick={AddFacilityData}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "purple",
                    color: "white",
                    padding: 5,
                    width: 50,
                    textAlign: "center",
                  }}
                >
                  Add
                </div>
              </div>
            ) : (
              ""
            )}
            {facilityData.map((row) => (
              <div className="allPrograms splash-uni">
                <p className="dataProgram">{row.nameOfFacility}</p>
                <div style={{ display: "flex" }}>
                  <p className="dataProgram">{row.count}</p>
                  <div
                    style={{ cursor: "pointer", marginLeft: 20 }}
                    onClick={() => handleDeleteFacility1(row.nameOfFacility)}
                  >
                    <RxCross1 size={18} />
                  </div>
                </div>
              </div>
            ))}

            {facilityData.length > 0 ? (
              <div
                style={{
                  cursor: "pointer",
                  backgroundColor: "purple",
                  color: "white",
                  padding: 5,
                  width: 50,
                  textAlign: "center",
                }}
                onClick={handleFacilities}
              >
                Done
              </div>
            ) : (
              ""
            )}

            {studentFacilities.map((row) => {
              return (
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "40%",
                    }}
                  >
                    <h4>{row.name}</h4>
                    <div
                      style={{ cursor: "pointer", marginLeft: 20 }}
                      onClick={() => handleDeleteFixedFaciltiy(row.name)}
                    >
                      <RxCross1 size={18} />
                    </div>
                  </div>

                  {row.allFacilities.map((item) => {
                    return (
                      <div className="allPrograms splash-uni">
                        <p>{item.nameOfFacility}</p>
                        {item.count !== undefined &&
                        item.count !== "undefined" ? (
                          <p>{item.count}</p>
                        ) : (
                          <p></p>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/*Error message*/}
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

export default Updateuniversity;
