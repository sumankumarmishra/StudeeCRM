import "../../style/datatable.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import "../Members/members.css";
import { IoAddCircleSharp } from "react-icons/io5";
import {
  Table,
  Modal,
  Button,
  Form,
  FormControl,
  Pagination,
} from "react-bootstrap";
import Select from "react-select";
import SureModal from "../../components/SureModel/SureModal";
import { CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

const DatatableCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [page_number, setPageNumber] = useState(false);
  const [filteredCount, setTotalfilteredCount] = useState(0);
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [popUpShow, setPopupshow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [popUpColor, setPopupColor] = useState("green");
  const [popUpText, setPopupText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [name, setName] = useState("");
  const [mediums, setMediums] = useState([]);
  const [allMediums, setAllMediums] = useState([]);
  const [template, setTemplate] = useState("");
  const [allTemplates, setAllTemplates] = useState([]);
  const [university, setUniversity] = useState("");
  const [allUniversities, setAllUniversities] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedRow, setSelectRow] = useState("");
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("ieodkvToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState(campaigns);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
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
      .get("https://crm.internationaleducationoffice.co.uk/campaigns", config)
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
        `https://crm.internationaleducationoffice.co.uk/campaigns/filter/${page_number}`,
        config
      )
      .then((response) => {
        setCampaigns(response.data);
        setAllCampaigns(response.data);
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
        setTotalCount(response.data.campaigns);
        setTotalfilteredCount(response.data.campaigns);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://crm.internationaleducationoffice.co.uk/mediums", config)
      .then((response) => {
        const mediumsArrange = response.data.map((row) => {
          return {
            _id: row._id,
            value: row._id,
            label: row.name,
            name: row.name,
          };
        });
        setAllMediums(mediumsArrange);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://crm.internationaleducationoffice.co.uk/templates", config)
      .then((response) => {
        setAllTemplates(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/universities",
        config
      )
      .then((response) => {
        setAllUniversities(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = filteredBranches.filter((campaign) => {
      // Check if any of the campaign's fields match the search query
      const matches = Object.entries(campaign).some(([key, value]) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        if (key === "university" && typeof value === "object") {
          return value?.universityName
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }
        if (key === "member" && typeof value === "object") {
          return value?.username
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }
        return false;
      });

      // Check if any of the names in the mediums array match the search query
      const mediumMatches = campaign.mediums?.some((medium) =>
        medium.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Combine the matches from both campaign fields and medium names
      return matches || mediumMatches;
    });

    setCampaigns(filtered);
    setTotalCount(filtered.length);
    setFilter(true);
  };

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
    setCampaigns(allCampaigns);
    setTotalCount(filteredCount);
  };
  // Add member
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      mediums: mediums,
      member: id,
      template: template,
      university: university,
    };
    axios
      .post(
        "https://crm.internationaleducationoffice.co.uk/campaigns",
        data,
        config
      )
      .then((response) => {
        setName("");
        setMediums([]);
        setTemplate("");
        setPopupColor("green");
        setPopupshow(true);
        setPopupText(`Campaign Added`);
        setOpenAddModal(false);
        setTimeout(() => {
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
      mediums: mediums,
      member: id,
      template: template,
    };
    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/campaigns/${selectedRow}`,
        data,
        config
      )
      .then((response) => {
        setName("");
        setMediums([]);
        setPopupColor("orange");
        setTemplate("");
        setPopupshow(true);
        setPopupText(`Campaign Updated`);
        setOpenUpdateModal(false);
        setTimeout(() => {
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

  const handleDelete = (id) => {
    axios
      .delete(
        "https://crm.internationaleducationoffice.co.uk/campaigns/" + id,
        config
      )
      .then((response) => {
        setPopupshow(true);
        setPopupText("Campaign Deleted");
        setTimeout(() => {
          setPopupshow(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Delete list of applications
  const handleDeleteSelectedRows = (e) => {
    e.preventDefault();
    try {
      selectedRows.forEach((row) => {
        axios
          .delete(
            "https://crm.internationaleducationoffice.co.uk/campaigns/" + row,
            config
          )
          .then((response) => {
            setPopupshow(true);
            setPopupText(`${selectedRows.length} Campaigns Deleted`);
          });
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 2000);
      });
    } catch (error) {
      console.log(error);
    }
    setSelectedRows([]);
  };

  const handleChangeStatus = (id, status) => {
    axios
      .patch(
        `https://crm.internationaleducationoffice.co.uk/campaigns/${id}`,
        {
          status: status,
        },
        config
      )
      .then((response) => {
        setPopupText("Status Changed");
        setPopupshow(true);
        setTimeout(() => {
          setPopupshow(false);
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
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
            setTemplate(data.template._id);
            const mediumsArrange = data.mediums.map((row) => {
              return {
                _id: row._id,
                value: row._id,
                label: row.name,
                name: row.name,
              };
            });
            setMediums(mediumsArrange);
            setUniversity(data.university._id);
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
        <h1 className="text-black fw-bold">Campaigns ({totalCount})</h1>
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
          <i class="fa-solid fa-plus me-1"></i>Add Campaign
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
          setSelectRow("");
          setMediums([]);
          setTemplate("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-black">Add Campaign</Modal.Title>
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
            <Form.Group controlId="formCountry">
              <Form.Label className="pt-2">University</Form.Label>
              <Form.Control
                as="select"
                value={university}
                onChange={(e) => {
                  setUniversity(e.target.value);
                }}
              >
                <option value="">Select university</option>
                {allUniversities.map((row, index) => (
                  <option value={row._id} key={index}>
                    {row.universityName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label className="pt-2">Mediums</Form.Label>
              <Select
                options={allMediums}
                isMulti
                value={mediums}
                onChange={(selected) => setMediums(selected)}
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label className="pt-2">Template</Form.Label>
              <Form.Control
                as="select"
                value={template}
                onChange={(e) => {
                  setTemplate(e.target.value);
                }}
              >
                <option value="">Select template</option>
                {allTemplates.map((row, index) => (
                  <option value={row._id} key={index}>
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
          setSelectRow("");
          setMediums([]);
          setTemplate("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Campaign</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
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
            <Form.Group controlId="formCountry">
              <Form.Label>University</Form.Label>
              <Form.Control
                as="select"
                value={university}
                onChange={(e) => {
                  setUniversity(e.target.value);
                }}
              >
                <option value="">Select university</option>
                {allUniversities.map((row, index) => (
                  <option value={row._id} key={index}>
                    {row.universityName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label>Mediums</Form.Label>
              <Select
                options={allMediums}
                isMulti
                value={mediums}
                onChange={(selected) => setMediums(selected)}
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label>Template</Form.Label>
              <Form.Control
                as="select"
                value={template}
                onChange={(e) => {
                  setTemplate(e.target.value);
                }}
              >
                <option value="">Select template</option>
                {allTemplates.map((row, index) => (
                  <option value={row._id} key={index}>
                    {row.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
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
            url={"https://crm.internationaleducationoffice.co.uk/campaigns/"}
            ids={selectedRows}
            name={["Campaign", "Campaigns"]}
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
              <th>Member</th>
              <th>Unversity</th>
              <th>Medium</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((item, index) => (
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
                <td>{item.member?.username}</td>
                <td>{item.university?.universityName}</td>
                <td>
                  {item.mediums?.map((row, rowIndex) => {
                    return <p key={rowIndex}>{row.name} </p>;
                  })}
                </td>
                <td>
                  <FormControl
                    as="select"
                    value={item.status}
                    onChange={(event) => {
                      const statuses = event.target.value;
                      handleChangeStatus(item._id, statuses);
                    }}
                  >
                    <option value="">Change status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </FormControl>
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

export default DatatableCampaigns;
