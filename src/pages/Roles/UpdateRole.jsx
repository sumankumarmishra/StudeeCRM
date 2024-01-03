import "../../style/datatable.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import "../Members/members.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "../Roles/roles.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UpdateRole = ({ title }) => {
  const location = useLocation();
  const { id } = useParams();
  const data = location.state.data;
  const [name, setName] = useState(data.name);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [policy, setPolicy] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [filteredPolicies, setFilteredPolicies] = useState([]); // State to hold filtered policies
  const [createField, setCreateField] = useState(data.table.createField);
  const [updateField, setUpdateField] = useState(data.table.updateField);
  const [documentField, setDocumentField] = useState(data.table.documentField);
  const [emailField, setEmailField] = useState(data.table.emailField);
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
        const apiPolicies = response.data.map((row) => ({
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

        const updatedPolicies = data.policy.map((memberPolicy) => {
          const matchingApiPolicy = apiPolicies.find(
            (apiPolicy) => apiPolicy.name === memberPolicy.name
          );

          if (matchingApiPolicy) {
            // Update existing memberPolicy
            return {
              ...memberPolicy,
              label:
                matchingApiPolicy.name === "notes"
                  ? "Remarks"
                  : matchingApiPolicy.label,
              // Update other fields if needed
            };
          }

          // Preserve memberPolicy as is
          return memberPolicy;
        });

        // Create a mapping of policy names to their original indices in response.data
        const policyIndexMap = {};
        response.data.forEach((policy, index) => {
          policyIndexMap[policy.key] = index;
        });

        // Insert new policies at their original positions
        apiPolicies.forEach((apiPolicy) => {
          const existingIndex = updatedPolicies.findIndex(
            (updatedPolicy) => updatedPolicy.name === apiPolicy.name
          );

          if (existingIndex === -1) {
            // Policy not found, insert it at the original position
            const originalIndex = policyIndexMap[apiPolicy.name];

            if (originalIndex !== undefined) {
              updatedPolicies.splice(originalIndex, 0, {
                name: apiPolicy.name,
                type: apiPolicy.type,
                label: apiPolicy.name === "notes" ? "Remarks" : apiPolicy.label,
                create: true,
                read: true,
                update: true,
                notification: false,
              });
            }
          }
        });

        setPolicy(updatedPolicies);

        // ...
      })
      .catch((error) => {});
    // axios
    //   .get(
    //     "https://crm.internationaleducationoffice.co.uk/applications/keys",
    //     config
    //   )
    //   .then((response) => {
    //     let apiPolicies;
    //     let memberPolicies = data.policy;
    //     apiPolicies = response.data.map((row) => ({
    //       name: row.key,
    //       type: row.type,
    //       label: row.label,
    //       create: true,
    //       read: true,
    //       update: true,
    //       notification: false,
    //     }));

    //     memberPolicies.forEach((memberPolicy) => {
    //       const matchingApiPolicy = apiPolicies.find(
    //         (apiPolicy) => apiPolicy.name === memberPolicy.name
    //       );
    //       if (matchingApiPolicy) {
    //         memberPolicy.label = matchingApiPolicy.label;
    //       }
    //     });

    //     // Compare the API pages with member.policy
    //     const newPolicy = apiPolicies.filter((apiPage) => {
    //       return !memberPolicies.some(
    //         (memberPolicy) => memberPolicy.name === apiPage.name
    //       );
    //     });

    //     // Push the new pages to member.policy
    //     memberPolicies.push(...newPolicy);

    //     const filteredMembers = memberPolicies.filter(
    //       (row) => row.label !== undefined
    //     );
    //     setPolicy(filteredMembers);

    //     // ...
    //   })
    //   .catch((error) => {});
    axios
      .get("https://crm.internationaleducationoffice.co.uk/pages", config)
      .then((response) => {
        let apiPages;
        if (data.name === "superadmin") {
          apiPages = response.data.map((row) => ({
            name: row.name,
            id: row._id,
            show: true,
          }));
        } else {
          apiPages = response.data.map((row) => ({
            name: row.name,
            id: row._id,
            show: false,
          }));
        }
        // Compare the API pages with member.page
        const newPages = apiPages.filter((apiPage) => {
          return !data.page.some((memberPage) => memberPage.id === apiPage.id);
        });
        // Push the new pages to member.page
        data.page.push(...newPages);

        // Update the page state
        setPage(data.page);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxPolicies = (index, field, type) => (event) => {
    const newPolicies = [...policy];
    newPolicies[index][field] = event.target.checked;
    setPolicy(newPolicies);
  };

  const handleCheckboxPage = (index, field) => (event) => {
    const newPages = [...page];
    newPages[index][field] = event.target.checked;
    setPage(newPages);
  };

  // Add member
  const handleSubmit = (e) => {
    e.preventDefault();
    const filterPolicy = policy.filter((row) => row.label !== undefined);

    const data = {
      name: name,
      policy: filterPolicy,
      page: page,
      table: { createField, updateField, documentField, emailField },
    };

    axios
      .put(
        `https://crm.internationaleducationoffice.co.uk/roles/${id}`,
        data,
        config
      )
      .then((response) => {
        setName("");
        const newPolicies = fields.map((row) => ({
          name: row,
          read: false,
          update: false,
          create: false,
          notification: false,
        }));
        setPolicy(newPolicies);
        const newPages = pages.map((row) => ({
          name: row.name,
          show: false,
        }));
        setPage(newPages);
        setPopupshow(true);
        setPopupText(`Role Updated`);
        setTimeout(() => {
          setPopupshow(false);
          navigate("/roles");
        }, 800);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
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
          <PopupAlert popUpText={popUpText} backgroundColor={"orange"} />
        ) : (
          ""
        )}
        <div className="top-new">
          <h1 className="heading-top fw-bold text-dark ps-3">
            {" "}
            <h1 className="heading-top text-dark ps-3 fw-bold">
              <a href="/roles" style={{ color: "black" }}>
                Roles{" "}
              </a>
              &gt; Update Role
            </h1>
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
                    readOnly={
                      name === "sub-agent" ||
                      name === "superadmin" ||
                      name === "Agent Admission"
                        ? true
                        : false
                    }
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
                  <div className="px-3 pb-3">
                    <table class="table">
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
                            {" "}
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
                        </tr>
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
                            <th scope="row">
                              <label className="form-check-label">
                                {policy.label}
                              </label>
                            </th>

                            <td>
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
                            </td>
                            <td>
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
                            </td>
                            <td>
                              {" "}
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
                            </td>
                            <td>
                              {" "}
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
                            </td>
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
                          <tr key={index}>
                            <th scope="row" className="pt-3">
                              <label className="form-check-label">
                                {item.name}
                              </label>
                            </th>
                            <th scope="col" className="pt-4">
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={item.show}
                                  onChange={handleCheckboxPage(index, "show")}
                                />
                                {/* <label className="form-check-label">{item.name}</label> */}
                              </div>
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                >
                  <h3>Field Permissions</h3>
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
                  ))}
                </div>
                <div
                  className="form-group"
                  style={{
                    margin: 20,
                    width: "500px",
                  }}
                >
                  <h4>Sidebar Page Permissions</h4>
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
                <div className="form-group ms-4 mb-2">
                  <button type="submit" className="btn btn-primary">
                    Update Role
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

export default UpdateRole;
