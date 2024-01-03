import React, { useEffect, useState } from "react";
import "../Programs/programs.css";
import axios from "axios";

const ViewUniversity = ({ data }) => {
  const [agents, setAgents] = useState([]);
  useEffect(() => {
    axios
      .get(`https://crm.internationaleducationoffice.co.uk/members/university/${data._id}`)
      .then((response) => {
        setAgents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const personImage = `https://crm.internationaleducationoffice.co.uk/universities/images/${data.whatUniSays.personImage}`;
  const logoImage = `https://crm.internationaleducationoffice.co.uk/universities/images/${data.logoImage}`;
  const banner = `https://crm.internationaleducationoffice.co.uk/universities/images/${data.banner}`;

  return (
    <div style={{ margin: 40 }}>
      {/*Name*/}
      <div className="allPrograms">
        <h5>Name:</h5>
        <p className="dataProgram">{data.name}</p>
      </div>
      <div className="allPrograms">
        <h5>Type:</h5>
        <p className="dataProgram">{data.type}</p>
      </div>

      <div className="allPrograms">
        <h5>Country:</h5>
        <p className="dataProgram">{data.country.name}</p>
      </div>
      <div className="allPrograms">
        <h5>City:</h5>
        <p className="dataProgram">{data.city.name}</p>
      </div>
      <div className="allPrograms">
        <h5>No. of Nationalities:</h5>
        <p className="dataProgram">{data.nationalities}</p>
      </div>
      <div className="allPrograms">
        <h5>No. of International Students:</h5>
        <p className="dataProgram">{data.internationalStudents}</p>
      </div>
      <div className="allPrograms">
        <h5>Why Study here:</h5>
        <p
          className="dataProgram"
          dangerouslySetInnerHTML={{
            __html: data.whyStudyHere,
          }}></p>
      </div>
      <div className="allPrograms">
        <h5>Study Abroad Description:</h5>
        <p
          className="dataProgram"
          dangerouslySetInnerHTML={{
            __html: data.studyAbroadDescription,
          }}></p>
      </div>
      <div className="allPrograms">
        <h5>Life of International Students:</h5>
        <p
          className="dataProgram"
          dangerouslySetInnerHTML={{
            __html: data.lifeOfInternationalStudents,
          }}></p>
      </div>
      <div>
        <h5>Agents</h5>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {agents.length > 0 ? (
            agents.map((row) => {
              return (
                <div
                  style={{
                    display: "flex",
                    width: "33%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}>
                  <img
                    src={`https://crm.internationaleducationoffice.co.uk/members/images/${row.image}`}
                    width={200}
                    height={200}
                    style={{ borderRadius: "50%", border: "4px solid " }}
                  />
                  <p style={{ color: "black", fontSize: 20 }}>{row.username}</p>
                </div>
              );
            })
          ) : (
            <p>No Agent Added</p>
          )}
        </div>
      </div>
      <h5>Logo Image</h5>
      <img
        src={logoImage}
        alt={data.logoImage}
        style={{ width: 100, height: 100 }}
      />
      <h5>Banner Image</h5>
      <img
        src={banner}
        alt={data.logoImage}
        style={{ width: 500, height: 200 }}
      />

      <h5>Student Facilities:</h5>
      {data.studentFacilities.map((row) => {
        const image = `https://crm.internationaleducationoffice.co.uk/facilities/images/${row.image}`;
        return (
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={image} alt={row.image} width={30} height={30} />
              <h3>{row.showName}</h3>
            </div>
            {row.allFacilities.map((row) => (
              <div className="allPrograms splash">
                <p>{row.nameOfFacility}</p>
                {row.count !== "undefined" ? <p>{row.count}</p> : ""}
              </div>
            ))}
          </div>
        );
      })}

      <div>
        <h5>Fees and Fundings:</h5>
        <p
          className="dataProgram"
          dangerouslySetInnerHTML={{
            __html: data.feesAndfunding,
          }}></p>
      </div>
      {data.whatUniSays.personImage !== null ||
      data.whatUniSays.position !== "" ||
      data.whatUniSays.message !== "" ||
      data.whatUniSays.personName !== "" ? (
        <div>
          <h4>What Uni says</h4>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <div>
                {data.whatUniSays.personImage !== null ? (
                  <img
                    src={personImage}
                    alt={data.whatUniSays.personImage}
                    style={{ borderRadius: 100, width: 80, height: 80 }}
                  />
                ) : (
                  ""
                )}
              </div>
              <div>{data.whatUniSays.personName}</div>
              <div>{data.whatUniSays.position}</div>
            </div>
            <div
              style={{ textAlign: "center", marginLeft: 20 }}
              dangerouslySetInnerHTML={{
                __html: data.whatUniSays.message,
              }}></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ViewUniversity;
