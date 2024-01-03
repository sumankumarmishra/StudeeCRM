import "../../style/datatable.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import "../Members/members.css";
import { Table, Modal, Button, Pagination } from "react-bootstrap";
import ViewLogs from "./ViewLogs";
import SureModal from "../../components/SureModel/SureModal";
import { CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { debounce } from "lodash";

const DatatableLogs = () => {
  const [allLogs, setAllLogs] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logsCount, setLogsCount] = useState(0);
  const [logsFilterCount, setLogsFilterCount] = useState(0);
  const [openViewModal, setOpenViewModal] = useState(false);
  const token = localStorage.getItem("ieodkvToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [page_number, setPageNumber] = useState(1);
  const [filter, setFilter] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [popUpColor, setPopupColor] = useState("red");
  const role = localStorage.getItem("role");
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [maxPagesToShow] = useState(10); // Set the maximum number of pages to show.
  const [selectAll, setSelectAll] = useState(false);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setPageNumber(pageNumber);
    setLoading(true);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const debouncedSubmit = debounce(() => {
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/logs/filter/${page_number}`,
        config
      )
      .then((response) => {
        setLogs(response.data);
        setLoading(false);
        setAllLogs(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, 500);

  useEffect(() => {
    axios
      .get(`https://crm.internationaleducationoffice.co.uk/logs`, config)
      .then((response) => {
        setFilteredBranches(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filteredBranches]);
  useEffect(() => {
    debouncedSubmit();
  }, [page_number]);

  useEffect(() => {
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/reports/dashboard",
        config
      )
      .then((response) => {
        setLogsCount(response.data.logs);
        setLogsFilterCount(response.data.logs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = filteredBranches.filter((log) =>
      Object.entries(log).some(([key, value]) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        if (key === "member" && typeof value === "object") {
          return value?.username
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }

        return false;
      })
    );
    setLogs(filtered);
    setLogsCount(filtered.length);
    setFilter(true);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // If not selected all, add all branch IDs to selectedRows
      const allBranchIds = logs.map((branch) => branch._id);
      setSelectedRows(allBranchIds);
    } else {
      // If already selected all, clear selectedRows
      setSelectedRows([]);
    }
  };

  const calculatePages = () => {
    const totalPages = Math.ceil(logsCount / itemsPerPage);
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
    const totalPages = Math.ceil(logsCount / itemsPerPage);
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
    const totalPages = Math.ceil(logsCount / itemsPerPage);
    setCurrentPage(totalPages);
    setPageNumber(totalPages);
  };

  const handleResetFilter = (e) => {
    e.preventDefault();
    setFilter(false);
    setLogs(allLogs);
    setLogsCount(logsFilterCount);
  };

  const actions = (data) => {
    return (
      <div className="cellAction">
        {role === "superadmin" ? (
          <div
            className="btn btn-primary"
            onClick={() => {
              setOpenViewModal(true);
              setSelectedRow(data);
            }}
          >
            View
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
        <h1 className="text-black fw-bold">Logs ({logsCount})</h1>
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

      {/*Add*/}
      <Modal
        show={openViewModal}
        onHide={() => {
          setOpenViewModal(false);
          setSelectedRow([]);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Log Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewLogs data={selectedRow} />
        </Modal.Body>
      </Modal>

      {/* Delete modal */}
      <Modal show={openModal} onHide={setOpenModal}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <SureModal
            url={"https://crm.internationaleducationoffice.co.uk/logs/"}
            ids={selectedRows}
            name={["Log", "Logs"]}
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
              <th>Title</th>
              <th>Member</th>
              <th>Date & Time</th>
              <th>Table</th>
              <th>Data</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((item, index) => (
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
                <td>{item.title}</td>
                <td>{item.member ? item.member.username : "-"}</td>
                <td>{item.date_time}</td>
                <td>{item.table}</td>
                <td>
                  {item.data?.length > 0 && (
                    <>
                      <p>
                        {item.data[0].value}
                        {item.data.length > 1 ? <span>...</span> : ""}
                      </p>
                    </>
                  )}
                </td>

                <td>{actions(item)}</td>
              </tr>
            ))}
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

export default DatatableLogs;
