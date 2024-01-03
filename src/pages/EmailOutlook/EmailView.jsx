import React from "react";

const EmailView = ({ selectedEmail }) => {
  if (selectedEmail) {
    return (
      <div>
        <h6>{selectedEmail.headers.subject}</h6>

        <p>
          From: {selectedEmail.senderName} - {selectedEmail.seqno}
          {selectedEmail.headers.date}
        </p>

        <div dangerouslySetInnerHTML={{ __html: selectedEmail.body }}></div>
      </div>
    );
  } else {
    return <div>Welcome </div>;
  }
};

export default EmailView;
