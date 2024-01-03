import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const FilterApplication = ({
  config,
  condition,
  setApplications,
  setOpenFilterModal,
  // setItemsPerPage,
  // setTotalCount,
  setFilter,
}) => {
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [label, setLabel] = useState("");
  const [dateValue, setDateValue] = useState({});
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [type, setType] = useState("");
  const [data, setData] = useState({});
  const [placeholder, setPlaceHolder] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [keys, setKeys] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [campus, setCampus] = useState("");
  const [campuses, setCampuses] = useState([]);
  const [filteredCampuses, setFilteredCampuses] = useState([]);
  const [nationality, setNationality] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [universities, setUniversities] = useState([]);
  const [universityId, setUniversity] = useState("");
  const [members, setMembers] = useState([]);
  const [case_owner, setCaseOwner] = useState("");
  const [current_desk, setCurrentDesk] = useState("");

  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const id = localStorage.getItem("id");

  const [status, setStatus] = useState("");

  const date = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  useEffect(() => {
    // axios
    //   .get("https://crm.internationaleducationoffice.co.uk/universities", config)
    //   .then((response) => {
    //     setUniversities(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // axios
    //   .get("https://crm.internationaleducationoffice.co.uk/campus", config)
    //   .then((response) => {
    //     setCampuses(response.data);
    //     setFilteredCampuses(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // axios
    //   .get("https://crm.internationaleducationoffice.co.uk/members", config)
    //   .then((response) => {
    //     setMembers(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // axios
    //   .get("https://crm.internationaleducationoffice.co.uk/core-settings/lead-status", config)
    //   .then((response) => {
    //     setStatuses(response.data.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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

    const sessionStorage = localStorage.getItem(`filteredKeys${id}`);
    const userGet = JSON.parse(sessionStorage);
    console.log(userGet);
    setKeys(userGet || []);
    // axios
    //   .get("https://crm.internationaleducationoffice.co.uk/applications/filtered_keys", config)
    //   .then((response) => {
    //     setKeys(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  function formatLabel(key) {
    if (!key) {
      return "";
    }

    const formatted = key
      .replace(/([a-z])([A-Z])/g, "$1 $2") // add space before capital letters
      .replace(/_/g, " ") // replace underscores with spaces
      .toLowerCase(); // convert the string to lowercase

    switch (key.toLowerCase()) {
      case "firstname":
        return "First name";
      case "lastname":
        return "Last name";
      case "startmonth":
        return "Session month";
      case "startyear":
        return "Session year";
      case "programtype":
        return "Degree type";
      case "cgpa":
        return "CGPA";
      case "lastname":
        return "Last name";
      case "programid":
        return "Program";
      case "universityid":
        return "University";
      default:
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const updatedData = { ...data };

    axios
      .post(
        "https://crm.internationaleducationoffice.co.uk/applications/search_applications",
        { filterObject: updatedData, condition: condition, id: id },
        config
      )
      .then((response) => {
        setApplications(response.data);
        // setTotalCount(response.data.length);
        // setItemsPerPage(response.data.length);
        setOpenFilterModal(false);
        setFilter(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    console.log("Type:", type);

    if (key && type && value && type !== "Date") {
      console.log("Handling non-Date input");
      setData({ ...data, [key]: value });
    }
    if (key && type && type === "Date") {
      console.log("Handling Date input");
      const updatedData = {
        ...data,
        [`${key}Date`]: dateValue[`${key}Date`],
        [`${key}Month`]: dateValue[`${key}Month`],
        [`${key}Year`]: dateValue[`${key}Year`],
      };
      console.log("Updated Data:", updatedData);
      setData(updatedData);
    }
  };

  const handleRemoveEntry = (keyToRemove) => {
    const updatedData = { ...data };
    delete updatedData[keyToRemove];
    setData(updatedData);
  };

  return (
    <div>
      <Form style={{ margin: "" }}>
        <Form.Group>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              marginBottom: "20px",
              justifyContent: "space-evenly",
            }}
          >
            <div className="row pt-2">
              <h6 style={{}} className="pt-3 fw-bold">
                Choose field
              </h6>
            </div>
            <Form.Control
              className="mt-3"
              style={{ width: "300px" }}
              as="select"
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                const filterKey = keys.find(
                  (row) => row.key === e.target.value
                );
                setLabel(filterKey.label);
                setType(filterKey.type);
                setPlaceHolder(filterKey.placeholder);
                setOptions(filterKey.options);
              }}
            >
              <option value="">Select key</option>
              {keys.map((row, index) => (
                <option value={row.key} key={index}>
                  {row.label === "Status" ? "Admission Status" : row.label}
                </option>
              ))}
            </Form.Control>
            <Button onClick={handleAdd} className="mt-3">
              Add
            </Button>
          </div>
        </Form.Group>
        {key && type && (type === "String" || type === "Number") && (
          <Form.Group>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h6
                style={{ margin: "0px 20px", width: "100px" }}
                className="pt-2 fw-bold"
              >
                {label === "Status" ? "Admission Status" : label}
              </h6>
              <Form.Control
                className="mt-3"
                style={{ width: "300px" }}
                type={type === "String" ? "text" : "number"}
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </div>
          </Form.Group>
        )}
        {key && type && type === "Dropdown" && (
          <Form.Group>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h6
                style={{ margin: "0px 20px", width: "100px" }}
                className="pt-2 fw-bold"
              >
                {label === "Status" ? "Admission Status" : label}
              </h6>
              <Form.Control
                as="select"
                className="mt-3"
                style={{ height: "40px", width: "30%" }}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              >
                <option value="">
                  Select {label === "Status" ? "Admission Status" : label}
                </option>
                {options.map((option, index) => {
                  console.log(options);
                  return (
                    <option
                      value={
                        key === "case_owner_name" || key === "current_desk_name"
                          ? option.username
                          : key === "university_name"
                          ? option.universityName
                          : option.name
                      }
                      key={index}
                    >
                      {key === "case_owner_name" || key === "current_desk_name"
                        ? option.username
                        : key === "university_name"
                        ? option.universityName
                        : option.name}
                    </option>
                  );
                })}
              </Form.Control>{" "}
            </div>
          </Form.Group>
        )}

        {key && type && type === "Date" && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <h6
              style={{ margin: "0px 20px", width: "100px" }}
              className="pt-2 fw-bold"
            >
              {label}
            </h6>
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
                  value={dateValue[`${key}Date`] || ""}
                  onChange={(e) => {
                    setDateValue({
                      ...dateValue,
                      [`${key}Date`]: e.target.value,
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
                  value={dateValue[`${key}Month`] || ""}
                  onChange={(e) => {
                    setDateValue({
                      ...dateValue,
                      [`${key}Month`]: e.target.value,
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
                  value={dateValue[`${key}Year`] || ""}
                  onChange={(e) => {
                    setDateValue({
                      ...dateValue,
                      [`${key}Year`]: e.target.value,
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
      </Form>
      <Form>
        <ul>
          {Object.entries(data).map(([key, value], index) => {
            const filterKey = formatLabel(key);
            return (
              <li
                key={index}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <p>
                  <strong>
                    {filterKey}:{"     "}
                  </strong>

                  <span>{value}</span>
                </p>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRemoveEntry(key)}
                >
                  X
                </p>
              </li>
            );
          })}
        </ul>{" "}
        <Button
          onClick={handleSearch}
          disabled={Object.keys(data).length === 0}
        >
          Search
        </Button>
      </Form>
      {/* <Form style={{ margin: "" }} onSubmit={handleSearch}>
        <Form.Group>
          {keys.map((row, index) => (
            <div style={{ display: "flex", alignItems: "center" }} key={index}>
              <h6
                style={{ margin: "0px 20px", width: "100px" }}
                className="pt-2 fw-bold"
              >
                {row.label}
              </h6>
              {row.key === "firstname" ||
              row.key === "email" ||
              row.key === "city" ||
              row.key === "province" ||
              row.key === "nationality" ||
              row.key === "phoneNo" ||
              row.key === "lastname" ? (
                <Form.Control
                  className="mt-3"
                  style={{ width: "300px" }}
                  type="text"
                  placeholder={row.placeholder}
                  value={
                    row.key === "firstname"
                      ? firstname
                      : row.key === "lastname"
                      ? lastname
                      : row.key === "email"
                      ? email
                      : row.key === "city"
                      ? city
                      : row.key === "province"
                      ? province
                      : row.key === "nationality"
                      ? nationality
                      : phoneNo
                  }
                  onChange={(e) => {
                    if (row.key === "firstname") {
                      setFirstname(e.target.value);
                    } else if (row.key === "lastname") {
                      setLastname(e.target.value);
                    } else if (row.key === "email") {
                      setEmail(e.target.value);
                    } else if (row.key === "city") {
                      setCity(e.target.value);
                    } else if (row.key === "province") {
                      setProvince(e.target.value);
                    } else if (row.key === "nationality") {
                      setNationality(e.target.value);
                    } else if (row.key === "phoneNo") {
                      setPhoneNo(e.target.value);
                    }
                  }}
                />
              ) : row.key === "universityId" ? (
                <Form.Control
                  className="mt-3"
                  style={{ width: "300px" }}
                  as="select"
                  value={universityId}
                  onChange={(e) => {
                    setUniversity(e.target.value);
                  }}
                >
                  <option value="">Select university</option>
                  {universities.map((row, index) => (
                    <option value={row.universityName} key={index}>
                      {row.universityName}
                    </option>
                  ))}
                </Form.Control>
              ) : row.key === "campus" ? (
                <Form.Control
                  className="mt-3"
                  style={{ width: "300px" }}
                  as="select"
                  value={campus}
                  onChange={(e) => {
                    setCampus(e.target.value);
                  }}
                >
                  <option value="">Select campus</option>
                  {campuses.map((row, index) => (
                    <option value={row.name} key={index}>
                      {row.name}
                    </option>
                  ))}
                </Form.Control>
              ) : row.key === "status" ? (
                <Form.Control
                  style={{ width: "300px" }}
                  className="mt-3"
                  as="select"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <option value="">Select status</option>
                  {statuses.map((row, index) => (
                    <option value={row.name} key={index}>
                      {row.name}
                    </option>
                  ))}
                </Form.Control>
              ) : row.key === "current_desk" || row.key === "case_owner" ? (
                <Form.Control
                  className="mt-3"
                  style={{ width: "300px" }}
                  as="select"
                  value={row.key === "current_desk" ? current_desk : case_owner}
                  onChange={(e) => {
                    if (row.key === "current_desk") {
                      setCurrentDesk(e.target.value);
                    } else {
                      setCaseOwner(e.target.value);
                    }
                  }}
                >
                  <option value="">Select {row.key}</option>
                  {members.map((row, index) => (
                    <option value={row.username} key={index}>
                      {row.username} - {row.role.name}
                    </option>
                  ))}
                </Form.Control>
              ) : (
                ""
              )}
            </div>
          ))}
        </Form.Group>
        <Button
          variant="btn btn-primary green_bg_logo"
          type="submit"
          className="px-4 mt-3 ms-2 py-2"
        >
          Submit
        </Button>
      </Form> */}
    </div>
  );
};

export default FilterApplication;
