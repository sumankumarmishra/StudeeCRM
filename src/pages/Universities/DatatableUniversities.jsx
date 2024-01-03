import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, parsePath, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import "../Programs/programs.css";
import { CircularProgress } from "@mui/material";
import { IoAddCircleSharp } from "react-icons/io5";
import {
  Table,
  Modal,
  Button,
  Form,
  Pagination,
  ModalBody,
  ModalHeader,
} from "react-bootstrap";
import SureModal from "../../components/SureModel/SureModal";

const DatatableUniversities = () => {
  const [universities, setUniversities] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [popupColor, setPopupColor] = useState("red");
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("ieodkvToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState(universities);
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
      .get("https://crm.internationaleducationoffice.co.uk/universities", config)
      .then((response) => {
        setUniversities(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [universities]);

  useEffect(() => {
    const filtered = universities.filter((university) =>
      Object.entries(university).some(([key, value]) => {
        if (key === "universityName" || key === "type") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }

        return false;
      })
    );
    setFilteredBranches(filtered);
  }, [searchQuery, universities]);

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
          to={`/campus/${data.urlName}`}
          state={{ data: data }}
          style={{ textDecoration: "none" }}
        >
          <div className="btn btn-primary blue_bg_logo">Add Campus</div>
        </Link>
        <Link
          to={`/universities/update/${data._id}`}
          state={{ data: data }}
          style={{ textDecoration: "none" }}
        >
          <div className="btn btn-primary green_bg_logo">Update</div>
        </Link>
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
        <h2 className="fw-bold text-dark">
          Universities ({universities.length})
        </h2>

        {/* <IoAddCircleSharp
          className="green_logo"
          style={{ cursor: "pointer" }}
          size={40}
          onClick={() => navigate("/universities/new")}
        /> */}
        <button className="btn btn-primary" style={{ backgroundColor: "#2F9444", border: "none", height: "38px" }}
          onClick={() => navigate("/universities/new")}

        >
          <i class="fa-solid fa-plus me-1"></i>Add University</button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search University"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
        />
      </div>
      {role === "superadmin" && selectedRows.length > 0 ? (
        <Button
          variant="danger"
          style={{ margin: "20px 0px" }}
          onClick={() => setOpenModal(true)}
        >
          Delete {selectedRows.length} Selected Rows
        </Button>
      ) : (
        ""
      )}

      {/* Delete modal */}
      <Modal show={openModal} onHide={setOpenModal}>
        <ModalHeader></ModalHeader>
        <ModalBody>
          <SureModal
            url={"https://crm.internationaleducationoffice.co.uk/universities/"}
            ids={selectedRows}
            name={["University", "Universities"]}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
            showText={
              "Deleting university will also delete it's programs, campuses and applications"
            }
            setPopupColor={setPopupColor}
            setUpClose={setOpenModal}
            config={config}
          />
        </ModalBody>
      </Modal>

      {popUpShow ? (
        <PopupAlert popUpText={popUpText} backgroundColor={popupColor} />
      ) : (
        ""
      )}
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
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
              <th>Type</th>
              <th>Banner Image</th>
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
                <td>{item.universityName}</td>
                <td>{item.type}</td>
                <td>
                  <img
                    src={`https://crm.internationaleducationoffice.co.uk/universities/images/${item.logoImage}`}
                    width={"40"}
                    height={"40"}
                    className="imageInCategory"
                  />
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

export default DatatableUniversities;
