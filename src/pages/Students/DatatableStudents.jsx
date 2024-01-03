import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import ReactQuill from "react-quill";
import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";
import SureModal from "../../components/SureModel/SureModal";
import EmailModel from "../MyCases/EmailModel";

const DatatableStudents = () => {
  const [students, setStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [popUpColor, setPopupColor] = useState("green");
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [subject, setSubject] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("ieodkvToken");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [rowId, setRowId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState(students);
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
      .get("https://crm.internationaleducationoffice.co.uk/students", config)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [students]);

  useEffect(() => {
    const filtered = students.filter((branch) =>
      Object.values(branch).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );
    setFilteredBranches(filtered);
  }, [searchQuery, students]);

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

  const handleEmail = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://crm.internationaleducationoffice.co.uk/students`,
        {
          email: selectedRow,
          subject: subject,
          htmlContent: htmlContent,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        setHtmlContent("");
        setOpenModal(false);
        setSubject("");
        setPopupColor("green");
        setPopupshow(true);
        setPopupText(`Email sent to ${selectedRow}`);
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/students/admin/${rowId}`,
        {
          firstname: firstname,
          password: password,
          lastname: lastname,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        setOpenUpdateModal(false);
        setPopupText("Student Updated");
        setPopupColor("orange");
        setPopupshow(true);
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBlock = (id) => {
    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/students/block/${id}`,
        {
          block: true,
        },
        config
      )
      .then((response) => {
        setStudents(response.data);

        setPopupColor("red");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUnblock = (id) => {
    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/students/block/${id}`,
        {
          block: false,
        },
        config
      )
      .then((response) => {
        setStudents(response.data);
        setPopupColor("green");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const actions = (data) => {
    return (
      <div className="cellAction">
        <div
          className="btn btn-primary green_bg_logo"
          onClick={() => {
            setOpenModal(true);
            setSelectedRow(data.email);
          }}
        >
          Email
        </div>
        <div
          className="btn btn-primary green_bg_logo"
          onClick={() => {
            setOpenUpdateModal(true);
            setRowId(data._id);
            setFirstname(data.firstname);
            setLastName(data.lastname);
          }}
        >
          Update
        </div>

        {data.block ? (
          <div
            className="btn btn-primary"
            onClick={() => handleUnblock(data._id)}
          >
            Unblock
          </div>
        ) : (
          <div className="btn btn-danger" onClick={() => handleBlock(data._id)}>
            Block
          </div>
        )}
        {role === "superadmin" ? (
          <div
            className="btn btn-danger"
            onClick={() => {
              setOpenDeleteModal(true);
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
    <div className="datatable">
      <div className="datatableTitle">
        <h2 className="text-black fw-bold">Students</h2>{" "}
      </div>
      <div className="search-bar">
        <input
          className="form-control p-2 mb-2"
          type="text"
          placeholder="Search Student"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {role === "superadmin" && selectedRows.length > 0 ? (
        <Button
          variant="danger"
          style={{ margin: "20px 0px" }}
          onClick={() => {
            setOpenDeleteModal(true);
          }}
        >
          Delete {selectedRows.length} Selected Rows
        </Button>
      ) : (
        ""
      )}

      {/*Send email */}
      <Modal
        show={openModal}
        onHide={() => {
          setOpenModal(false);
          setSubject("");
          setHtmlContent("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Send Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmailModel
            selectedRow={selectedRow}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
            applicationId={null}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={openUpdateModal}
        onHide={() => {
          setOpenUpdateModal(false);
          setRowId("");
          setFirstname("");
          setLastName("");
          setPassword("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Update student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formName">
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formName" className="mt-2">
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Lastname"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formName" className="mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Send
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete modal */}
      <Modal show={openDeleteModal} onHide={setOpenDeleteModal}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <SureModal
            url={"https://crm.internationaleducationoffice.co.uk/students/"}
            ids={selectedRows}
            name={["Student", "Students"]}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
            showText={
              "Deleting students will also delete it's applications too"
            }
            setPopupColor={setPopupColor}
            setUpClose={setOpenDeleteModal}
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
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Country</th>
            <th>City</th>
            <th>Province</th>
            <th>Block</th>
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
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.email}</td>
              <td>{item.gender}</td>
              <td>{item.countryLivingIn}</td>
              <td>{item.city}</td>
              <td>{item.province}</td>
              {item.block ? (
                <td>
                  <p className="fw-bold" style={{ color: "red" }}>
                    Blocked
                  </p>
                </td>
              ) : (
                <td>
                  <p className="fw-bold" style={{ color: "green" }}>
                    Active
                  </p>
                </td>
              )}
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

export default DatatableStudents;
