import React from "react";

const StatusChoose = ({
  setModal,
  presentStatus,
  setPresentStatus,
  statuses,
}) => {
  const handleCheckboxChange = (statusName) => {
    setPresentStatus((prevStatus) => {
      if (prevStatus.includes(statusName)) {
        return prevStatus.filter((status) => status !== statusName);
      } else {
        return [...prevStatus, statusName];
      }
    });
  };

  return (
    <div>
      {statuses.map((status) => (
        <div key={status.name}>
          <input
          style={{height: "20px",width: "20px"}}
            type="checkbox"
            id={status.name}
            checked={presentStatus.includes(status.name)}
            onChange={() => handleCheckboxChange(status.name)}
          />
          <label className="ms-3" 
          style={{color: "black", fontSize: "20px"}}
          htmlFor={status.name}>{status.name}</label>
        </div>
      ))}
      <button className="btn btn-primary mt-2" onClick={() => setModal(false)}>Apply</button>
    </div>
  );
};

export default StatusChoose;
