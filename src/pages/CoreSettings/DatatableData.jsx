import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import * as XLSX from "xlsx";
import { IoAddCircleSharp } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import { HiOutlineUpload } from "react-icons/hi";
import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";
import SureModal from "../../components/SureModel/SureModal";

const DatatableData = () => {
  const { urlName } = useParams();
  const [data, setData] = useState([]);
  const [settingName, setSettingName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openImportModal, setOpenImportModal] = useState(false);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [popUpColor, setPopupColor] = useState("green");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [allProvinces, setAllProvinces] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCountry, setShowCountry] = useState(false);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("ieodkvToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState(data);
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
      .get(`https://crm.internationaleducationoffice.co.uk/core-settings/${urlName}`, config)
      .then((response) => {
        setLoading(false);
        const rowsWithSerial = response.data.data.map((row, index) => ({
          ...row,
          serial: index,
        }));
        setData(rowsWithSerial);
        setSettingName(response.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`https://crm.internationaleducationoffice.co.uk/core-settings/country`, config)
      .then((response) => {
        setAllCountries(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);

  useEffect(() => {
    if (country) {
      axios
        .get(`https://crm.internationaleducationoffice.co.uk/core-settings/province`, config)
        .then((response) => {
          const filterProvince = response.data.data.filter(
            (row) => row.country === country
          );
          setAllProvinces(filterProvince);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [country]);

  useEffect(() => {
    const filtered = data.filter((item) =>
      Object.values(item).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );
    setFilteredBranches(filtered);
  }, [searchQuery, data]);

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

  const convertDataToCSV = () => {
    const excelData = data.map((row) => {
      const rowData = {
        name: row.name,
        country: row.country || "",
        province: row.province || "",
        // Add more columns as needed
      };
      return rowData;
    });

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate the Excel file data as a Blob
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a URL from the Blob and trigger the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${urlName}.xlsx`; // Specify the file name with extension (e.g., 'data.xlsx')
    link.click();

    // Clean up the object URL after the download
    URL.revokeObjectURL(url);
  };

  // Import
  const handleFileUpload = async (e) => {
    e.preventDefault();
    const configFile = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        // Make an HTTP POST request to your server's API endpoint
        const response = await axios.post(
          `https://crm.internationaleducationoffice.co.uk/core-settings/api/import/${urlName}`,
          formData,
          configFile
        );

        setPopupText(response.data);
        setPopupshow(true);
        setPopupColor("green");
        setOpenImportModal(false);
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 1500);
      } catch (error) {
        console.log(error);
        if (error.response.data) {
          setErrorMessage(error.response.data);
        }
      }
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      country: country,
      province: province,
    };
    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/core-settings/${urlName}`,
        data,
        config
      )
      .then((response) => {
        setPopupshow(true);
        setPopupText("Data added");
        setName("");
        setCountry("");
        setPopupColor("green");
        setProvince("");
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

  const actions = (data) => {
    return (
      <div className="cellAction">
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
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">
            <div className="top-new">
              <h2 className="heading-top text-dark ps-3 fw-bold">
                <a href="/core-settings">Core Settings </a>
                &gt; {settingName} ({data.length})
              </h2>
            </div>
            <div>
              <HiOutlineUpload
                className="blue_logo"
                style={{ cursor: "pointer" }}
                size={30}
                onClick={() => setOpenImportModal(true)}
              />
              {role === "superadmin" ? (
                <IoMdDownload
                  className="black_logo"
                  style={{ cursor: "pointer" }}
                  size={30}
                  onClick={() => convertDataToCSV()}
                />
              ) : (
                ""
              )}
              <IoAddCircleSharp
                className="green_logo"
                style={{ cursor: "pointer" }}
                size={30}
                onClick={() => setOpenAddModal(true)}
              />
            </div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              className="form-control"
              placeholder="Search Data"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
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
                  url={`https://crm.internationaleducationoffice.co.uk/core-settings/${urlName}/`}
                  ids={selectedRows}
                  name={["Data", "List of data"]}
                  setPopupText={setPopupText}
                  setPopupshow={setPopupshow}
                  showText={""}
                  setPopupColor={setPopupColor}
                  setUpClose={setOpenModal}
                  config={config}
                />
              </Modal.Body>
            </Modal>

            {/*Add Country details*/}
            <Modal
              show={openAddModal}
              onHide={() => {
                setOpenAddModal(false);
                setName("");
                setCountry("");
                setProvince("");
                setErrorMessage("");
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title className="fw-bold">Add Data</Modal.Title>
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
                  <div className="mt-2">
                    <input
                      className="me-2"
                      type="checkbox"
                      value={showCountry}
                      checked={showCountry}
                      onChange={(e) => setShowCountry(e.target.checked)}
                    />
                    Add country and province?
                  </div>
                  {showCountry ? (
                    <>
                      {urlName !== "country" ? (
                        <Form.Group controlId="formCountry">
                          <Form.Label>Country</Form.Label>
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
                      ) : (
                        ""
                      )}
                      {urlName !== "province" && urlName !== "country" ? (
                        <Form.Group controlId="formCountry">
                          <Form.Label>Province</Form.Label>
                          <Form.Control
                            as="select"
                            value={province}
                            onChange={(e) => {
                              setProvince(e.target.value);
                            }}
                          >
                            <option value="">Select province</option>
                            {allProvinces.map((row, index) => (
                              <option value={row.name} key={index}>
                                {row.name}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  <Button className="mt-3" variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
            {/*Import data*/}
            <Modal
              show={openImportModal}
              onHide={() => {
                setOpenImportModal(false);
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Import Data</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleFileUpload}>
                  <p style={{ color: "red", fontSize: 20 }}>{errorMessage}</p>
                  <p style={{ color: "red", fontSize: 12 }}>
                    Note: Make sure to have headings set as name, country and
                    province
                  </p>
                  <Form.Group controlId="formName">
                    <Form.Label>File</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".png, .jpg, .jpeg, .jfif"
                      name="myFile"
                      onChange={handleFileChange}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Import
                  </Button>
                </Form>
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
                    {data.some((row) => row.country) && <th>Country</th>}
                    {data.some((row) => row.province) && <th>Province</th>}

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
                              updatedSelectedRows.splice(item._id, 1);
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
                      {data.some((row) => row.country) && (
                        <td>{item.country}</td>
                      )}
                      {data.some((row) => row.province) && (
                        <td>{item.province}</td>
                      )}
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
        </div>
      </div>
    </div>
  );
};

export default DatatableData;
