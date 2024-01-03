import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import "../Members/members.css";
import { IoAddCircleSharp } from "react-icons/io5";
import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";
import SureModal from "../../components/SureModel/SureModal";

const Datatablenavbarpage = () => {
  const [navbar, setNavbar] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [popUpColor, setPopupColor] = useState("green");
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedRow, setSelectRow] = useState("");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("ieodkvToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState(navbar);
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
      .get("https://crm.internationaleducationoffice.co.uk/navbar", config)
      .then((response) => {
        setNavbar(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navbar]);

  useEffect(() => {
    const filtered = navbar.filter((branch) =>
      Object.values(branch).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );
    setFilteredBranches(filtered);
  }, [searchQuery, navbar]);

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
      name: name,
      link: link,
    };
    axios
      .post("https://crm.internationaleducationoffice.co.uk/navbar", data, config)
      .then((response) => {
        setName("");
        setLink("");
        setPopupshow(true);
        setPopupText(`Menu Added`);
        setPopupColor("green");
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
      name: name,
      link: link,
    };
    axios
      .patch(`https://crm.internationaleducationoffice.co.uk/navbar/${selectedRow}`, data, config)
      .then((response) => {
        setName("");
        setLink("");
        setPopupshow(true);
        setPopupColor("orange");
        setPopupText(`Menu Updated`);
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
            setLink(data.link);
          }}
          className="btn btn-primary green_bg_logo"
        >
          Update
        </div>
        {role === "superadmin" ? (
          <div
            className="btn btn-danger"
            onClick={() => {
              setSelectedRows([data._id]);
              setOpenModal(true);
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
        <h2 className="fw-bold text-dark">Navbar Menu</h2>
        {/* <IoAddCircleSharp
          className="green_logo"
          style={{ cursor: "pointer" }}
          size={40}
          onClick={() => setOpenAddModal(true)}
        /> */}
        <button className="btn btn-primary" style={{ backgroundColor: "#2F9444", border: "none", height: "38px" }}
          onClick={() => setOpenAddModal(true)}

        >
          <i class="fa-solid fa-plus me-1"></i>Add Navbar Menu</button>
      </div>
      <div className="search-bar">
        <input
          className="form-control"
          type="text"
          placeholder="Search by name"
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

      {/* Delete modal */}
      <Modal show={openModal} onHide={setOpenModal}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <SureModal
            url={`https://crm.internationaleducationoffice.co.uk/navbar/`}
            ids={selectedRows}
            name={["Navbar detail", "Navbar details"]}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
            showText={""}
            setPopupColor={setPopupColor}
            setUpClose={setOpenModal}
            config={config}
          />
        </Modal.Body>
      </Modal>

      {/*Add*/}
      <Modal
        show={openAddModal}
        onHide={() => {
          setOpenAddModal(false);
          setName("");
          setSelectRow("");
          setLink("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add Navbar Menu</Modal.Title>
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
            <Form.Group controlId="formName">
              <Form.Label className="pt-2">Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </Form.Group>

            <Button className="mt-3" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/*Update*/}
      <Modal
        show={openUpdateModal}
        onHide={() => {
          setOpenUpdateModal(false);
          setName("");
          setSelectRow("");
          setLink("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>update Navbar Menu</Modal.Title>
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
            <Form.Group controlId="formName">
              <Form.Label className="pt-2">Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {popUpShow ? (
        <PopupAlert
          popUpText={popUpText}
          backgroundColor={
            popUpText === "Menu Added"
              ? "#8AFF8A"
              : popUpText === "Menu Updated"
                ? "#FFC300"
                : "red"
          }
        />
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
            <th>Link</th>
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
              <td>
                {" "}
                <a href={item.link} target="_blank">
                  {item.link}
                </a>
              </td>
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

export default Datatablenavbarpage;
