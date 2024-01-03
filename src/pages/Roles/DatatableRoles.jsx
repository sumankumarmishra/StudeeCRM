import "../../style/datatable.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import { Table, Modal, Button, Pagination } from "react-bootstrap";
import { IoAddCircleSharp } from "react-icons/io5";
import SureModal from "../../components/SureModel/SureModal";
import { CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

const DatatableRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [page_number, setPageNumber] = useState(false);
  const [filteredCount, setTotalfilteredCount] = useState(0);
  const [allRoles, setAllRoles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState(roles);
  const [openModal, setOpenModal] = useState(false);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpColor, setPopupColor] = useState("green");
  const [popUpText, setPopupText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("ieodkvToken");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [selectAll, setSelectAll] = useState(false);
  const [maxPagesToShow] = useState(10); // Set the maximum number of pages to show.

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get(`https://crm.internationaleducationoffice.co.uk/roles`, config)
      .then((response) => {
        setFilteredBranches(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filteredBranches]);

  useEffect(() => {
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/roles/filter/${page_number}`,
        config
      )
      .then((response) => {
        setRoles(response.data);
        setAllRoles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [page_number]);

  useEffect(() => {
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/reports/dashboard",
        config
      )
      .then((response) => {
        setTotalCount(response.data.roles);
        setTotalfilteredCount(response.data.roles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = filteredBranches.filter((branch) =>
      Object.values(branch).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );
    setRoles(filtered);
    setTotalCount(filtered.length);
    setFilter(true);
  };

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setPageNumber(pageNumber);
    setLoading(true);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // If not selected all, add all branch IDs to selectedRows
      const allBranchIds = roles.map((branch) => branch._id);
      setSelectedRows(allBranchIds);
    } else {
      // If already selected all, clear selectedRows
      setSelectedRows([]);
    }
  };

  const calculatePages = () => {
    const totalPages = Math.ceil(totalCount / itemsPerPage);
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
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    if (currentPage + maxPagesToShow <= totalPages) {
      setCurrentPage(currentPage + maxPagesToShow);
    } else {
      setCurrentPage(totalPages);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
    setPageNumber(1);
  };

  // Function to handle navigation to the last page.
  const handleLastPage = () => {
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    setCurrentPage(totalPages);
    setPageNumber(totalPages);
  };

  const handleResetFilter = (e) => {
    e.preventDefault();
    setFilter(false);
    setRoles(allRoles);
    setTotalCount(filteredCount);
  };

  const actions = (data) => {
    return (
      <div className="cellAction">
        <Link
          className="btn btn-primary green_bg_logo"
          to={`/roles/update/${data._id}`}
          state={{ data: data }}
        >
          Update
        </Link>
        {role === "superadmin" ? (
          <Button
            className="btn btn-danger"
            onClick={() => {
              setOpenModal(true);
              setSelectedRows([data._id]);
            }}
            disabled={
              data.name === "sub-agent" ||
              data.name === "superadmin" ||
              data.name === "Agent Admission"
                ? true
                : false
            }
          >
            Delete
          </Button>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <h1 className="text-black fw-bold">Roles ({totalCount})</h1>
        {/* <IoAddCircleSharp
          className="green_logo"
          style={{ cursor: "pointer" }}
          size={40}
          onClick={() => navigate("/roles/new")}
        /> */}
        <button
          className="btn btn-primary mt-2 pb-2"
          style={{ backgroundColor: "#2F9444", border: "none" }}
          onClick={() => navigate("/roles/new")}
        >
          <i class="fa-solid fa-plus me-1"></i>Add Role
        </button>
      </div>
      <div
        className="search-bar"
        style={{ display: "flex", alignItems: "center" }}
      >
        <input
          className="form-control p-2 mb-2"
          type="text"
          placeholder="Search Logs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon
          style={{ cursor: "pointer", margin: "0px 5px", color: "blue" }}
          onClick={handleSearch}
        />
        <RefreshIcon
          style={{ cursor: "pointer", margin: "0px 5px", color: "red" }}
          onClick={handleResetFilter}
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
            url={"https://crm.internationaleducationoffice.co.uk/roles/"}
            ids={selectedRows}
            name={["Role", "Roles"]}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
            showText={"Deleting roles will also delete it's members"}
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map(
              (
                item,
                index // Use currentItems instead of filteredBranches
              ) => (
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
                  <td>{actions(item)}</td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      )}

      {!filter ? (
        <div className="pagination-container pb-3">
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
      ) : (
        ""
      )}
    </div>
  );
};

export default DatatableRoles;
