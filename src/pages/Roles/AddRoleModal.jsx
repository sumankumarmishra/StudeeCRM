import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import { useNavigate } from "react-router-dom";

const AddRoleModal = () => {
  const [name, setName] = useState("");
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [policy, setPolicy] = useState([]);
  const [createField, setCreateField] = useState(true);
  const [updateField, setUpdateField] = useState(true);
  const [documentField, setDocumentField] = useState(true);
  const [emailField, setEmailField] = useState(true);
  const [fields, setFields] = useState([]);
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get("https://crm.internationaleducationoffice.co.uk/applications/keys", config)
      .then((response) => {
        setFields(response.data);
        const newPolicies = response.data.map((row) => ({
          name: row.key,
          type: row.type,
          create: true,
          read: true,
          update: true,
          notification: true,
        }));
        setPolicy(newPolicies);
      })
      .catch((error) => { });

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
      .catch((error) => { });
  }, []);

  const handleCheckboxPolicies = (index, field) => (event) => {
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

    const transformedPolicy = [];
    policy.forEach((policyObj) => {
      if (policyObj.type === "Date") {
        transformedPolicy.push(
          {
            name: `${policyObj.name}`,
            type: "Date",
            create: policyObj.create,
            update: policyObj.update,
            read: policyObj.read,
            notification: policyObj.notification,
          },
          {
            name: `${policyObj.name}Date`,
            type: "String",
            create: policyObj.create,
            update: policyObj.update,
            read: policyObj.read,
            notification: policyObj.notification,
          },
          {
            name: `${policyObj.name}Month`,
            type: "String",
            create: policyObj.create,
            update: policyObj.update,
            read: policyObj.read,
            notification: policyObj.notification,
          },
          {
            name: `${policyObj.name}Year`,
            type: "String",
            create: policyObj.create,
            update: policyObj.update,
            read: policyObj.read,
            notification: policyObj.notification,
          }
        );
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
      .post("https://crm.internationaleducationoffice.co.uk/roles", data, config)
      .then((response) => {
        setName("");
        setPolicy([]);
        const newPolicies = fields.map((row) => ({
          name: row.key,
          type: row.type,
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
        if (error.response.data) {
          alert(error.response.data);
        }
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              {popUpShow ? (
                <PopupAlert popUpText={popUpText} backgroundColor={"#8AFF8A"} />
              ) : null}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="fw-bold pb-2">Name</label>
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

                <div className="form-group">
                  <label>Table Permissions</label>
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

                <div className="form-group">
                  <label>Field Permissions</label>
                  {policy.map((policy, index) => {
                    console.log(index);
                    return (
                      <div className="form-check" key={index}>
                        <label className="form-check-label">
                          {policy.name}
                        </label>
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
                          <label className="form-check-label">
                            Notification
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="form-group">
                  <label>Sidebar Page Permissions</label>
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
                  ))}
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Save Role
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoleModal;
