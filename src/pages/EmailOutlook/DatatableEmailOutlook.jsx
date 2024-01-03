import React from "react";
import { useState } from "react";
import axios from "axios";
import EmailsList from "./EmailsList";
import EmailView from "./EmailView";
import { CircularProgress } from "@mui/material";
import AllEmails from "./AllEmails";
import Compose from "./Compose";

const DatatableEmailOutlook = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectEmail] = useState("");
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [popUpColor, setPopupColor] = useState("green");
  const [loading, setLoading] = useState(false);
  const [credentails, setCredentails] = useState();
  const [option, setOption] = useState("Inbox");
  const options = ["Inbox", "Sent", "Trash", "Archive"];
  const [composeModal, setComposeModal] = useState(false);
  const topOptions = ["Reply", "Forward", "Delete", "Archive"];
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleShow = (data) => {
    axios
      .post("https://crm.internationaleducationoffice.co.uk/imap/incoming", data, config)
      .then((response) => {
        setEmails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          alert(error.response.data);
        }
      });
  };

  const changeOption = (data, type) => {
    console.log(type);
    if (type === "Inbox") {
      axios
        .post("https://crm.internationaleducationoffice.co.uk/imap/incoming", data, config)
        .then((response) => {
          setEmails(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data) {
            alert(error.response.data);
          }
        });
    } else if (type === "Sent") {
      axios
        .post("https://crm.internationaleducationoffice.co.uk/imap/outgoing", data, config)
        .then((response) => {
          setEmails(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data) {
            alert(error.response.data);
          }
        });
    } else if (type === "Trash") {
      axios
        .post("https://crm.internationaleducationoffice.co.uk/imap/trash", data, config)
        .then((response) => {
          setEmails(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data) {
            alert(error.response.data);
          }
        });
    } else if (type === "Archive") {
      axios
        .post("https://crm.internationaleducationoffice.co.uk/imap/archive", data, config)
        .then((response) => {
          setEmails(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data) {
            alert(error.response.data);
          }
        });
    } else {
      setEmails([]);
      setLoading(false);
    }
  };
  const handleUpdate = (optionRow, seqno) => {
    const data = { ...credentails, seqno: seqno };
    if (optionRow === "Reply") {
    } else if (optionRow === "Forward") {
    } else if (optionRow === "Delete" && option !== "Trash") {
      axios
        .post("https://crm.internationaleducationoffice.co.uk/imap/email-to-trash", data, config)
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data) {
            alert(error.response.data);
          }
        });
    } else if (optionRow === "Delete" && option === "Trash") {
      axios
        .post("https://crm.internationaleducationoffice.co.uk/imap//email-deleted", data, config)
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data) {
            alert(error.response.data);
          }
        });
    } else if (optionRow === "Archive") {
      axios
        .post("https://crm.internationaleducationoffice.co.uk/imap/email-to-archive", data, config)
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data) {
            alert(error.response.data);
          }
        });
    } else {
      alert("Invalid option");
    }
  };

  return (
    <div className="emails-main">
      {composeModal ? (
        <div className="modalGuide">
          <div className="modalInnerGuideName">
            <p
              className="closeModal"
              onClick={() => {
                setComposeModal(false);
              }}
            >
              X
            </p>
            <Compose
              credentails={credentails}
              popUpColor={popUpColor}
              popUpText={popUpText}
              popUpShow={popUpShow}
            />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="email-head">
        <div className="btn-compose" onClick={() => setComposeModal(true)}>
          Compose
        </div>
        <div className="email-options-list">
          {topOptions.map((row) => (
            <div
              className="option-set"
              style={
                selectedEmail ? {} : { color: "gray", cursor: "not-allowed" }
              }
              onClick={() => {
                if (selectedEmail) {
                  handleUpdate(row, selectedEmail.seqno);
                }
              }}
            >
              {row}
            </div>
          ))}
        </div>
      </div>
      <div className="emails-grid">
        <div className="all-emails">
          <AllEmails
            setCredentails={setCredentails}
            handleShow={handleShow}
            setLoading={setLoading}
            options={options}
            option={option}
            setOption={setOption}
            changeOption={changeOption}
            setSelectEmail={setSelectEmail}
          />
        </div>
        <div className="email-list">
          {loading ? (
            <CircularProgress />
          ) : emails.length > 0 ? (
            emails.map((row) => (
              <EmailsList
                key={row.id} // Make sure to use a unique key for each element in the array
                email={row}
                setSelectEmail={setSelectEmail}
                credentails={credentails}
              />
            ))
          ) : (
            <p>No emails to display.</p>
          )}
        </div>
        <div className="email-view">
          {loading ? (
            <CircularProgress />
          ) : (
            <EmailView selectedEmail={selectedEmail} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DatatableEmailOutlook;
