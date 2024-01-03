import "../../style/datatable.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import { IoAddCircleSharp } from "react-icons/io5";
import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";
import NewFacility from "./NewFacility";
import UpdateFacility from "./UpdateFacility";
import SureModal from "../../components/SureModel/SureModal";

const DatatableFacilities = () => {
  const [facilities, setFacilites] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [popUpColor, setPopupColor] = useState("green");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const role = localStorage.getItem("role");
  const [selectedRows, setSelectedRows] = useState([]);
  const token = localStorage.getItem("ieodkvToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState(facilities);
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
      .get("https://crm.internationaleducationoffice.co.uk/facilities", config)
      .then((response) => {
        if (response.data.length > 0) {
          setFacilites(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [facilities]);

  useEffect(() => {
    const filtered = facilities.filter((branch) =>
      Object.values(branch).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );
    setFilteredBranches(filtered);
  }, [searchQuery, facilities]);

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

  const actions = (data) => {
    return (
      <div className="cellAction">
        <div
          onClick={() => {
            setOpenUpdateModal(true);
            setSelectedRow(data);
          }}
          className="btn btn-primary green_bg_logo"
        >
          Update
        </div>
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
        <h2 className="fw-bold text-dark"> Facilities</h2>
        {/* <IoAddCircleSharp
          className="green_logo"
          style={{ cursor: "pointer" }}
          size={40}
          onClick={() => setOpenAddModal(true)}
        /> */}
        <button className="btn btn-primary" style={{ backgroundColor: "#2F9444", border: "none", height: "38px" }}
          onClick={() => setOpenAddModal(true)}

        >
          <i class="fa-solid fa-plus me-1"></i>Add Facility</button>
      </div>
      <div className="search-bar">
        <input
          className="form-control"
          type="text"
          placeholder="Search Facility"
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

      {/*Add*/}
      <Modal
        show={openAddModal}
        onHide={() => {
          setOpenAddModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewFacility
            setOpenAddModal={setOpenAddModal}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
          />
        </Modal.Body>
      </Modal>

      {/*Update*/}
      <Modal
        show={openUpdateModal}
        onHide={() => {
          setOpenUpdateModal(false);
          setSelectedRow([]);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Update Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateFacility
            data={selectedRow}
            setOpenUpdateModal={setOpenUpdateModal}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
          />
        </Modal.Body>
      </Modal>

      {/*  Image modal */}
      <Modal
        show={openModal}
        onHide={() => {
          setOpenModal(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img
            src={`https://crm.internationaleducationoffice.co.uk/facilities/images/${selectedRow?.image}`}
            width={"400"}
            height={"400"}
          />
        </Modal.Body>
      </Modal>

      {/* Delete modal */}
      <Modal show={openDeleteModal} onHide={setOpenDeleteModal}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <SureModal
            url={"https://crm.internationaleducationoffice.co.uk/facilities/"}
            ids={selectedRows}
            name={["Facility", "Facilities"]}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
            showText={""}
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
            <th>Name</th>
            <th>Image</th>
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
                <img
                  src={`https://crm.internationaleducationoffice.co.uk/facilities/images/${item.image}`}
                  width={"40"}
                  height={"40"}
                  className="imageInCategory"
                  onClick={() => {
                    setOpenModal(true);
                    setSelectedRow(item);
                  }}
                />
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

export default DatatableFacilities;
