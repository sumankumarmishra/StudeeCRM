import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { IoAddCircleSharp } from "react-icons/io5";
import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";

const DatatableCoreSettings = () => {
  const [settings, setsettings] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("ieodkvToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState(settings);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
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
      .get("https://crm.internationaleducationoffice.co.uk/core-settings", config)
      .then((response) => {
        setLoading(false);
        setsettings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [settings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://crm.internationaleducationoffice.co.uk/core-settings", { name: name }, config)
      .then((response) => {
        setPopupshow(true);
        setPopupText("New name added");
        setName("");
        setOpenAddModal(false);
        setTimeout(() => {
          setPopupshow(false);
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          setErrorMessage(error.response.data);
        }
      });
  };

  useEffect(() => {
    const filtered = settings.filter((setting) =>
      Object.values(setting).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );
    setFilteredBranches(filtered);
  }, [searchQuery, settings]);

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

  const actions = (data) => {
    return (
      <div className="cellAction">
        <Link
          className="btn btn-primary green_bg_logo"
          to={`/core-settings/data/${data.urlName}`}
        >
          Add data
        </Link>
      </div>
    );
  };
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <h1 className="text-black fw-bold">
          Core Settings ({settings.length})
        </h1>
        <IoAddCircleSharp
          className="green_logo"
          style={{ cursor: "pointer" }}
          size={40}
          onClick={() => setOpenAddModal(true)}
        />
      </div>
      <div className="search-bar">
        <input
          className="form-control p-2 mb-2"
          type="text"
          placeholder="Search Setting"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Modal
        show={openAddModal}
        onHide={() => {
          setOpenAddModal(false);
          setName("");
          setErrorMessage("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add Setting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <p style={{ color: "red", fontSize: 20 }}>{errorMessage}</p>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="form-control p-2"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {popUpShow ? (
        <PopupAlert popUpText={popUpText} backgroundColor={"#8AFF8A"} />
      ) : (
        ""
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S No.</th>
              <th>Name</th>
              <th>Url</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.urlName}</td>
                <td>{actions(item)}</td>
              </tr>
            ))}
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

export default DatatableCoreSettings;
