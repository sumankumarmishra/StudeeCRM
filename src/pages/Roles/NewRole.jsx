import "../../style/datatable.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import "../Members/members.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "../Roles/roles.css";
import { useNavigate } from "react-router-dom";

const NewRole = ({ title }) => {
  const [name, setName] = useState("");
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [policy, setPolicy] = useState([]);
  const [createField, setCreateField] = useState(true);
  const [updateField, setUpdateField] = useState(true);
  const [documentField, setDocumentField] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [filteredPolicies, setFilteredPolicies] = useState([]); // State to hold filtered policies
  const [emailField, setEmailField] = useState(true);
  const [fields, setFields] = useState([]);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const filtered = policy.filter((policyObj) =>
      policyObj.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPolicies(filtered);
  }, [policy, searchTerm]);

  useEffect(() => {
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/applications/keys",
        config
      )
      .then((response) => {
        setFields(response.data);
        const newPolicies = response.data.map((row) => ({
          name: row.key,
          type: row.type,
          label:
            row.key === "notes"
              ? "Remarks"
              : row.key === "status"
              ? "Admission Status"
              : row.label,
          create: true,
          read: true,
          update: true,
          notification: false,
        }));
        setPolicy(newPolicies);
      })
      .catch((error) => {});

    axios
      .get("https://crm.internationaleducationoffice.co.uk/pages", config)
      .then((response) => {
        setPages(response.data);
        const newPages = response.data.map((row) => ({
          name: row.name,
          id: row._id,
          show: true,
        }));
        setPage(newPages);
      })
      .catch((error) => {});
  }, []);

  const handleCheckboxPolicies = (index, field) => (event) => {
    const newPolicies = [...policy];
    newPolicies[index][field] = event.target.checked;
    setPolicy(newPolicies);
    setFilteredPolicies(newPolicies);
  };
  const handleCheckboxPage = (index, field) => (event) => {
    const newPages = [...page];
    newPages[index][field] = event.target.checked;
    setPage(newPages);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Add member
  const handleSubmit = (e) => {
    e.preventDefault();

    const transformedPolicy = [];
    policy.forEach((policyObj) => {
      if (policyObj.type === "Date") {
        transformedPolicy.push({
          name: `${policyObj.name}`,
          type: "Date",
          create: policyObj.create,
          notification: policyObj.notification,
          update: policyObj.update,
          read: policyObj.read,
        });
      } else {
        transformedPolicy.push(policyObj);
      }
    });

    const data = {
      name: name,
      policy: transformedPolicy,
      page: page,
      table: { createField, updateField, documentField, emailField },
    };

    axios
      .post(
        "https://crm.internationaleducationoffice.co.uk/roles",
        data,
        config
      )
      .then((response) => {
        setName("");
        setPolicy([]);
        const newPolicies = fields.map((row) => ({
          name: row.key,
          type: row.type,
          label: row.label,
          create: false,
          notification: false,
          read: false,
          update: false,
        }));
        setPolicy(newPolicies);
        const newPages = pages.map((row) => ({
          name: row.name,
          show: false,
          id: row._id,
        }));
        setPage(newPages);
        setPopupshow(true);
        setPopupText(`Role Added`);
        setTimeout(() => {
          setPopupshow(false);
          navigate("/roles");
        }, 800);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          alert(error.response.data);
        }
      });
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
            <a href="/roles" style={{ color: "black" }}>
              Roles{" "}
            </a>
            &gt; Add Role
          </h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit} className="form-new">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <p style={{ color: "red", fontSize: 20 }}>{errorMessage}</p>
                <div className="form-group ms-4">
                  <label htmlFor="name" className="fw-bold pb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: "400px" }}
                  />
                </div>

                <div
                  className="form-group"
                  style={{
                    margin: 20,
                    width: "100%",
                  }}
                >
                  <div className="row">
                    <div className="">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">
                              {" "}
                              <h3>Table Permissions</h3>
                            </th>
                            <th scope="col">
                              <label className="form-check-label">Create</label>
                            </th>
                            <th scope="col">
                              <label className="form-check-label">
                                Communication
                              </label>
                            </th>
                            <th scope="col">
                              <label className="form-check-label">Update</label>
                            </th>
                            <th scope="col">
                              <label className="form-check-label">
                                Document Upload
                              </label>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row"></th>
                            <td>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={createField}
                                  onChange={(e) =>
                                    setCreateField(e.target.checked)
                                  }
                                />
                                {/* <label className="form-check-label">Create</label> */}
                              </div>
                            </td>

                            <td>
                              {" "}
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={emailField}
                                  onChange={(e) =>
                                    setEmailField(e.target.checked)
                                  }
                                />
                                {/* <label className="form-check-label">Email</label> */}
                              </div>
                            </td>
                            <td>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={updateField}
                                  onChange={(e) =>
                                    setUpdateField(e.target.checked)
                                  }
                                />
                                {/* <label className="form-check-label">Update</label> */}
                              </div>
                            </td>
                            <td>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={documentField}
                                  onChange={(e) =>
                                    setDocumentField(e.target.checked)
                                  }
                                />
                                {/* <label className="form-check-label">Document Upload</label> */}
                              </div>
                            </td>
                          </tr>{" "}
                          {/* Add a search input field */}
                          <div className="form-group">
                            <h3 htmlFor="search" className="">
                              Search Policy
                            </h3>
                            <input
                              type="text"
                              id="search"
                              className="form-control"
                              placeholder="Search by Policy Name"
                              value={searchTerm}
                              onChange={handleSearchChange}
                              style={{ width: "400px" }}
                            />
                          </div>
                          <tr>
                            <th scope="row">
                              <h3 className="pt-2">Field Permissions</h3>
                            </th>
                            <th scope="col">
                              <label className="form-check-label pt-4">
                                Create
                              </label>
                            </th>
                            <th scope="col">
                              <label className="form-check-label pt-4">
                                Read
                              </label>
                            </th>
                            <th scope="col">
                              <label className="form-check-label pt-4">
                                Update
                              </label>
                            </th>
                            <th scope="col">
                              <label className="form-check-label pt-4">
                                Notification
                              </label>
                            </th>
                          </tr>
                          {filteredPolicies.map((policy, index) => (
                            <tr key={index}>
                              {/* <div className="form-checks" key={index}> */}
                              <th scope="row">
                                <label className="form-check-label">
                                  {policy.label}
                                </label>
                              </th>

                              <th scope="col">
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={policy.create}
                                    onChange={handleCheckboxPolicies(
                                      index,
                                      "create"
                                    )}
                                  />
                                  {/* <label className="form-check-label">Create</label> */}
                                </div>
                              </th>

                              <th scope="col">
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={policy.read}
                                    onChange={handleCheckboxPolicies(
                                      index,
                                      "read"
                                    )}
                                  />
                                  {/* <label className="form-check-label">Read</label> */}
                                </div>
                              </th>

                              <th scope="col">
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={policy.update}
                                    onChange={handleCheckboxPolicies(
                                      index,
                                      "update"
                                    )}
                                  />
                                  {/* <label className="form-check-label">Update</label> */}
                                </div>
                              </th>

                              <th scope="col">
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={policy.notification}
                                    onChange={handleCheckboxPolicies(
                                      index,
                                      "notification"
                                    )}
                                  />
                                  {/* <label className="form-check-label">Notification</label> */}
                                </div>
                              </th>
                              {/* </div> */}
                            </tr>
                          ))}
                          <tr>
                            <th scope="row" className="pt-3">
                              <h4>Sidebar Page Permissions</h4>
                            </th>
                            <th scope="col" className="pt-4">
                              Shows
                            </th>
                          </tr>
                          {page.map((item, index) => (
                            <tr>
                              <th scope="col">
                                <label className="form-check-label">
                                  {item.name}
                                </label>
                              </th>
                              <th scope="col">
                                <div className="form-check" key={index}>
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={item.show}
                                    onChange={handleCheckboxPage(index, "show")}
                                  />
                                </div>
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* <h3>Table Permissions</h3>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={createField}
                      onChange={(e) => setCreateField(e.target.checked)}
                    />
                    <label className="form-check-label">Create</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={emailField}
                      onChange={(e) => setEmailField(e.target.checked)}
                    />
                    <label className="form-check-label">Email</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={updateField}
                      onChange={(e) => setUpdateField(e.target.checked)}
                    />
                    <label className="form-check-label">Update</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={documentField}
                      onChange={(e) => setDocumentField(e.target.checked)}
                    />
                    <label className="form-check-label">Document Upload</label>
                  </div>
                </div>

                <div
                  className="form-group"
                  style={{
                    margin: 20,
                    width: "500px",
                  }}
                > */}
                  {/* <h3>Field Permissions</h3>
                  {policy.map((policy, index) => (
                    <div className="form-check" key={index}>
                      <label className="form-check-label">{policy.name}</label>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={policy.create}
                          onChange={handleCheckboxPolicies(index, "create")}
                        />
                        <label className="form-check-label">Create</label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={policy.read}
                          onChange={handleCheckboxPolicies(index, "read")}
                        />
                        <label className="form-check-label">Read</label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={policy.update}
                          onChange={handleCheckboxPolicies(index, "update")}
                        />
                        <label className="form-check-label">Update</label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={policy.notification}
                          onChange={handleCheckboxPolicies(
                            index,
                            "notification"
                          )}
                        />
                        <label className="form-check-label">Notification</label>
                      </div>
                    </div>
                  ))} */}
                </div>
                <div
                  className="form-group"
                  style={{
                    margin: 20,
                    width: "500px",
                  }}
                >
                  {/* <h4>Sidebar Page Permissions</h4>
                  {page.map((item, index) => (
                    <div className="form-check" key={index}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={item.show}
                        onChange={handleCheckboxPage(index, "show")}
                      />
                      <label className="form-check-label">{item.name}</label>
                    </div>
                  ))} */}
                </div>
                <div className="form-group ms-3 pb-5">
                  <button type="submit" className="btn btn-primary py-2 px-4">
                    Save Role
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRole;
