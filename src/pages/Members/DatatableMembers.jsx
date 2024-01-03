import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import "./members.css";
import { Link, useNavigate } from "react-router-dom";
import { IoAddCircleSharp } from "react-icons/io5";
import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";
import SureModal from "../../components/SureModel/SureModal";
import { CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { debounce } from "lodash";

const DatatableMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [filteredCount, setTotalfilteredCount] = useState(0);
  const [allMembers, setAllMembers] = useState([]);
  const [page_number, setPageNumber] = useState(false);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [popUpColor, setPopupColor] = useState("green");
  const [rowId, setRowId] = useState("");
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("ieodkvToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmails, setFilteredEmails] = useState(members);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [selectAll, setSelectAll] = useState(false);
  const [maxPagesToShow] = useState(10); // Set the maximum number of pages to show.

  const navigate = useNavigate();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmails.slice(indexOfFirstItem, indexOfLastItem);

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
        `https://crm.internationaleducationoffice.co.uk/members/filter/${page_number}`,
        config
      )
      .then((response) => {
        setMembers(response.data);
        setLoading(false);
        setAllMembers(response.data);

        // sessionStorage.setItem(
        //   "cachedMembers",
        //   JSON.stringify(response.data)
        // );
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, 500);

  useEffect(() => {
    axios
      .get(`https://crm.internationaleducationoffice.co.uk/members`, config)
      .then((response) => {
        setFilteredEmails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filteredEmails]);

  useEffect(() => {
    debouncedSubmit();
    // axios
    //   .get(
    //     `https://crm.internationaleducationoffice.co.uk/members/filter/${page_number}`,
    //     config
    //   )
    //   .then((response) => {
    //     setMembers(response.data);
    //     setLoading(false);
    //     setAllMembers(response.data);
    //     // sessionStorage.setItem(
    //     //   "cachedMembers",
    //     //   JSON.stringify(response.data)
    //     // );
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });
  }, [page_number]);

  useEffect(() => {
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/reports/dashboard",
        config
      )
      .then((response) => {
        setTotalCount(response.data.members);
        setTotalfilteredCount(response.data.members);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = filteredEmails.filter((member) =>
      Object.entries(member).some(([key, value]) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        if (key === "role" || (key === "branch" && typeof value === "object")) {
          return value.name.toLowerCase().includes(searchQuery.toLowerCase());
        }

        return false;
      })
    );
    setMembers(filtered);
    setTotalCount(filtered.length);
    setFilter(true);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // If not selected all, add all branch IDs to selectedRows
      const allBranchIds = members.map((branch) => branch._id);
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
    setMembers(allMembers);
    setTotalCount(filteredCount);
  };

  // Block member
  const handleBlock = (id, block) => {
    axios
      .put(
        `https://crm.internationaleducationoffice.co.uk/members/block/${id}`,
        {
          blocked: block,
        },
        config
      )
      .then((response) => {
        sessionStorage.setItem("cachedMembers", JSON.stringify(response.data));
        setPopupColor(block ? "red" : "green");
        setPopupshow(true);
        if (block) {
          setPopupText("Member Blocked");
        } else {
          setPopupText("Member Unlocked");
        }
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 2000);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { password: password };
    axios
      .put(
        `https://crm.internationaleducationoffice.co.uk/members/${rowId}`,
        data,
        config
      )
      .then((response) => {
        setPopupshow(true);
        setPopupText("Password Updated");
        setOpenPasswordModal(false);
        setPopupColor("orange");
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data) {
          alert(error.response.data);
        }
      });
  };

  const actions = (data) => {
    return (
      <div className="cellAction">
        <Link
          to={`/members/update/${data._id}`}
          state={{ data: data }}
          className="btn btn-primary green_bg_logo"
        >
          Update
        </Link>
        <div
          className="btn btn-primary green_bg_logo"
          onClick={() => {
            setOpenPasswordModal(true);
            setRowId(data._id);
          }}
        >
          Password
        </div>
        {data.blocked ? (
          <div
            className="btn btn-primary"
            onClick={() => {
              handleBlock(data._id, false);
            }}
          >
            Unblock
          </div>
        ) : (
          <div
            className="btn btn-danger"
            onClick={() => {
              handleBlock(data._id, true);
            }}
          >
            Block
          </div>
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
        <h1 className="text-black fw-bold">Members ({totalCount})</h1>
        {/* <IoAddCircleSharp
          className="green_logo"
          style={{ cursor: "pointer" }}
          size={40}
          onClick={() => navigate("/members/new")}
        /> */}
        <button
          className="btn btn-primary"
          style={{ backgroundColor: "#2F9444", border: "none" }}
          onClick={() => navigate("/members/new")}
        >
          <i class="fa-solid fa-plus me-1"></i>Add Member
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

      {/* Update password */}
      <Modal
        show={openPasswordModal}
        onHide={() => {
          setOpenPasswordModal(false);
          setPassword("");
          setRowId("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Update password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
            url={"https://crm.internationaleducationoffice.co.uk/members/"}
            ids={selectedRows}
            name={["Member", "Members"]}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
            showText={"Deleting members will also delete it's applications"}
            setPopupColor={setPopupColor}
            cacheKey={"cachedMembers"}
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
              <th>Username</th>
              <th>Role</th>
              <th>Email</th>
              <th>Whatsapp no.</th>
              <th>Image</th>
              <th>Block</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((item, index) => (
              <tr key={index} style={{ width: "50px" }}>
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
                <td style={{ width: "50px" }}>{index + 1}</td>
                <td style={{ width: "150px" }}>{item.username}</td>
                <td style={{ width: "150px" }}>{item.role?.name}</td>
                <td style={{ width: "150px" }}>{item.email}</td>
                <td style={{ width: "150px" }}>{item.phoneNo}</td>
                <div style={{ width: "150px" }}>
                  <img
                    src={`https://crm.internationaleducationoffice.co.uk/members/images/${item.image}`}
                    width={"30%"}
                  />
                </div>
                {item.blocked ? (
                  <td className="pt-2" style={{ width: "150px" }}>
                    <p className="fw-bold" style={{ color: "red" }}>
                      Blocked
                    </p>
                  </td>
                ) : (
                  <td className="pt-2" style={{ width: "150px" }}>
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

export default DatatableMembers;
