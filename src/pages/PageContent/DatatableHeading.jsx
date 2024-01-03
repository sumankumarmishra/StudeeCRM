import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { IoAddCircleSharp } from "react-icons/io5";
import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";

const DatatableHeading = () => {
  const { urlName } = useParams();
  const [data, setData] = useState([]);
  const [heading, setHeading] = useState([]);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpColor, setPopupColor] = useState("green");
  const [openUpdateModel, setOpenUpdateModal] = useState(false);
  const [openAddModel, setOpenAddModal] = useState(false);
  const [headingName, setHeadingName] = useState("");
  const [contentText, setContentText] = useState("");
  const [image, setImage] = useState(null);
  const [popUpText, setPopupText] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("ieodkvToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState(heading);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
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
      .get(`https://crm.internationaleducationoffice.co.uk/content/page/${urlName}`, config)
      .then((response) => {
        setData(response.data);
        if (response.data.heading.length > 0) {
          setHeading(response.data.heading);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);

  useEffect(() => {
    const filtered = heading.filter((branch) =>
      Object.values(branch).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );
    setFilteredBranches(filtered);
  }, [searchQuery, heading]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("headingName", headingName);
    formData.append("contentText", contentText);
    formData.append("image", image);
    formData.append("name", data.name);

    axios
      .post(`https://crm.internationaleducationoffice.co.uk/content/newHeading`, formData, config)
      .then((response) => {
        setPopupText("Heading added");
        setHeadingName("");
        setContentText("");
        setPopupshow(true);
        setPopupColor("green");
        setOpenAddModal(false);
        setImage("");
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        if (error.response.data) {
          console.log(error.response.data);
        }
      });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("headingName", headingName);
    formData.append("contentText", contentText);
    formData.append("image", image);

    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/content/updateHeading/${data._id}/${selectedRow}`,
        formData,
        config
      )
      .then((response) => {
        setPopupText("Heading Updated");
        setHeadingName("");
        setContentText("");
        setPopupColor("orange");
        setPopupshow(true);
        setImage("");
        setOpenUpdateModal(false);
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          console.log(error.response.data);
        }
      });
  };

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // text formatting options
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // header styles
      [{ list: "ordered" }, { list: "bullet" }], // lists
      ["link", "image"], // link and image options
      [{ color: [] }], // color option
      [{ align: [] }], // text alignment option
      [{ size: ["small", false, "large", "huge"] }],
      [{ font: [] }], // custom font style option
      ["clean"], // remove formatting
    ],
  };

  const quillFormats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "header",
    "list",
    "bullet",
    "link",
    "image",
    "color",
    "align",
    "font",
    "size",
  ];

  const actions = (data) => {
    return (
      <div
        className="btn btn-primary green_bg_logo"
        onClick={() => {
          setOpenUpdateModal(true);
          setHeadingName(data.headingName);
          setImage(data.image);
          setContentText(data.contentText);
          setSelectedRow(data._id);
        }}
      >
        Update
      </div>
    );
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className="datatable">
        <div className="datatableTitle">
          <div className="top-new">
            <h2 className="heading-top text-dark ps-3 fw-bold">
              <a href="/page-content" style={{color: "black"}}>Page Content </a>
              &gt; {data.name}
            </h2>
          </div>
          {/* <IoAddCircleSharp
            className="green_logo"
            style={{ cursor: "pointer" }}
            size={40}
            onClick={() => setOpenAddModal(true)}
          /> */}
          <button className="btn btn-primary" style={{ backgroundColor: "#2F9444", border: "none", height: "38px" }}
            onClick={() => setOpenAddModal(true)}

          >
            <i class="fa-solid fa-plus me-1"></i>Add Heading</button>
        </div>
        <div className="search-bar">
          <input
            className="form-control"
            type="text"
            placeholder="Search Heading"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {popUpShow ? (
          <PopupAlert popUpText={popUpText} backgroundColor={popUpColor} />
        ) : (
          ""
        )}

        {/*Add heading details*/}
        <Modal
          show={openAddModel}
          onHide={() => {
            setOpenAddModal(false);
            setHeadingName("");
            setImage("");
            setContentText("");
            setSelectedRow("");
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">Add Heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Heading Name</Form.Label>
                <ReactQuill
                  value={headingName}
                  onChange={(value) => setHeadingName(value)}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write something..."
                />
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label className="mt-2">Content</Form.Label>
                <ReactQuill
                  value={contentText}
                  onChange={(value) => setContentText(value)}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write something..."
                />
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label className="mt-2">Image</Form.Label>
                <Form.Control
                  type="file"
                  accept=".png, .jpg, .jpeg, .jfif"
                  name="myFile"
                  onChange={handleImageUpload}
                />
              </Form.Group>

              <Button className="mt-3" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/*Update basic heading details*/}

        <Modal
          show={openUpdateModel}
          onHide={() => {
            setOpenUpdateModal(false);
            setHeadingName("");
            setImage("");
            setContentText("");
            setSelectedRow("");
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">Update Heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                overflow: "hidden",
                overflowY: "scroll",
                height: "550px",
              }}
            >
              <Form onSubmit={handleUpdate}>
                <Form.Group controlId="formName">
                  <Form.Label>Heading Name</Form.Label>
                  <ReactQuill
                    value={headingName}
                    onChange={(value) => setHeadingName(value)}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Write something..."
                  />
                </Form.Group>
                <Form.Group controlId="formName">
                  <Form.Label className="mt-2">Content</Form.Label>
                  <ReactQuill
                    value={contentText}
                    onChange={(value) => setContentText(value)}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Write something..."
                  />
                </Form.Group>

                <Form.Group controlId="formAddress">
                  <Form.Label className="mt-2">Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".png, .jpg, .jpeg, .jfif"
                    name="myFile"
                    onChange={handleImageUpload}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                  Submit
                </Button>
              </Form>
            </div>
          </Modal.Body>
        </Modal>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S No.</th>
              <th>Heading</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td dangerouslySetInnerHTML={{ __html: item.headingName }}></td>
                <td>
                  <img
                    src={`https://crm.internationaleducationoffice.co.uk/content/images/${item.image}`}
                    alt={data.image}
                    width={400}
                    height={150}
                    style={{ margin: 10 }}
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
  }
};

export default DatatableHeading;
