import React from "react";

const ViewUniversity = ({ selectedRow }) => {
  return (
    <div style={{ height: "600px", overflow: "hidden", overflowY: "scroll" }}>
      <div
        dangerouslySetInnerHTML={{ __html: selectedRow.entryRequirements }}
      ></div>
    </div>
  );
};

export default ViewUniversity;
