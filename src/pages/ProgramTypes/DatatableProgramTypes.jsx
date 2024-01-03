import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import "../Members/members.css";
import { IoAddCircleSharp } from "react-icons/io5";
import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";
import SureModal from "../../components/SureModel/SureModal";

const DatatableProgramTypes = () => {
  const [programTypes, setProgramTypes] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [popUpShow, setPopupshow] = useState(false);
  const [documents_list, setDocumentsList] = useState([]);
  const [documents_name, setDocumentsName] = useState("");
  const [popUpText, setPopupText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [popUpColor, setPopupColor] = useState("green");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");
  const [name, setName] = useState("");
  const [graduate, setGraduate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("ieodkvToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState(programTypes);
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
      .get(
        "https://crm.internationaleducationoffice.co.uk/programTypes",
        config
      )
      .then((response) => {
        setProgramTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [programTypes]);

  useEffect(() => {
    const filtered = programTypes.filter((branch) =>
      Object.values(branch).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );
    setFilteredBranches(filtered);
  }, [searchQuery, programTypes]);

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

  const handleDeleteName = (name) => {
    setDocumentsList(documents_list.filter((row) => row !== name));
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

  // Add program type
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://crm.internationaleducationoffice.co.uk/programTypes",
        {
          name: name,
          graduate: graduate,
          documents_list: documents_list,
        },
        config
      )
      .then((response) => {
        setName("");
        setPopupColor("green");
        setGraduate("");
        setPopupshow(true);
        setPopupText(`Degree type Added`);
        setOpenAddModal(false);
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
  // Update program type
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://crm.internationaleducationoffice.co.uk/programTypes/${selectedRow}`,
        {
          name: name,
          graduate: graduate,
          documents_list: documents_list,
        },
        config
      )
      .then((response) => {
        setName("");
        setGraduate("");
        setPopupColor("orange");
        setPopupshow(true);
        setPopupText(`Degree type Updated`);
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
          className="btn btn-primary green_bg_logo"
          onClick={() => {
            setOpenUpdateModal(true);
            setName(data.name);
            setGraduate(data.graduate);
            setSelectedRow(data._id);
            setDocumentsList(data.documents_list);
          }}
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
    <div className="datatable">
      <div className="datatableTitle">
        <h1 className="text-black fw-bold">Degree type</h1>
        {/* <IoAddCircleSharp
          className="green_logo"
          style={{ cursor: "pointer" }}
          size={40}
          onClick={() => setOpenAddModal(true)}
        /> */}
        <button
          className="btn btn-primary"
          style={{ backgroundColor: "#2F9444", border: "none", height: "38px" }}
          onClick={() => setOpenAddModal(true)}
        >
          <i class="fa-solid fa-plus me-1"></i>Add Degree Type
        </button>
      </div>
      <div className="search-bar">
        <input
          className="form-control"
          type="text"
          placeholder="Search Branch"
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

      {/*Add program type*/}
      <Modal
        show={openAddModal}
        onHide={() => {
          setOpenAddModal(false);
          setName("");
          setGraduate("");
          setDocumentsList([]);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add degree type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <p style={{ color: "red", fontSize: 20 }}>{errorMessage}</p>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCountry">
              <Form.Label className="mt-2">Graduate type</Form.Label>
              <Form.Control
                as="select"
                value={graduate}
                onChange={(e) => {
                  setGraduate(e.target.value);
                }}
              >
                <option value="">Select</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Enter the name of the mandatory document</Form.Label>
              <Form.Group style={{ display: "flex", alignItems: "center" }}>
                <Form.Control
                  type="text"
                  style={{ marginRight: "5px" }}
                  placeholder="Name"
                  value={documents_name}
                  onChange={(e) => setDocumentsName(e.target.value)}
                />
                <p
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    const findDoucment = documents_list.find(
                      (row) => documents_name === row
                    );
                    if (findDoucment) {
                      alert("Doucment name cannot be repeated");
                    } else {
                      setDocumentsName("");
                      setDocumentsList([...documents_list, documents_name]);
                    }
                  }}
                >
                  Add
                </p>
              </Form.Group>
            </Form.Group>
            {documents_list.length > 0 && (
              <ul>
                {documents_list.map((row, index) => (
                  <li key={index}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>{row}</p>
                      <p
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteName(row)}
                      >
                        X
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <Button className="mt-3" variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/*Update program type*/}
      <Modal
        show={openUpdateModal}
        onHide={() => {
          setOpenUpdateModal(false);
          setName("");
          setGraduate("");
          setDocumentsList([]);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Update degree type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <p style={{ color: "red", fontSize: 20 }}>{errorMessage}</p>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCountry">
              <Form.Label className="mt-2">Graduate type</Form.Label>
              <Form.Control
                as="select"
                value={graduate}
                onChange={(e) => {
                  setGraduate(e.target.value);
                }}
              >
                <option value="">Select</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Enter the name of the mandatory document</Form.Label>
              <Form.Group style={{ display: "flex", alignItems: "center" }}>
                <Form.Control
                  type="text"
                  style={{ marginRight: "5px" }}
                  placeholder="Name"
                  value={documents_name}
                  onChange={(e) => setDocumentsName(e.target.value)}
                />
                <p
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    const findDoucment = documents_list.find(
                      (row) => documents_name === row
                    );
                    if (findDoucment) {
                      alert("Doucment name cannot be repeated");
                    } else {
                      setDocumentsName("");
                      setDocumentsList([...documents_list, documents_name]);
                    }
                  }}
                >
                  Add
                </p>
              </Form.Group>
            </Form.Group>
            {documents_list.length > 0 && (
              <ul>
                {documents_list.map((row, index) => (
                  <li key={index}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>{row}</p>
                      <p
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteName(row)}
                      >
                        X
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete modal */}
      <Modal show={openModal} onHide={setOpenModal}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <SureModal
            url={"https://crm.internationaleducationoffice.co.uk/programTypes/"}
            ids={selectedRows}
            name={["Degree type", "Degree types"]}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
            showText={
              "Deleting degree types will also delete it's programs and applications"
            }
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
            <th>Graduate type</th>
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
              <td>{item.graduate}</td>
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

export default DatatableProgramTypes;
