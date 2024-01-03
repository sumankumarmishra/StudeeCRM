import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import "./programs.css";
import ViewPrograms from "./ViewPrograms";
import { CircularProgress } from "@mui/material";
import { IoAddCircleSharp } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { Table, Modal, Button, Pagination } from "react-bootstrap";
import MassUpdate from "./MassUpdate";
import SureModal from "../../components/SureModel/SureModal";

const DatatableFiltered = () => {
  const [programs, setPrograms] = useState([]);
  const [filter, setFilter] = useState([]);
  const { campusUrlName, urlName } = useParams();
  const [campus, setCampus] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [massUpdate, setMassUpdate] = useState(false);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [popUpColor, setPopupColor] = useState("green");
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("ieodkvToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState(programs);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPagesToShow] = useState(10); // Set the maximum number of pages to show.

  const [itemsPerPage] = useState(9);
  const [selectAll, setSelectAll] = useState(false);
  const [typeValue, setTypeValue] = useState("");
  const navigate = useNavigate();
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
        `https://crm.internationaleducationoffice.co.uk/campus/campus1/${campusUrlName}`,
        config
      )
      .then((response) => {
        setCampus(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/programs/university_campus/${urlName}/${campusUrlName}`,
        config
      )
      .then((response) => {
        setPrograms(response.data);
        setFilter(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const filtered = programs.filter((program) =>
      Object.entries(program).some(([key, value]) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        if (typeof value === "number") {
          return value
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }
        if (
          key === "city" ||
          (key === "country" && typeof value === "object")
        ) {
          return value.name.toLowerCase().includes(searchQuery.toLowerCase());
        }

        return false;
      })
    );
    setFilteredBranches(filtered);
  }, [searchQuery, programs]);

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

  const handleSearch = (value) => {
    const filteredPrograms = filter.filter(
      (row) => row.programType?.graduate === value
    );
    setPrograms(filteredPrograms);
  };
  const handleReset = (value) => {
    setTypeValue("");
    setPrograms(filter);
  };

  const actions = (data) => {
    return (
      <div className="cellAction">
        <Link
          to={`/${urlName}/${campusUrlName}/programs/update/${data._id}`}
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
        {" "}
        <h2 className="heading-top text-dark ps-3 fw-bold">
          <a href={`/universities`}>Universities</a> &gt;{" "}
          <a href={`/campus/${urlName}`}>Campus</a>
          &gt; {campus.name} Programs ({programs.length})
        </h2>
        <h2 className="fw-bold text-dark"></h2>
        <IoAddCircleSharp
          className="green_logo"
          style={{ cursor: "pointer" }}
          size={40}
          onClick={() => navigate(`/${urlName}/${campusUrlName}/programs/new`)}
        />
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Program"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div
        className="search-bar"
        style={{
          width: "40%",
          display: "flex",
          margin: "20px",
          alignItems: "center",
        }}
      >
        <select
          type="text"
          placeholder="Search Program"
          className="form-control"
          value={typeValue}
          onChange={(e) => setTypeValue(e.target.value)}
        >
          <option value="">Select degree type</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Postgraduate">Postgraduate</option>
        </select>
        <AiOutlineSearch
          color="green"
          size={30}
          style={{
            margin: "0px 5px",
          }}
          onClick={() => handleSearch(typeValue)}
        />
        <BiRefresh
          color="red"
          size={30}
          style={{
            margin: "0px 5px",
          }}
          onClick={() => handleReset(typeValue)}
        />
      </div>
      {role === "superadmin" && selectedRows.length > 0 ? (
        <Button
          variant="primary"
          style={{ margin: "20px 20px" }}
          onClick={() => {
            setMassUpdate(true);
          }}
        >
          Mass update
        </Button>
      ) : (
        ""
      )}
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

      {/*Mass update*/}
      <Modal
        show={massUpdate}
        onHide={() => {
          setMassUpdate(false);
          setSelectedRows([]);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Mass update programs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MassUpdate
            selectedRows={selectedRows}
            setPopupText={setPopupText}
            setPopupColor={setPopupColor}
            setMassUpdate={setMassUpdate}
            setPopupshow={setPopupshow}
            config={config}
          />
        </Modal.Body>
      </Modal>

      {/* Delete modal */}
      <Modal show={openModal} onHide={setOpenModal}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <SureModal
            url={"https://crm.internationaleducationoffice.co.uk/programs/"}
            ids={selectedRows}
            name={["Program", "Programs"]}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
            showText={"Deleting programs will also delete it's applications"}
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
              <th>Country</th>
              <th>City</th>
              <th>Banner Image</th>
              <th>Duration</th>
              <th>Annual fees</th>
              <th>Scholarship fees</th>
              <th>Degree type</th>
              <th>Sessions</th>
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
                <td>{item.country?.name}</td>
                <td>{item.city?.name}</td>
                <img
                  src={`https://crm.internationaleducationoffice.co.uk/programs/images/${item.image}`}
                  width={"100"}
                  height={"50"}
                  // className="imageInCategory"
                />
                <td>{item.duration}</td>
                <td>{item.annualTutionFees}</td>
                <td>{item.scholarship}</td>
                <td>{item.programType.graduate}</td>
                <td>
                  {item.startData?.map((row, index) => (
                    <span key={index}>
                      {row.startMonth}
                      {index < item.startData.length - 1 ? ", " : ""}
                    </span>
                  ))}
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

export default DatatableFiltered;
