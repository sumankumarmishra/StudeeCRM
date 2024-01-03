import axios, { all } from "axios";
import "../../style/datatable.css";
import "./guides.css";
import "../../style/list.scss";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PopupAlert from "../../components/popupalert/popupAlert";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { IoIosAddCircleOutline } from "react-icons/io";
import ReactQuill from "react-quill";
import { RxCross1 } from "react-icons/rx";
import { CircularProgress } from "@mui/material";
import { IoAddCircleSharp } from "react-icons/io5";
import { Table, Modal, Form, Button, Pagination } from "react-bootstrap";
import NewGuide1 from "./NewGuide1";
import SureModal from "../../components/SureModel/SureModal";

const Guide1Table = () => {
  const location = useLocation();
  const id = location.state.data;
  const urlName = location.state.name;
  const [name, setName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [popUpColor, setPopupColor] = useState("green");
  const [guideName, setGuideName] = useState("");
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [description, setDescription] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [image, setImage] = useState(null);
  const [allGuides, setAllGuides] = useState([]);
  const [headingName, setHeadingName] = useState("");
  const [content, setContent] = useState("");
  const [heading, setHeading] = useState([]);
  const [openHeading, setOpenHeading] = useState(false);
  const [guideId, setGuideId] = useState();
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("ieodkvToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState(allGuides);
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
      .get(`https://crm.internationaleducationoffice.co.uk/guides/${urlName}`, config)
      .then((response) => {
        setAllGuides(response.data.allGuides);
        setName(response.data.name);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [allGuides]);

  useEffect(() => {
    axios
      .get("https://crm.internationaleducationoffice.co.uk/countries", config)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [countries]);

  useEffect(() => {
    const filtered = allGuides.filter((branch) =>
      Object.values(branch).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );
    setFilteredBranches(filtered);
  }, [searchQuery, allGuides]);

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

  const handleUpdateGuide = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("guideName", guideName);
    formData.append("country", country);
    formData.append("tagLine", tagLine);
    formData.append("description", description);
    heading.forEach((headingObj, index) => {
      formData.append(`heading[${index}][headingName]`, headingObj.headingName);
      formData.append(`heading[${index}][content]`, headingObj.content);
    });

    axios
      .put(
        `https://crm.internationaleducationoffice.co.uk/guides/${id}/${guideId}`,
        formData,
        config
      )
      .then((response) => {
        setAllGuides(response.data);
        setPopupText("Guide Updated");
        setPopupColor("orange");
        setCountry("");
        setPopupshow(true);
        setOpenViewModal(false);
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  };

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const AddHeading = () => {
    setHeading([...heading, { headingName: headingName, content, content }]);
    setHeadingName("");
    setContent("");
  };

  const handleDeleteHeading = (headingName) => {
    setHeading(heading.filter((row) => row.headingName !== headingName));
  };

  const actions = (data) => {
    return (
      <div className="cellAction">
        <div
          className="btn btn-primary green_bg_logo"
          onClick={() => {
            setOpenViewModal(true);
            setGuideName(data.guideName);
            setDescription(data.description);
            setTagLine(data.tagLine);
            setCountry(data.country);
            setHeading(data.heading);
            setGuideId(data._id);
          }}
        >
          Update
        </div>
        {urlName !== "visas-&-travel" && role === "superadmin" ? (
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
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div>
          <div className="datatable">
            <div className="datatableTitle">
              <h2 className="heading-top text-dark ps-3 fw-bold">
                <a href="/guides" style={{ color: "black" }}>Guides </a>
                &gt; {name} ({allGuides.length})
              </h2>
              <h2 className="text-dark fw-bold">{name}</h2>
              {/* <IoAddCircleSharp
                className="green_logo"
                style={{ cursor: "pointer" }}
                size={40}
                onClick={() => setOpenAddModal(true)}
              /> */}
              <button className="btn btn-primary" style={{ backgroundColor: "#2F9444", border: "none", height: "38px" }}
                onClick={() => setOpenAddModal(true)}

              >
                <i class="fa-solid fa-plus me-1"></i>Add Data</button>
            </div>
            <div className="search-bar">
              <input
                type="text"
                className="form-control"
                placeholder="Search Guide"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

            {/* Add */}
            <Modal
              show={openAddModal}
              onHide={() => {
                setOpenAddModal(false);
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title className="fw-bold">Add Data</Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  height: "600px",
                  overflow: "hidden",
                  overflowY: "scroll",
                }}
              >
                <NewGuide1
                  setOpenAddModal={setOpenAddModal}
                  setPopupText={setPopupText}
                  setPopupshow={setPopupshow}
                  name={name}
                />
              </Modal.Body>
            </Modal>

            {/* Update */}
            <Modal
              show={openViewModal}
              onHide={() => {
                setOpenViewModal(false);
                setCountry("");
                setHeading([]);
                setGuideName("");
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title className="fw-bold">Update Guide Data</Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  height: "700px",
                  overflow: "hidden",
                  overflowY: "scroll",
                }}
              >
                <Form onSubmit={handleUpdateGuide}>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      value={guideName}
                      onChange={(e) => setGuideName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formName">
                    <Form.Label>Tag line</Form.Label>
                    <ReactQuill
                      value={tagLine}
                      onChange={(value) => setTagLine(value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formName">
                    <Form.Label>Description</Form.Label>
                    <ReactQuill
                      value={description}
                      onChange={(value) => setDescription(value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".png, .jpg, .jpeg, .jfif"
                      name="myFile"
                      onChange={handleImageUpload}
                    />
                  </Form.Group>
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
                      {countries.map((row, index) => (
                        <option value={row.name} key={index}>
                          {row.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formCountry">
                    <div
                      onClick={() => setOpenHeading(!openHeading)}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Form.Label>Add heading</Form.Label>
                      <IoIosAddCircleOutline size={40} color="blue_logo" />
                    </div>
                    {openHeading ? (
                      <Form.Group className="headingForm">
                        <ReactQuill
                          value={headingName}
                          onChange={(value) => setHeadingName(value)}
                        />
                        <ReactQuill
                          value={content}
                          onChange={(value) => setContent(value)}
                        />
                        <Button
                          className="btn btn-primary blue_bg_logo"
                          onClick={AddHeading}
                        >
                          Add
                        </Button>
                      </Form.Group>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                  <div className="headingContent">
                    {heading.length <= 0
                      ? ""
                      : heading.map((row, index) => {
                        return (
                          <Form.Group
                            key={index}
                            className="headingUpdateContent"
                          >
                            <RxCross1
                              size={18}
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleDeleteHeading(row.headingName)
                              }
                            />

                            <div
                              dangerouslySetInnerHTML={{
                                __html: row.headingName,
                              }}
                            ></div>

                            <div
                              dangerouslySetInnerHTML={{
                                __html: row.content,
                              }}
                            ></div>
                          </Form.Group>
                        );
                      })}
                  </div>

                  <Button variant="primary" type="submit">
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
                  url={`https://crm.internationaleducationoffice.co.uk/guides/${id}/`}
                  ids={selectedRows}
                  name={["Guide data", "Multiple Guide data"]}
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
                    <th>Country</th>
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
                              const index = updatedSelectedRows.indexOf(
                                item._id
                              );
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
                      <td>{item.guideName}</td>
                      <td>{item.country ? item.country : "-"}</td>
                      <td>
                        <img
                          src={`https://crm.internationaleducationoffice.co.uk/guides/${item.image}`}
                          width={"50"}
                          height={"50"}
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
        </div>
      </div>
    </div>
  );
};

export default Guide1Table;
