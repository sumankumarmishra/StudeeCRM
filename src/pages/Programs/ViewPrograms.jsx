import React from "react";
import "./programs.css";

const ViewPrograms = ({ data }) => {
  return (
    <div style={{ margin: 40 }}>
      {/*Name*/}
      <div className="allPrograms">
        <h5>Name: </h5>
        <p className="dataProgram">{data.name}</p>
      </div>
      <div className="allPrograms">
        <h5>Duration: </h5>
        <p className="dataProgram">{data.duration}</p>
      </div>
      <div className="allPrograms">
        <h5>Language taught in: </h5>
        <p className="dataProgram">{data.languageThoughtIn}</p>
      </div>
      <div className="allPrograms">
        <h5>Pace: </h5>
        <p className="dataProgram">{data.pace}</p>
      </div>
      <div className="allPrograms">
        <h5>Delivery Method: </h5>
        <p className="dataProgram">{data.deliveryMethod}</p>
      </div>
      <div className="allPrograms">
        <h5>Program Type: </h5>
        <p className="dataProgram">{data.programType.name}</p>
      </div>
      <div className="allPrograms">
        <h5>University Name: </h5>
        <p className="dataProgram">{data.university.universityName}</p>
      </div>
      <div className="allPrograms">
        <h5>Annual Tution fees: </h5>
        <p className="dataProgram">
          {data.annualTutionFees} {data.university.currency}
        </p>
      </div>
      <div className="allPrograms">
        <h5>Country: </h5>
        <p className="dataProgram">{data.country.name}</p>
      </div>
      <div className="allPrograms">
        <h5>City: </h5>
        <p className="dataProgram">{data.city.name}</p>
      </div>
      <div className="allPrograms">
        <h5>Campus: </h5>
        <p className="dataProgram">{data.campus.name}</p>
      </div>
      <h5>Session:</h5>
      {data.startData.map((row) => (
        <ul className="allPrograms splash">
          <li>
            {row.startMonth} {row.startYear}
          </li>
        </ul>
      ))}

      <h5>Program Overview: </h5>
      <p
        className="dataProgram"
        dangerouslySetInnerHTML={{ __html: data.programOverview }}
      ></p>
      <h5>Admission Requirements:</h5>
      <p
        className="dataProgram"
        dangerouslySetInnerHTML={{ __html: data.admissionRequirements }}
      ></p>
      <h5>Fees and Fundings:</h5>
      <p
        className="dataProgram"
        dangerouslySetInnerHTML={{
          __html: data.feesAndfunding,
        }}
      ></p>
      <h5>Banner Image: </h5>
      <img
        src={`https://crm.internationaleducationoffice.co.uk/programs/images/${data.image}`}
        alt={data.image}
        width={400}
        height={200}
      />
    </div>
  );
};

export default ViewPrograms;
