import React from "react";

const ViewModal = ({ selectedRow }) => {
  return (
    <div>
      <h5 style={{ marginBottom: "20px", textAlign: "center" }}>
        {selectedRow.title}
      </h5>
      <div
        className="desc"
        dangerouslySetInnerHTML={{ __html: selectedRow.description }}
      ></div>
    </div>
  );
};

export default ViewModal;
