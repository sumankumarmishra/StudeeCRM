import React from "react";
import { Table } from "react-bootstrap";

const ViewLogs = ({ data }) => {
  return (
    <div style={{height: "310px",overflow: "hidden", overflowY: "scroll"}}>
      <p>
        <span style={{ fontWeight: "bold" }}>Member</span>:{" "}
        {data.member?.username}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Table</span>: {data.table}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Title</span>: {data.title}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Date & Time</span>:{" "}
        {data.date_time}
      </p>
     <div >
     <Table striped bordered hover >
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.data?.map((item, index) => (
            <tr key={index}>
              <td>{item.field}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
     </div>
    </div>
  );
};

export default ViewLogs;
