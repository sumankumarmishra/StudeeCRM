import "../../style/datatable.css";
import { DataGrid, daDK } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import "../Members/members.css";
import { IoAddCircleSharp } from "react-icons/io5";
import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";
import { CircularProgress } from "@mui/material";
import SureModal from "../../components/SureModel/SureModal";

const Datatablefields = () => {
  const [fields, setFields] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [popUpShow, setPopupshow] = useState(false);
  const [state, setState] = useState(2);
  const [popUpText, setPopupText] = useState("");
  const [popUpColor, setPopupColor] = useState("green");
  const [openModal, setOpenModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [key, setkey] = useState("");
  const [type, settype] = useState("");
  const [ref, setRef] = useState("");
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState("");
  const [allReferences, setRefernces] = useState([]);
  const [options, setOptions] = useState([]);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("ieodkvToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState(fields);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [selectAll, setSelectAll] = useState(false);
  const [maxPagesToShow] = useState(10); // Set the maximum number of pages to show.
  const fieldStates = [
    { name: "Counselor", index: 0 },
    // { name: "Dynamic Fields", index: 1 },
    { name: "Admission officer", index: 4 },
    { name: "CAS officer", index: 9 },
    { name: "Visa officer", index: 5 },
    { name: "Status", index: 10 },
  ];

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
      .get(`https://crm.internationaleducationoffice.co.uk/fields`, config)
      .then((response) => {
        setFields(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    // try {
    // const sessionStorage = localStorage.getItem(`fields`);
    // const userGet = JSON.parse(sessionStorage);
    // setFields(userGet);
    // setLoading(false);
    // } catch (error) {
    //   console.log(error);
    // }
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/core-settings`,
        config
      )
      .then((response) => {
        setRefernces(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fields]);

  useEffect(() => {
    if (ref) {
      axios
        .get(
          `https://crm.internationaleducationoffice.co.uk/core-settings/${ref}`,
          config
        )
        .then((response) => {
          setOptions(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [ref]);

  useEffect(() => {
    const filtered = fields.filter((field) =>
      Object.values(field).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );
    setFilteredBranches(filtered);
  }, [searchQuery, fields]);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      key: key,
      state: state,
      type: type,
      ref: ref,
      options: options,
      label: label,
    };
    axios
      .post(
        "https://crm.internationaleducationoffice.co.uk/fields",
        data,
        config
      )
      .then((response) => {
        console.log(response.data);
        setkey("");
        settype("");
        setOptions([]);
        setRef("");
        setLabel("");
        setPopupColor("green");
        setPopupshow(true);
        setPopupText(`Field Added`);
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

  // Add member
  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      state: state,
    };
    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/fields/${selectedRows[0]}`,
        data,
        config
      )
      .then((response) => {
        setOpenUpdateModal(false);
        setkey("");
        settype("");
        setOptions([]);
        setRef("");
        setLabel("");
        setPopupColor("orange");
        setPopupshow(true);
        setPopupText(`Field Updated`);
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 800);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const actions = (data) => {
    return (
      <div className="cellAction">
        {role === "superadmin" ? (
          <div
            className="btn btn-primary"
            onClick={() => {
              setOpenUpdateModal(true);
              setLabel(data.label);
              settype(data.type);
              setState(data.state);
              setSelectedRows([data._id]);
            }}
          >
            Update
          </div>
        ) : (
          ""
        )}
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
        <h1 className="text-black fw-bold">Application fields</h1>
        {/* <IoAddCircleSharp
          className="green_logo"
          style={{ cursor: "pointer" }}
          size={40}
          onClick={() => setOpenAddModal(true)}
        /> */}
        <button
          className="btn btn-primary"
          style={{ backgroundColor: "#2F9444", border: "none" }}
          onClick={() => setOpenAddModal(true)}
        >
          <i class="fa-solid fa-plus me-1"></i>Add Field
        </button>
      </div>
      <div className="search-bar">
        <input
          className="form-control p-2 mb-2"
          type="text"
          placeholder="Search Field"
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
      {/* Add modal */}
      <Modal
        show={openAddModal}
        onHide={() => {
          setOpenAddModal(false);
          setkey("");
          setErrorMessage("");
          setRef("");
          setLabel("");
          settype("");
          setOptions([]);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add dynamic field</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <p style={{ color: "red", fontSize: 20 }}>{errorMessage}</p>
            <Form.Group controlId="formName">
              <Form.Label>Label</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCountry">
              <Form.Label className="pt-2">Data type</Form.Label>
              <Form.Control
                as="select"
                value={type}
                onChange={(e) => {
                  settype(e.target.value);
                }}
              >
                <option value="">Select data type</option>
                <option value="String">String</option>
                <option value="Number">Number</option>
                <option value="Date">Date</option>
                <option value="Dropdown">Dropdown</option>
              </Form.Control>
            </Form.Group>
            {type === "Dropdown" ? (
              <Form.Group controlId="formCity">
                <Form.Label>Reference</Form.Label>
                <Form.Control
                  as="select"
                  value={ref}
                  onChange={(e) => {
                    setRef(e.target.value);
                  }}
                >
                  <option value="">Select reference</option>
                  {allReferences.map((row, index) => (
                    <option value={row.urlName} key={index}>
                      {row.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            ) : (
              ""
            )}
            <Form.Group controlId="formCountry">
              <Form.Label className="pt-2">Tab Placing</Form.Label>
              <Form.Control
                as="select"
                value={state}
                readOnly
                onChange={(e) => {
                  setState(e.target.value);
                }}
              >
                <option value="">Select state</option>
                {fieldStates.map((row, index) => (
                  <option value={row.index} key={index}>
                    {row.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Update modal */}
      <Modal
        show={openUpdateModal}
        onHide={() => {
          setOpenUpdateModal(false);
          setkey("");
          setErrorMessage("");
          setRef("");
          setSelectedRows([]);
          setLabel("");
          settype("");
          setOptions([]);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Update field</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formName">
              <Form.Label>Label</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={label}
                readOnly
                onChange={(e) => setLabel(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCountry">
              <Form.Label className="pt-2">Data type</Form.Label>
              <Form.Control
                as="select"
                value={type}
                disabled
                onChange={(e) => {
                  settype(e.target.value);
                }}
              >
                <option value="">Select data type</option>
                <option value="String">String</option>
                <option value="Number">Number</option>
                <option value="Date">Date</option>
                <option value="Dropdown">Dropdown</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label className="pt-2">Tab Placing</Form.Label>
              <Form.Control
                as="select"
                value={state}
                readOnly
                onChange={(e) => {
                  setState(e.target.value);
                }}
              >
                <option value="">Select state</option>
                {fieldStates.map((row, index) => (
                  <option value={row.index} key={index}>
                    {row.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

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
            url={"https://crm.internationaleducationoffice.co.uk/fields/"}
            ids={selectedRows}
            name={["Field", "Fields"]}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
            showText={
              "Deleting fields will also remove them from application's data"
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
      {loading ? (
        <CircularProgress />
      ) : (
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
              <th>Key</th>
              <th>Label</th>
              <th>Type</th>
              <th>Tab Placing</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => {
              const fieldState = fieldStates.find(
                (row) => row.index === item.state
              );
              return (
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
                  <td>{item.key}</td>
                  <td>{item.label}</td>
                  <td>{item.type}</td>
                  <td>{fieldState.name}</td>
                  <td>{actions(item)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
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

export default Datatablefields;
