import axios from "axios";
import React from "react";

const EmailsList = ({ email, setSelectEmail, credentails }) => {
  const isSeen = email.flags.includes("\\Seen");
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const updateFlag = (seqno) => {
    if (credentails) {
      const flagData = {
        seqno: seqno,
        flags: ["\\Seen"],
        ...credentails,
      };
      axios
        .post("https://crm.internationaleducationoffice.co.uk/imap/update-flag", flagData, config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Invalid credentaisl");
    }
  };
  return (
    <div
      className={`individual-header ${isSeen ? "" : "notseen-email"}`}
      onClick={() => {
        setSelectEmail(email);
        updateFlag(email.seqno);
      }}
    >
      <div className="email-header">
        <div>{email.senderName}</div>
        <div>{email.headers.date}</div>
      </div>
      <div>{email.headers.subject}</div>
    </div>
  );
};

export default EmailsList;
