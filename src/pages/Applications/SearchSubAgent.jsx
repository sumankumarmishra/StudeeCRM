import axios from "axios";
import React, { useEffect, useState } from "react";
import "./appfleid.css";

const SearchSubAgent = ({
  id,
  filteredBranches,
  config,
  condition,
  setTotalCount,
  setItemsPerPage,
  setApplications,
  setFilter,
}) => {
  const [sub_agents, setSubAgents] = useState([]);
  const [sub_agent, setSubAgent] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://crm.internationaleducationoffice.co.uk/members/sub_agents",
        config
      )
      .then((response) => {
        setSubAgents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sub_agents]);

  const handleSearch = (e) => {
    e.preventDefault();
    const data = {
      id: id,
      filterObject: { case_owner_name: sub_agent },
      condition: condition,
    };

    const filtered = filteredBranches.filter((application) =>
      Object.entries(application).some(([key, value]) => {
        if (key === "case_owner") {
          return value.username.toLowerCase().includes(sub_agent.toLowerCase());
        }

        return false;
      })
    );

    setApplications(filtered);
    setTotalCount(filtered.length);
    setFilter(true);

    // axios
    //   .post(
    //     "https://crm.internationaleducationoffice.co.uk/applications/search_applications",
    //     data,
    //     config
    //   )
    //   .then((response) => {
    //     setApplications(response.data);
    //     setTotalCount(response.data.length);
    //     setItemsPerPage(response.data.length);

    //     setFilter(true);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <div className="pt-3">
      {/* <p>Search Sub Agent Applications</p> */}
      <select
        value={sub_agent}
        onChange={(e) => setSubAgent(e.target.value)}
        className="select-input"
      >
        <option value="">Select Sub Agent</option>
        {sub_agents.map((row, index) => (
          <option value={row.username} key={index}>
            {row.username}
          </option>
        ))}
      </select>
      <button
        onClick={handleSearch}
        disabled={!sub_agent ? true : false}
        className="btn-agent px-3"
      >
        Search
      </button>
    </div>
  );
};

export default SearchSubAgent;
