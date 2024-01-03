import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import "../Country/country.css";
import { CircularProgress } from "@mui/material";
import { Link, json } from "react-router-dom";
import Logs from "./Logs";
import Desks from "./Desks";
import Status from "./Status";
import SearchIcon from "@mui/icons-material/Search";
import DocumentModel from "../MyCases/DocumentModel";
import EmailModel from "../MyCases/EmailModel";
import {
  Table,
  Modal,
  Button,
  Pagination,
  Form,
  Dropdown,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import SMSModal from "../MyCases/SMSModal";
import ViewModal from "./ViewModal";
import SureModal from "../../components/SureModel/SureModal";
import FilterApplication from "./FilterApplication";
import SearchSubAgent from "./SearchSubAgent";
import DeskModal from "../../components/SureModel/DeskModal";
import GridView from "./GridView";
import WhatsappView from "./WhatsappView";

const DatatableApplication = () => {
  const [applications, setApplications] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [page_number, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalFilteredCount, setTotalFilteredCount] = useState(0);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openWhatsappModal, setOpenWhatsappModal] = useState(false);
  const [filter, setFilter] = useState(false);
  const [popUpShow, setPopupshow] = useState(false);
  const [name, setName] = useState([]);
  const [popUpText, setPopupText] = useState("");
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openGridModal, setOpenGridModal] = useState(false);
  const [showFields, setShowFields] = useState([]);
  const [popUpColor, setPopupColor] = useState("green");
  const [openModal, setOpenModal] = useState(false);
  const [openAssignModal, setAssignModal] = useState(false);
  const [openSMSModal, setOpenSMSModal] = useState(false);
  const [openDocumentModal, setOpenDocumentModal] = useState(false);
  const [openLogs, setOpenLogs] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openDesks, setOpenDesks] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applicationLoading, setApplicationLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [caseowner, setCase] = useState("");
  const [currentDesk, setCurrentDesk] = useState("");
  const [data, setData] = useState({});
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("ieodkvToken");
  const [keys, setKeys] = useState([]);
  const id = localStorage.getItem("id");
  const [maxPagesToShow] = useState(10); // Set the maximum number of pages to show.

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = applications.slice(indexOfFirstItem, indexOfLastItem);

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

  useEffect(async () => {
    try {
      const response = await axios.get(
        `https://crm.internationaleducationoffice.co.uk/applications`,
        config
      );

      setFilteredBranches(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [filteredBranches]);

  useEffect(async () => {
    try {
      const response = await axios.get(
        `https://crm.internationaleducationoffice.co.uk/members`,
        config
      );
      // .then((response) => {
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
      setMembers(response.data);
      // try {
      //   const sessionStorage = localStorage.getItem(`userData${id}`);
      //   const userGet = JSON.parse(sessionStorage);
      //   setShowFields(userGet);
      // } catch (error) {
      //   console.log(error);
      // }
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.get(
        `https://crm.internationaleducationoffice.co.uk/members/member1/${id}`,
        config
      );
      setShowFields(response.data?.showFields);
      // axios
      //   .get(
      //     `https://crm.internationaleducationoffice.co.uk/members/member1/${id}`,
      //     config
      //   )
      //   .then((response) => {
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    } catch (error) {
      console.log(error);
    }

    // try {
    //   const gridStorage = localStorage.getItem(`gridKeys${id}`);
    //   const gridGet = JSON.parse(gridStorage);
    //   setKeys(gridGet);
    //   setLoading(false);
    // } catch (error) {
    //   console.log(error);
    // }
    // axios
    //   .get(`https://crm.internationaleducationoffice.co.uk/applications/grid_keys`, config)
    //   .then((response) => {
    //     setKeys(response.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [showFields, members]);
  useEffect(() => {
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/applications/grid_keys`,
        config
      )
      .then((response) => {
        // const transformedKeys = response.data
        //   .map((key) => {
        //     if (key.type === "Date") {
        //       return [
        //         {
        //           label: `${key.key}Date`,
        //           placeholder: "Enter Phone no",
        //           key: `${key.key}Date`,
        //           type: "String",
        //         },
        //         {
        //           label: `${key.key}Month`,
        //           placeholder: "Enter Phone no",
        //           key: `${key.key}Month`,
        //           type: "String",
        //         },
        //         {
        //           label: `${key.key}Year`,
        //           placeholder: "Enter Phone no",
        //           key: `${key.key}Year`,
        //           type: "String",
        //         },
        //       ];
        //     } else {
        //       return key; // Keep keys with types other than 'Date' as they are
        //     }
        //   })
        //   .flat(); // Flatten the array to remove nested arrays

        setKeys(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [keys]);

  useEffect(() => {
    axios
      .get(
        `https://crm.internationaleducationoffice.co.uk/applications/number/${page_number}`,
        config
      )
      .then((response) => {
        setApplications(response.data);
        setApplicationLoading(false);
        setFilteredApplications(response.data);
      })
      .catch((error) => {
        console.log(error);
        setApplicationLoading(false);
      });
    // axios
    //   .get(`https://crm.internationaleducationoffice.co.uk/applications`, config)
    //   .then((response) => {
    //     setApplications(response.data);
    //     setApplicationLoading(false);
    //     console.log(response.data);
    //     setFilteredApplications(response.data);
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
        setTotalCount(response.data.current_owner_not_null);
        setTotalFilteredCount(response.data.current_owner_not_null);
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
          <Dropdown.Item
            as={Link}
            to={`/applications/update/${data?._id}/${data.studentId?._id}`}
            state={{ data: data, application: true }}
          >
            Update
          </Dropdown.Item>
          {/* <Dropdown.Item
            onClick={() => {
              setOpenWhatsappModal(true);
              setSelectedRow(data);
            }}
          >
            Whatsapp
          </Dropdown.Item> */}

          {/* <Dropdown.Item
            onClick={() => {
              setOpenDocumentModal(true);
              setSelectedRow(data);
            }}
          >
            Documents
          </Dropdown.Item> */}
          {/* 
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
          </Dropdown.Item> */}
          <Dropdown.Item
            onClick={() => {
              setOpenModal(true);
              setSelectedRows([data?._id]);
            }}
          >
            Delete
          </Dropdown.Item>
          {/* <Dropdown.Item
            onClick={() => {
              setOpenStatus(true);
              setSelectedRow(data);
            }}
          >
            Lead status
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setOpenLogs(true);
              setSelectedRow(data);
            }}
          >
            Logs
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setOpenDesks(true);
              setSelectedRow(data);
            }}
          >
            Desks
          </Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <div
      className="datatable"
      style={{ height: "800px", overflow: "hidden", overflowY: "scroll" }}
    >
      <div className="text-start me-5 mb-3">
        <h2 className="text-black fw-bold">
          Assigned Applications ({totalCount})
        </h2>
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
        <SearchSubAgent
          filteredBranches={filteredBranches}
          id={id}
          config={config}
          setTotalCount={setTotalCount}
          setItemsPerPage={setItemsPerPage}
          condition={"Assigned"}
          setApplications={setApplications}
          setFilter={setFilter}
        />
        {/* Filter */}
        <div>
          {role === "superadmin" && (
            <Button
              variant="danger"
              style={{ margin: "20px 10px" }}
              onClick={() => {
                setOpenModal(true);
              }}
              disabled={selectedRows.length > 0 ? false : true}
            >
              Delete {selectedRows.length} Selected Rows
            </Button>
          )}
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
              setOpenGridModal(true);
            }}
          >
            Grid View
          </Button>
        </div>
      </div>

      {selectedRows.length > 0 ? (
        <Container className="mt-3">
          <Row className="align-items-center">
            <Col xs="auto">
              <h6>Assign to:</h6>
            </Col>
            <Col xs="auto">
              <Form.Select
                value={caseowner}
                onChange={(e) => {
                  setCase(e.target.value);
                  setName(["Case assigned", "Cases assigned"]);
                  setData({
                    current_desk: e.target.value,
                    case_owner: e.target.value,
                  });
                  setAssignModal(true);
                }}
                disabled={selectedRows.length <= 0 ? true : false}
              >
                <option value=""></option>
                {members.map((row) => (
                  <option value={row._id}>
                    {row.username}-{row.role.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col xs="auto">
              <h6>Current desk:</h6>
            </Col>
            <Col xs="auto">
              <Form.Select
                value={currentDesk}
                onChange={(e) => {
                  setData({
                    current_desk: e.target.value,
                  });
                  setName(["Desk changed", "Desks changed"]);
                  setCurrentDesk(e.target.value);
                  setAssignModal(true);
                }}
                disabled={selectedRows.length <= 0 ? true : false}
              >
                <option value=""></option>
                {members.map((row) => (
                  <option value={row._id}>
                    {row.username}-{row.role.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Container>
      ) : (
        ""
      )}
      {/*Whatapp Modal*/}
      <Modal
        show={openWhatsappModal}
        onHide={() => {
          setOpenWhatsappModal(false);
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Whatsapp window</Modal.Title>
        </Modal.Header>

        <WhatsappView data={selectedRow} />
      </Modal>

      {/*Grid Modal*/}
      <Modal
        size="lg"
        show={openGridModal}
        onHide={() => {
          setOpenGridModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Choose Grid Fields</Modal.Title>
        </Modal.Header>

        <GridView data={showFields} />
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
          <Modal.Title className="fw-bold">Filter Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FilterApplication
            config={config}
            id={id}
            setItemsPerPage={setItemsPerPage}
            setTotalCount={setTotalCount}
            condition={"Assigned"}
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
          <Modal.Title>Send email</Modal.Title>
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
      {/* Send SMS */}
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
      {/* All logs */}
      <Modal
        show={openLogs}
        onHide={() => {
          setOpenLogs(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Logs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Logs data={selectedRow.logs} />
        </Modal.Body>
      </Modal>

      {/*Desks*/}
      <Modal
        show={openDesks}
        onHide={() => {
          setOpenDesks(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>All Desks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Desks data={selectedRow.desks} />
        </Modal.Body>
      </Modal>

      {/*Activity*/}
      <Modal
        show={openStatus}
        onHide={() => {
          setOpenStatus(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>All Desks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Status data={selectedRow.activity} />
        </Modal.Body>
      </Modal>

      {/* Assign modal */}
      <Modal show={openAssignModal} onHide={setAssignModal}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <DeskModal
            url={
              "https://crm.internationaleducationoffice.co.uk/applications/update_row_table/"
            }
            ids={selectedRows}
            name={name}
            setPopupText={setPopupText}
            setPopupshow={setPopupshow}
            data={data}
            setPopupColor={setPopupColor}
            setUpClose={setAssignModal}
            config={config}
          />
        </Modal.Body>
      </Modal>

      {/* Delete modal */}
      <Modal show={openModal} onHide={setOpenModal}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <SureModal
            url={"https://crm.internationaleducationoffice.co.uk/applications/"}
            ids={selectedRows}
            name={["Application", "Applications"]}
            setPopupText={setPopupText}
            navigate={"/applications"}
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
                        : row.headerName}
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

export default DatatableApplication;
