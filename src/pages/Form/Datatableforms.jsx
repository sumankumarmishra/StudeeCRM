import "../../style/datatable.css";
import { DataGrid, daDK } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import "../Members/members.css";
import { CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { IoAddCircleSharp } from "react-icons/io5";
import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";
import SureModal from "../../components/SureModel/SureModal";

const Datatableforms = () => {
  const [forms, setForms] = useState([]);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [popUpColor, setPopupColor] = useState("green");
  const [openModal, setOpenModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("ieodkvToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState(forms);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
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
      .get(`https://crm.internationaleducationoffice.co.uk/forms`, config)
      .then((response) => {
        console.log(response.data);
        setForms(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [forms]);

  useEffect(() => {
    const filtered = forms.filter((form) =>
      Object.entries(form).some(([key, value]) => {
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
  }, [searchQuery, forms]);

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
        <Link
          className="btn btn-primary green_bg_logo"
          state={{ data: data }}
          to={`/form-design/update/${data._id}`}
        >
          Update
        </Link>
        <div
          className="btn btn-danger"
          onClick={() => {
            setOpenModal(true);
            setSelectedRows([data._id]);
          }}
        >
          Delete
        </div>
      </div>
    );
  };
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <h1 className="text-black fw-bold">Forms</h1>
        {/* <IoAddCircleSharp
          className="green_logo"
          style={{ cursor: "pointer" }}
          size={40}
          onClick={() => navigate("/form-design/new")}
        /> */}
        <button className="btn btn-primary" style={{ backgroundColor: "#2F9444", border: "none" }}
          onClick={() => navigate("/form-design/new")}
        >
          <i class="fa-solid fa-plus me-1"
          ></i> Create Form</button>
      </div>
      <div className="search-bar">
        <input
          className="form-control p-2 mb-2"
          type="text"
          placeholder="Search Form"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {selectedRows.length > 0 ? (
        <Button
          variant="danger"
          style={{ margin: "20px 0px" }}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Delete {selectedRows.length} Selected Rows
        </Button>
      ) : null}

      {/* Delete modal */}
      <Modal show={openModal} onHide={setOpenModal}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <SureModal
            url={"https://crm.internationaleducationoffice.co.uk/forms/"}
            ids={selectedRows}
            name={["Form", "Forms"]}
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
              <th>Name</th>
              <th>University</th>
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
                <td>{item.university?.universityName}</td>
                <td>
                  {" "}
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.link}
                  </a>
                </td>
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

export default Datatableforms;
