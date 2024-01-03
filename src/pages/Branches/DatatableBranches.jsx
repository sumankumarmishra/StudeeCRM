import "../../style/datatable.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import "../Members/members.css";
import { IoAddCircleSharp } from "react-icons/io5";
import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";
import SureModal from "../../components/SureModel/SureModal";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

const DatatableBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [filteredCount, setTotalfilteredCount] = useState(0);
  const [allBranches, setAllBranches] = useState([]);
  const [page_number, setPageNumber] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [popUpColor, setPopupColor] = useState("green");
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("+92");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedRow, setSelectRow] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("ieodkvToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [selectAll, setSelectAll] = useState(false);
  const [maxPagesToShow] = useState(10); // Set the maximum number of pages to show.

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

  useEffect(() => {
    axios
      .get(`https://crm.internationaleducationoffice.co.uk/branches`, config)
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
        `https://crm.internationaleducationoffice.co.uk/branches/filter/${page_number}`,
        config
      )
      .then((response) => {
        setBranches(response.data);
        setAllBranches(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [page_number]);

  useEffect(() => {
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/reports/dashboard",
        config
      )
      .then((response) => {
        setTotalCount(response.data.branches);
        setTotalfilteredCount(response.data.branches);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/core-settings/country",
        config
      )
      .then((response) => {
        setAllCountries(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (country) {
      axios
        .get(
          "https://crm.internationaleducationoffice.co.uk/core-settings/city",
          config
        )
        .then((response) => {
          const filterCity = response.data.data.filter(
            (row) => row.country === country
          );
          setAllCities(filterCity);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [country]);

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
    setBranches(filtered);
    setTotalCount(filtered.length);
    setFilter(true);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // If not selected all, add all branch IDs to selectedRows
      const allBranchIds = branches.map((branch) => branch._id);
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
    setBranches(allBranches);
    setTotalCount(filteredCount);
  };
  // Add member
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      address: address,
      phoneNo: phoneNo,
      country: country,
      city: city,
    };
    axios
      .post(
        "https://crm.internationaleducationoffice.co.uk/branches",
        data,
        config
      )
      .then((response) => {
        setName("");
        setPhoneNo("+92");
        setCity("");
        setCountry("");
        setAllCities([]);
        setPopupColor("green");
        setAddress("");
        setPopupshow(true);
        setPopupText(`Branch Added`);
        setOpenAddModal(false);
        setTimeout(() => {
          setOpenAddModal(false);
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
      address: address,
      phoneNo: phoneNo,
      country: country,
      city: city,
    };
    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/branches/${selectedRow}`,
        data,
        config
      )
      .then((response) => {
        setName("");
        setPhoneNo("+92");
        setCity("");
        setCountry("");
        setPopupColor("orange");
        setAllCities([]);
        setAddress("");
        setPopupshow(true);
        setPopupText(`Branch Updated`);
        setOpenAddModal(false);
        setTimeout(() => {
          setOpenUpdateModal(false);
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
            setPhoneNo(data.phoneNo);
            setAddress(data.address);
            setCountry(data.country);
            setCity(data.city);
          }}
          className="btn btn-primary green_bg_logo"
        >
          Update
        </div>
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
        <h1 className="text-black fw-bold">Branches ({totalCount})</h1>
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
          <i class="fa-solid fa-plus me-1"></i> Add Branch
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
      {/*Add*/}
      <Modal
        show={openAddModal}
        onHide={() => {
          setOpenAddModal(false);
          setName("");
          setPhoneNo("+92");
          setCity("");
          setCountry("");
          setAllCities([]);
          setAddress("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add Branch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <p style={{ color: "red", fontSize: 20 }}>{errorMessage}</p>
            <Form.Group controlId="formName">
              <Form.Label className="fw-bold">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label className="pt-2 fw-bold">Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPhoneNo">
              <Form.Label className="pt-2 fw-bold">Phone No.</Form.Label>
              <PhoneInput
                country={"pk"} // Set the default country
                value={phoneNo}
                onChange={(value, data) => setPhoneNo(`+${value}`)}
              />
            </Form.Group>

            <Form.Group controlId="formCountry">
              <Form.Label className="pt-2 fw-bold">Country</Form.Label>
              <Form.Control
                as="select"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              >
                <option value="">Select country</option>
                {allCountries.map((row, index) => (
                  <option value={row.name} key={index}>
                    {row.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formCity">
              <Form.Label className="pt-2 fw-bold">City</Form.Label>
              <Form.Control
                as="select"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              >
                <option value="">Select city</option>
                {allCities.map((row, index) => (
                  <option value={row.name} key={index}>
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

      {/*Update*/}
      <Modal
        show={openUpdateModal}
        onHide={() => {
          setOpenUpdateModal(false);
          setName("");
          setPhoneNo("");
          setCity("");
          setCountry("");
          setAllCities([]);
          setAddress("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Update Branch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <p style={{ color: "red", fontSize: 20 }}>{errorMessage}</p>
            <Form.Group controlId="formName">
              <Form.Label className="fw-bold">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2" controlId="formAddress">
              <Form.Label className="fw-bold">Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2" controlId="formPhoneNo">
              <Form.Label className="fw-bold">Phone No.</Form.Label>
              <PhoneInput
                country={"pk"} // Set the default country
                value={phoneNo}
                onChange={(value, data) => setPhoneNo(`+${value}`)}
              />
            </Form.Group>

            <Form.Group className="mt-2" controlId="formCountry">
              <Form.Label className="fw-bold">Country</Form.Label>
              <Form.Control
                as="select"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              >
                <option value="">Select country</option>
                {allCountries.map((row, index) => (
                  <option value={row.name} key={index}>
                    {row.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mt-2" controlId="formCity">
              <Form.Label className="fw-bold">City</Form.Label>
              <Form.Control
                as="select"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              >
                <option value="">Select city</option>
                {allCities.map((row, index) => (
                  <option value={row.name} key={index}>
                    {row.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button className="mt-3" variant="primary" type="submit">
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
            url={"https://crm.internationaleducationoffice.co.uk/branches/"}
            ids={selectedRows}
            name={["Branch", "Branches"]}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
            showText={"Deleting branches will also delete it's members"}
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
              <th>Phone No</th>
              <th>Address</th>
              <th>Country</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((item, index) => (
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
                <td>{item.phoneNo}</td>
                <td>{item.address}</td>
                <td>{item.country}</td>
                <td>{item.city}</td>
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

export default DatatableBranches;
