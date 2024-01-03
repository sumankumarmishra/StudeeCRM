import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import "../Country/country.css";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import DocumentModel from "./DocumentModel";
import SearchIcon from "@mui/icons-material/Search";
import EmailModel from "./EmailModel";
import {
  Table,
  Modal,
  Button,
  Pagination,
  Form,
  Dropdown,
  Row,
  Col,
} from "react-bootstrap";
import SMSModal from "./SMSModal";
import ViewModal from "../Applications/ViewModal";
import FilterApplication from "../Applications/FilterApplication";
import DeskModal from "../../components/SureModel/DeskModal";
import GridView from "../Applications/GridView";
import GridStatusView from "../Applications/GridStatusView";
import { debounce } from "lodash";

const DatatableCurrent = () => {
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [page_number, setPageNumber] = useState(1);

  const [totalCount, setTotalCount] = useState(0);
  const [totalFilteredCount, setTotalFilteredCount] = useState(0);
  const [filter, setFilter] = useState(false);
  const [applications, setApplications] = useState([]);
  const [popUpShow, setPopupshow] = useState(false);
  const [openGridModal, setOpenGridModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [showFields, setShowFields] = useState([]);
  const [openSMSModal, setOpenSMSModal] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [openAssignModal, setAssignModal] = useState(false);
  const [data, setData] = useState({});
  const [keys, setKeys] = useState([]);
  const [applicationLoading, setApplicationLoading] = useState(true);

  const [popUpColor, setPopupColor] = useState("green");
  const [loading, setLoading] = useState(true);
  const [openDocumentModal, setOpenDocumentModal] = useState(false);
  const [updateField, setUpdateField] = useState(false);
  const id = localStorage.getItem("id");
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [members, setMembers] = useState([]);
  const [currentdesk, setCurrentDesk] = useState("");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("ieodkvToken");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [maxPagesToShow] = useState(10); // Set the maximum number of pages to show.

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setPageNumber(pageNumber);
    setApplicationLoading(true);
    setCurrentPage(pageNumber);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const debouncedSubmit = debounce(() => {
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/applications/current_desk/number/${page_number}/${id}`,
        config
      )
      .then((response) => {
        setApplications(response.data);
        setFilteredApplications(response.data);
        setApplicationLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, 500);

  useEffect(async () => {
    try {
      const response = await axios.get(
        `https://crm.internationaleducationoffice.co.uk/applications/current_desk/${id}`,
        config
      );

      setFilteredBranches(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [filteredBranches]);

  useEffect(() => {
    axios
      .get(`https://crm.internationaleducationoffice.co.uk/members`, config)
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/members/member1/${id}`,
        config
      )
      .then((response) => {
        setShowFields(response.data?.showFields);
        setUpdateField(response.data?.role?.table.updateField);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/applications/grid_keys`,
        config
      )
      .then((response) => {
        setKeys(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [showFields, members, keys]);

  useEffect(() => {
    debouncedSubmit();
    // axios
    //   .get(
    //     `https://crm.internationaleducationoffice.co.uk/applications/current_desk/number/${page_number}/${id}`,
    //     config
    //   )
    //   .then((response) => {
    //     setApplications(response.data);
    //     setFilteredApplications(response.data);
    //     setApplicationLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [page_number]);

  useEffect(() => {
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/applications/pagination/count`,
        config
      )
      .then((response) => {
        setTotalCount(response.data.current_desk);
        setTotalFilteredCount(response.data.current_desk);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = filteredBranches.filter((application) =>
      Object.entries(application).some(([key, value]) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        if (key === "dynamicFields" && typeof value === "object") {
          // Search through the values of dynamicFields
          return Object.values(value).some((dynamicFieldValue) =>
            dynamicFieldValue.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        return false;
      })
    );
    setApplications(filtered);
    setTotalCount(filtered.length);
    setFilter(true);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allBranchIds = applications.map((branch) => branch?._id);
      setSelectedRows(allBranchIds);
    } else {
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
    setItemsPerPage(8);
    setApplications(filteredApplications);
    setTotalCount(totalFilteredCount);
  };

  const columns = keys.map((key) => ({
    field: key.key,
    headerName: key.label,
    width: 100,
    valueGetter: (params) => {
      const fieldValue = params.row[params.field];
      // Handle specific fields here
      if (params.field === "universityId") {
        return fieldValue ? fieldValue.universityName : "";
      }
      if (params.field === "programType") {
        return fieldValue ? `${fieldValue.name} - ${fieldValue.graduate}` : "";
      } else if (params.field === "programId") {
        return fieldValue ? fieldValue.name : "";
      } else if (
        params.field === "case_owner" &&
        fieldValue &&
        fieldValue.username
      ) {
        return fieldValue.username;
      } else if (
        params.field === "current_desk" &&
        fieldValue &&
        fieldValue.username
      ) {
        return fieldValue.username;
      }
      return fieldValue;
    },
  }));

  const actions = (data) => {
    return (
      <Dropdown alignRight>
        <Dropdown.Toggle variant="link" id="dropdown-basic">
          <i className="fas fa-ellipsis-h"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              setOpenView(true);
              setSelectedRow(data);
            }}
          >
            View
          </Dropdown.Item>
          {updateField || role === "superadmin" ? (
            <Dropdown.Item
              as={Link}
              to={`/applications/update/${data?._id}/${data.studentId?._id}`}
              state={{ data: data, application: false }}
            >
              Update
            </Dropdown.Item>
          ) : (
            ""
          )}
          {/* {documentField && (
            <Dropdown.Item
              onClick={() => {
                setOpenDocumentModal(true);
                setSelectedRow(data);
              }}
            >
              Documents
            </Dropdown.Item>
          )}
          {emailField && (
            <>
              <Dropdown.Item
                onClick={() => {
                  setOpenEmailModal(true);
                  setSelectedRow(data.email);
                }}
              >
                Send Email
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setOpenSMSModal(true);
                  setSelectedRow(data.phoneNo);
                }}
              >
                Send SMS
              </Dropdown.Item>
            </>
          )} */}
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  return (
    <div
      className="datatable"
      style={{ height: "800px", overflow: "hidden", overflowY: "scroll" }}
    >
      <div className="mt-4 mb-4 text-start">
        <h4 className="text-bold fw-bold">Current Desk Cases ({totalCount})</h4>
        {/* {filter ? (
          <Button
            variant="danger"
            style={{ margin: "0px 0px" }}
            onClick={handleResetFilter}
          >
            Reset
          </Button>
        ) : (
          <Button
            variant="primary"
            style={{ margin: "0px 0px" }}
            onClick={() => {
              setOpenFilterModal(true);
            }}
          >
            Filter
          </Button>
        )}{" "}
        <Button
          variant="primary"
          style={{ margin: "0px 20px" }}
          onClick={() => {
            setOpenGridModal(true);
          }}
        >
          Grid View
        </Button> */}
      </div>
      <div
        className="search-bar"
        style={{ display: "flex", alignItems: "center" }}
      >
        <input
          className="form-control p-2 mb-2"
          type="text"
          placeholder="Search Application"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon
          style={{ cursor: "pointer", margin: "0px 5px", color: "blue" }}
          onClick={handleSearch}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Row className="align-items-center">
          <Col xs="auto">
            <h6>Change desk to:</h6>
          </Col>
          <Col xs="auto">
            <Form.Select
              value={currentdesk}
              onChange={(e) => {
                setCurrentDesk(e.target.value);
                setData({
                  current_desk: e.target.value,
                });
                setAssignModal(true);
              }}
              disabled={selectedRows.length <= 0 ? true : false}
            >
              <option value=""></option>
              {members.map((row) => (
                <option key={row._id} value={row._id}>
                  {row.username}- {row.role.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        {/* Filter */}
        <div>
          {filter ? (
            <Button
              variant="danger"
              style={{ margin: "0px 0px" }}
              onClick={handleResetFilter}
            >
              Reset
            </Button>
          ) : (
            <Button
              variant="primary"
              style={{ margin: "0px 0px" }}
              onClick={() => {
                setOpenFilterModal(true);
              }}
            >
              Filter
            </Button>
          )}
          <Button
            variant="primary"
            style={{ margin: "0px 10px" }}
            onClick={() => {
              setOpenStatusModal(true);
            }}
          >
            Filter by Status
          </Button>
          <Button
            variant="primary"
            style={{ margin: "0px 0px" }}
            onClick={() => {
              setOpenGridModal(true);
            }}
          >
            Grid View
          </Button>
        </div>
      </div>

      {/* Assign modal */}
      <Modal show={openAssignModal} onHide={setAssignModal}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <DeskModal
            url={
              "https://crm.internationaleducationoffice.co.uk/applications/update_row_table/"
            }
            ids={selectedRows}
            name={["Desk changed", "Desks changed"]}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
            data={data}
            setPopupColor={setPopupColor}
            setUpClose={setAssignModal}
            config={config}
          />
        </Modal.Body>
      </Modal>

      {/*Grid Modal*/}
      <Modal
        show={openGridModal}
        size="lg"
        onHide={() => {
          setOpenGridModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Choose Grid Fields</Modal.Title>
        </Modal.Header>

        <GridView data={showFields} />
      </Modal>
      {/*Grid Modal*/}
      <Modal
        show={openStatusModal}
        size="lg"
        onHide={() => {
          setOpenStatusModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Filter Applications by Status</Modal.Title>
        </Modal.Header>

        <GridStatusView />
      </Modal>

      {/*View Modal*/}
      <Modal
        show={openView}
        size="lg"
        onHide={() => {
          setOpenView(false);
          setSelectedRow([]);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>View Application</Modal.Title>
        </Modal.Header>

        <ViewModal
          data={applications}
          keys={showFields}
          id={selectedRow?._id}
        />
      </Modal>
      {/*Filter Modal*/}
      <Modal
        show={openFilterModal}
        onHide={() => {
          setOpenFilterModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Filter application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FilterApplication
            config={config}
            id={id}
            condition={"Current Desk"}
            setApplications={setApplications}
            setOpenFilterModal={setOpenFilterModal}
            setFilter={setFilter}
          />
        </Modal.Body>
      </Modal>
      {/*Add content details*/}
      <Modal
        show={openDocumentModal}
        onHide={() => {
          setOpenDocumentModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DocumentModel
            selectedRow={selectedRow}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
          />
        </Modal.Body>
      </Modal>
      {/* Send email */}
      <Modal
        show={openEmailModal}
        onHide={() => {
          setOpenEmailModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Send emails</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmailModel
            selectedRow={selectedRow}
            setOpenEmailModal={setOpenEmailModal}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
          />
        </Modal.Body>
      </Modal>

      {/* SMS */}
      <Modal
        show={openSMSModal}
        onHide={() => {
          setOpenSMSModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Send sms</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SMSModal
            selectedRow={selectedRow}
            setOpenSMSModal={setOpenSMSModal}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
          />
        </Modal.Body>
      </Modal>
      {popUpShow ? (
        <PopupAlert popUpText={popUpText} backgroundColor={popUpColor} />
      ) : (
        ""
      )}
      <div style={{ overflowX: "auto" }}>
        <Table style={{ tableLayout: "fixed" }} striped bordered hover>
          <thead>
            {loading ? (
              <CircularProgress />
            ) : (
              <tr>
                <th style={{ width: "50px" }}>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th style={{ width: "100px" }}>ID</th>
                {columns.map((row, index) => {
                  return (
                    <th style={{ width: "150px" }} key={index}>
                      {row.headerName === "Notes"
                        ? "Remarks"
                        : row.headerName === "Status"
                        ? "Admission Status"
                        : row.headerName}{" "}
                    </th>
                  );
                })}
                <th style={{ width: "150px" }}>Action</th>
              </tr>
            )}
          </thead>
          {applicationLoading ? (
            <p> Loading...</p>
          ) : (
            <tbody>
              {applications.map((item, index) => (
                <tr key={index}>
                  <td style={{ width: "50px" }}>
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
                  <td style={{ width: "100px" }}>{item.application_id}</td>
                  {columns.map((column, columnIndex) => {
                    const cellValue = column.valueGetter({
                      row: item,
                      field: column.field,
                    });
                    const truncatedValue =
                      cellValue && cellValue.length > 20
                        ? `${cellValue.slice(0, 20)}...`
                        : cellValue;
                    return (
                      <td
                        key={columnIndex}
                        style={{
                          maxWidth: "150px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {truncatedValue ? truncatedValue : "-"}
                      </td>
                    );
                  })}
                  <td style={{ width: "150px" }}>{actions(item)}</td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </div>
      {/* Pagination */}
      {!filter ? (
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
      ) : (
        ""
      )}
    </div>
  );
};

export default DatatableCurrent;
