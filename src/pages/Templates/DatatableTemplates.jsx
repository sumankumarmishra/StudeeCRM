import "../../style/datatable.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import "../Members/members.css";

import { IoAddCircleSharp } from "react-icons/io5";
import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";
import SureModal from "../../components/SureModel/SureModal";
import NewTemplate from "./NewTemplate";

const DatatableTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [popUpShow, setPopupshow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [popUpColor, setPopupColor] = useState("green");
  const [popUpText, setPopupText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [target, setTarget] = useState("");
  const [sendTo, setSendTo] = useState("");
  const [time, setTime] = useState();
  const [medium, setMedium] = useState("");
  const [body, setBody] = useState("");
  const [university, setUniversity] = useState(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedRow, setSelectRow] = useState("");
  const [allMediums, setAllMediums] = useState([]);
  const [allUniversities, setAllUniversities] = useState([]);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("ieodkvToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState(templates);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [selectAll, setSelectAll] = useState(false);
  const [maxPagesToShow] = useState(10); // Set the maximum number of pages to show.

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBranches.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get("https://crm.internationaleducationoffice.co.uk/universities", config)
      .then((response) => {
        setAllUniversities(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://crm.internationaleducationoffice.co.uk/templates", config)
      .then((response) => {
        setTemplates(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://crm.internationaleducationoffice.co.uk/mediums", config)
      .then((response) => {
        setAllMediums(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [templates]);

  useEffect(() => {
    const filtered = templates.filter((template) =>
      Object.entries(template).some(([key, value]) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        if (key === "university" && typeof value === "object") {
          return value?.universityName
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }

        return false;
      })
    );
    setFilteredBranches(filtered);
  }, [searchQuery, templates]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // If not selected all, add all branch IDs to selectedRows
      const allBranchIds = filteredBranches.map((branch) => branch._id);
      setSelectedRows(allBranchIds);
    } else {
      // If already selected all, clear selectedRows
      setSelectedRows([]);
    }
  };

  const calculatePages = () => {
    const totalPages = Math.ceil(filteredBranches.length / itemsPerPage);
    const current = currentPage;
    const pages = [];
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (current <= maxPagesToShow - Math.floor(maxPagesToShow / 2)) {
        for (let i = 1; i <= maxPagesToShow; i++) {
          pages.push(i);
        }
      } else if (current >= totalPages - Math.floor(maxPagesToShow / 2)) {
        for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (
          let i = current - Math.floor(maxPagesToShow / 2);
          i <= current + Math.floor(maxPagesToShow / 2);
          i++
        ) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  // Function to handle navigation to the previous set of pages.
  const handlePreviousPages = () => {
    if (currentPage > maxPagesToShow) {
      setCurrentPage(currentPage - maxPagesToShow);
    }
  };

  // Function to handle navigation to the next set of pages.
  const handleNextPages = () => {
    const totalPages = Math.ceil(filteredBranches.length / itemsPerPage);
    if (currentPage + maxPagesToShow <= totalPages) {
      setCurrentPage(currentPage + maxPagesToShow);
    } else {
      setCurrentPage(totalPages);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  // Function to handle navigation to the last page.
  const handleLastPage = () => {
    const totalPages = Math.ceil(filteredBranches.length / itemsPerPage);
    setCurrentPage(totalPages);
  };

  // Add member
  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      body: body,
      medium: medium,
      university: university,
      target: target,
      sendTo: sendTo,
      message: message,
      type: type,
      subject: subject,
      time: time,
    };
    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/templates/${selectedRow}`,
        data,
        config
      )
      .then((response) => {
        setName("");
        setMedium("");
        setSubject("");
        setBody("");
        setTarget("");
        setSendTo("");
        setTime("");
        setPopupColor("orange");
        setSubject("");
        setType("");
        setMessage("");
        setUniversity("");
        setPopupshow(true);
        setPopupText(`Template Updated`);
        setOpenUpdateModal(false);
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 800);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          setErrorMessage(error.response.data);
        }
      });
  };

  const actions = (data) => {
    return (
      <div className="cellAction">
        <div
          onClick={() => {
            setOpenUpdateModal(true);
            setSelectRow(data._id);
            setName(data.name);
            setMedium(data.medium);
            setTime(data.time);
            setTarget(data.target);
            setSendTo(data.sendTo);
            setBody(data.body);
            setSubject(data.subject);
            setType(data.type);
            if (data.university) {
              setUniversity(data.university._id);
            }
            setMessage(data.message);
          }}
          className="btn btn-primary green_bg_logo"
        >
          Update
        </div>
        {role === "superadmin" ? (
          <div
            className="btn btn-danger"
            onClick={() => {
              setOpenModal(true);
              setSelectedRows([data._id]);
            }}
          >
            Delete
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };
  return (
    <div
      className="datatable"
      style={{ height: "850px", overflow: "hidden", overflowY: "scroll" }}
    >
      <div className="datatableTitle">
        <h1 className="text-black fw-bold">Templates ({templates.length})</h1>

        {/* <IoAddCircleSharp
          className="green_logo"
          style={{ cursor: "pointer" }}
          size={40}
          onClick={() => setOpenAddModal(true)}
        /> */}
        <button className="btn btn-primary" style={{ backgroundColor: "#2F9444", border: "none" }}
          onClick={() => setOpenAddModal(true)}

        >
          <i class="fa-solid fa-plus me-1"></i>Create Template</button>
      </div>
      <div className="search-bar">
        <input
          className="form-control p-2 mb-2"
          type="text"
          placeholder="Search Template"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {role === "superadmin" && selectedRows.length > 0 ? (
        <Button
          variant="danger"
          style={{ margin: "20px 0px" }}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Delete {selectedRows.length} Selected Rows
        </Button>
      ) : (
        ""
      )}

      {/*Add*/}
      <Modal
        show={openAddModal}
        onHide={() => {
          setOpenAddModal(false);
          setName("");
          setSelectRow("");
          setMedium("");
          setTarget("");
          setSendTo("");
          setBody("");
          setMessage("");
          setUniversity("");
          setType("");
          setTime();
          setSubject("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-black fw-bold">Add Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{ height: "600px", overflow: "hidden", overflowY: "scroll" }}
          >
            <NewTemplate
              setPopupColor={setPopupColor}
              setPopupText={setPopupText}
              setPopupshow={setPopupshow}
              config={config}
              setOpenAddModal={setOpenAddModal}
              allMediums={allMediums}
              allUniversities={allUniversities}
            />
          </div>
        </Modal.Body>
      </Modal>

      {/*Update*/}
      <Modal
        show={openUpdateModal}
        onHide={() => {
          setOpenUpdateModal(false);
          setName("");
          setSelectRow("");
          setMedium("");
          setBody("");
          setMessage("");
          setUniversity("");
          setType("");
          setTime();
          setSubject("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Update Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{ height: "600px", overflow: "hidden", overflowY: "scroll" }}
          >
            <Form onSubmit={handleUpdate} style={{ textAlign: "left" }}>
              <p style={{ color: "red", fontSize: 20 }}>{errorMessage}</p>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formCountry">
                <Form.Label>University</Form.Label>
                <Form.Control
                  as="select"
                  value={university}
                  onChange={(e) => {
                    setUniversity(e.target.value);
                  }}
                >
                  <option value="">Select university</option>
                  {allUniversities.map((row, index) => (
                    <option value={row._id} key={index}>
                      {row.universityName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formCountry">
                <Form.Label>Medium</Form.Label>
                <Form.Control
                  as="select"
                  value={medium}
                  required
                  onChange={(e) => {
                    setMedium(e.target.value);
                  }}
                >
                  <option value="">Select medium</option>
                  {allMediums.map((row, index) => (
                    <option value={row.name} key={index}>
                      {row.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>{" "}
              <Form.Group controlId="formCountry">
                <Form.Label className="pt-2">Send to</Form.Label>
                <Form.Control
                  as="select"
                  value={sendTo}
                  onChange={(e) => {
                    setSendTo(e.target.value);
                  }}
                  required
                >
                  <option value="">Select send to option</option>
                  <option value="Students">Students</option>
                  <option value="Staff">Staff</option>
                </Form.Control>
              </Form.Group>
              {sendTo === "Students" ? (
                <Form.Group controlId="formCountry">
                  <Form.Label className="pt-2">Target</Form.Label>
                  <Form.Control
                    as="select"
                    value={target}
                    onChange={(e) => {
                      setTarget(e.target.value);
                    }}
                  >
                    <option value="">Select target</option>
                    <option value="Website">Website Applications</option>
                    <option value="Form/Manual">Form Applications</option>
                  </Form.Control>
                </Form.Group>
              ) : (
                ""
              )}
              <Form.Group controlId="formCountry">
                <Form.Label>Select Reminder time</Form.Label>
                <Form.Control
                  as="select"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  required
                >
                  <option value=""></option>
                  <option value="Instant">Instant</option>
                  <option value="Reminder-1">Reminder 1</option>
                  <option value="Reminder-2">Reminder 2</option>
                </Form.Control>
              </Form.Group>
              {type === "Reminder-1" || type === "Reminder-2" ? (
                <Form.Group controlId="formCountry">
                  <Form.Label>Add time (per hour)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </Form.Group>
              ) : (
                ""
              )}
              {medium !== "SMS" ? (
                <>
                  <Form.Group controlId="formName">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      required={medium !== "SMS" ? true : false}
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formName">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      cols={10}
                      rows={10} // You can adjust the number of rows as needed
                      placeholder="Message"
                      value={message}
                      required={medium !== "SMS" ? true : false}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Form.Group>
                  <p dangerouslySetInnerHTML={{ __html: message }}></p>
                </>
              ) : (
                <Form.Group controlId="formName">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    cols={10}
                    rows={10} // You can adjust the number of rows as needed
                    placeholder="Message"
                    value={body}
                    required={medium === "SMS" ? true : false}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </Form.Group>
              )}
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>

      {/* Delete modal */}
      <Modal show={openModal} onHide={setOpenModal}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <SureModal
            url={"https://crm.internationaleducationoffice.co.uk/templates/"}
            ids={selectedRows}
            name={["Template", "Templates"]}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
            showText={""}
            setPopupColor={setPopupColor}
            setUpClose={setOpenModal}
            config={config}
          />
        </Modal.Body>
      </Modal>

      {popUpShow ? (
        <PopupAlert popUpText={popUpText} backgroundColor={popUpColor} />
      ) : (
        ""
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>S No.</th>
            <th>Name</th>
            <th>Medium</th>
            <th>Type</th>
            <th>Time</th>
            <th>Unversity</th>
            <th>Send To</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item._id)}
                  onChange={() => {
                    const updatedSelectedRows = [...selectedRows];
                    if (updatedSelectedRows.includes(item._id)) {
                      // If already selected, unselect it
                      const index = updatedSelectedRows.indexOf(item._id);
                      updatedSelectedRows.splice(index, 1);
                    } else {
                      // If not selected, select it
                      updatedSelectedRows.push(item._id);
                    }
                    setSelectedRows(updatedSelectedRows);
                  }}
                />
              </td>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.medium}</td>
              <td>{item.type}</td>
              <td>{item.time ? item.time : "-"}</td>
              <td>{item.university ? item.university?.universityName : "-"}</td>
              <td>{item.sendTo}</td>
              <td>{actions(item)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Pagination */}
      <div className="pagination-container">
        <Pagination>
          <Pagination.First onClick={handleFirstPage} />
          <Pagination.Prev onClick={handlePreviousPages} />
          {calculatePages().map((page, index) => (
            <Pagination.Item
              key={index}
              active={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={handleNextPages} />
          <Pagination.Last onClick={handleLastPage} />
        </Pagination>
      </div>
    </div>
  );
};

export default DatatableTemplates;
