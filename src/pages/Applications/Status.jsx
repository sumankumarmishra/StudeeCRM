import React from "react";

const Status = ({ data }) => {
  return (
    <ol>
      {data.map((row, index) => {
        console.log(row.status);
        return (
          <li>
            <div style={{ display: "flex" }}>
              <p>
                {row.status} ( {row.date}-{row.month}-{row.year})
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Status;
