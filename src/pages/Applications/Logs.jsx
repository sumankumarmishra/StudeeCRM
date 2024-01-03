import React from "react";

const Logs = ({ data }) => {
  return (
    <div>
      <ol>
        {data.map((row, index) => {
          if (row.member) {
            return (
              <li>
                <p>
                  <span style={{ fontWeight: "bold" }}>User: </span>
                  {row.member?.username} ({row.member?.role?.name})
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Type: </span>
                  {row.type}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Description: </span>
                  {row.description ? row.description : "-"}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Date: </span>
                  {row.full_date}
                </p>
              </li>
            );
          } else {
            return (
              <li>
                <p>
                  <span style={{ fontWeight: "bold" }}>Type: </span>
                  {row.type}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Description: </span>
                  {row.description ? row.description : "-"}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Date: </span>
                  {row.full_date}
                </p>
              </li>
            );
          }
        })}
      </ol>
    </div>
  );
};

export default Logs;
