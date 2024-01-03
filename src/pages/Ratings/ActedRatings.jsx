import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import { Rating } from "@mui/material";

const ActedRatings = () => {
  const [ratings, setRatings] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get("https://crm.internationaleducationoffice.co.uk/ratings", config)
      .then((response) => {
        const filteredRatings = response.data.filter(
          (ratings) => ratings.approve !== null
        );
        setRatings(filteredRatings);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ratings]);

  const handleDelete = (id) => {
    axios
      .delete("https://crm.internationaleducationoffice.co.uk/ratings/" + id, config)
      .then((response) => {
        console.log(response.data);
      });

    setRatings(ratings.filter((el) => el._id !== id));
    setPopupshow(true);
    setPopupText("Rating Deleted");
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
  };

  const handleDeleteSelectedRows = () => {
    selectedRows.forEach((row) => {
      axios
        .delete("https://crm.internationaleducationoffice.co.uk/ratings/" + row, config)
        .then((response) => {
          setRatings(response.data);
          setPopupshow(true);
          setPopupText(`${selectedRows.length} ratings Deleted`);
        });
    });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
    setSelectedRows([]);
  };

  const actionColumn = [
    {
      field: "student.firstname",
      headerName: "Username",
      width: 150,
      valueGetter: (params) => params.row.student.firstname,
    },
    { field: "country", headerName: "Country", width: 150 },
    {
      field: "overallExperience",
      headerName: "Overall Experience",
      width: 300,
      renderCell: (params) => {
        console.log(typeof params.row.overallExperience);
        return (
          <Rating
            name="read-only"
            value={params.row.overallExperience}
            precision={0.5}
            readOnly
          />
        );
      },
    },
    {
      field: "approve",
      headerName: "Approve/Unapprove",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.approve ? (
              <div style={{ color: "green" }}>Approved</div>
            ) : (
              <div style={{ color: "red" }}>Unapproved</div>
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">All Ratings</div>
      {selectedRows.length > 0 ? (
        <button
          onClick={() => {
            handleDeleteSelectedRows();
          }}
        >
          Delete Selected Rows
        </button>
      ) : null}
      {openModal ? (
        <div className="modal">
          <div className="modalInner">
            <p className="closeModal" onClick={() => setOpenModal(false)}>
              &times;
            </p>
            <div style={{ margin: 40 }}>
              <img
                src={`https://crm.internationaleducationoffice.co.uk/ratings/${selectedRow.image}`}
                width={"400"}
                height={"400"}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {popUpShow ? (
        <PopupAlert popUpText={popUpText} backgroundColor={"red"} />
      ) : (
        ""
      )}
      <DataGrid
        className="datagrid"
        rows={ratings}
        columns={actionColumn}
        checkboxSelection={true}
        onSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
        }}
        getRowId={(row) => {
          return row._id;
        }}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default ActedRatings;
