import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import { IoAddCircleSharp } from "react-icons/io5";
import { Table, Modal, Button, Form, Pagination } from "react-bootstrap";

const DatatableContent = () => {
  const [content, setContent] = useState([]);
  const [popUpShow, setPopupshow] = useState(false);
  const [openUpdateModel, setOpenUpdateModal] = useState(false);
  const [openAddModel, setOpenAddModal] = useState(false);
  const [name, setName] = useState("");
  const [mainHeadingName, setMainHeadingName] = useState("");
  const [description, setDescription] = useState("");
  const [more, setMore] = useState("");
  const [popUpText, setPopupText] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  const token = localStorage.getItem("ieodkvToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState(content);
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
      .get("https://crm.internationaleducationoffice.co.uk/content", config)
      .then((response) => {
        if (response.data.length > 0) {
          setContent(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [content]);

  useEffect(() => {
    const filtered = content.filter((branch) =>
      Object.values(branch).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );
    setFilteredBranches(filtered);
  }, [searchQuery, content]);

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
    const data = {
      name: name,
      description: description,
      mainHeadingName: mainHeadingName,
      more: more,
    };

    axios
      .post(`https://crm.internationaleducationoffice.co.uk/content/new`, data, config)
      .then((response) => {
        console.log(response.data);
        setPopupText("Content added");
        setName("");
        setOpenAddModal(false);
        setMainHeadingName("");
        setDescription("");
        setPopupshow(true);
        setMore("");
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
      mainHeadingName: mainHeadingName,
      more: more,
    };

    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/content/update/${selectedRow}`,
        data,
        config
      )
      .then((response) => {
        console.log(response.data);
        setPopupText("Content Updated");
        setName("");
        setOpenUpdateModal(false);
        setMainHeadingName("");
        setDescription("");
        setPopupshow(true);
        setMore("");
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <div className="cellAction">
        <div
          className="btn btn-primary green_bg_logo"
          onClick={() => {
            setOpenUpdateModal(true);
            setName(data.name);
            setMore(data.more);
            setDescription(data.description);
            setSelectedRow(data._id);
            setMainHeadingName(data.mainHeadingName);
          }}
        >
          Update
        </div>
        <Link to={`/page-content/${data.urlName}`} state={{ data: data }}>
          <div className="btn btn-primary blue_bg_logo">Headings</div>
        </Link>
      </div>
    );
  };
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <h1 className="text-black fw-bold">Page Content</h1>
        {/* <IoAddCircleSharp
          className="green_logo"
          style={{ cursor: "pointer" }}
          size={40}
          onClick={() => setOpenAddModal(true)}
        /> */}
        <button className="btn btn-primary" style={{ backgroundColor: "#2F9444", border: "none", height: "38px" }}
          onClick={() => setOpenAddModal(true)}

        >
          <i class="fa-solid fa-plus me-1"></i>Add Content</button>
      </div>
      <div className="search-bar">
        <input
          className="form-control p-2 mb-2"
          type="text"
          placeholder="Search Content"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {popUpShow ? (
        <PopupAlert
          popUpText={popUpText}
          backgroundColor={
            popUpText === "Content Added" ? "#8AFF8A" : "#FFC300"
          }
        />
      ) : (
        ""
      )}

      {/*Add*/}
      <Modal
        show={openAddModel}
        onHide={() => {
          setOpenAddModal(false);
          setName("");
          setMore("");
          setMainHeadingName("");
          setDescription("");
          setSelectedRow("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{ overflow: "hidden", overflowY: "scroll", height: "510px" }}
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label className="mt-2">Main Heading Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={mainHeadingName}
                  onChange={(e) => setMainHeadingName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label className="mt-2">Description</Form.Label>
                <ReactQuill
                  value={description}
                  onChange={(value) => setDescription(value)}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write something..."
                />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label className="mt-2">More Description</Form.Label>
                <ReactQuill
                  value={more}
                  onChange={(value) => setMore(value)}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write something..."
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>

      {/*Update basic content details*/}
      <Modal
        show={openUpdateModel}
        onHide={() => {
          setOpenUpdateModal(false);
          setName("");
          setMore("");
          setMainHeadingName("");
          setDescription("");
          setSelectedRow("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Update Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{ overflow: "hidden", overflowY: "scroll", height: "435px" }}
          >
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="formName">
                <Form.Label className="text-dark">Main Heading Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={mainHeadingName}
                  onChange={(e) => setMainHeadingName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label className="mt-2">Description</Form.Label>
                <ReactQuill
                  value={description}
                  onChange={(value) => setDescription(value)}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write something..."
                />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label className="mt-2">More Description</Form.Label>
                <ReactQuill
                  value={more}
                  onChange={(value) => setMore(value)}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write something..."
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Update
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S No.</th>
            <th>Name</th>
            <th>Main Heading</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>

              <td>{item.mainHeadingName ? item.mainHeadingName : "-"}</td>
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
};

export default DatatableContent;
