import React from "react";

const Desks = ({ data }) => {
  return (
    <ol>
      {data.map((row, index) => {
        return (
          <li key={index}>
            <p>{row.username}</p>
          </li>
        );
      })}
    </ol>
  );
};

export default Desks;
