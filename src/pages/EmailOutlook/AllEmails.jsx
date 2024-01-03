import React, { useEffect, useState } from "react";
import axios from "axios";

const AllEmails = ({
  handleShow,
  setLoading,
  setCredentails,
  options,
  setOption,
  option,
  changeOption,
  setSelectEmail,
}) => {
  const [emails, setEmails] = useState([]);
  const [adminEmails, setAdminEmails] = useState([]);
  const [emailSelected, setEmailSelected] = useState(null);
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get(`https://crm.internationaleducationoffice.co.uk/members/member1/${id}`, config)
      .then((response) => {
        setEmails(response.data.emailShow);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`https://crm.internationaleducationoffice.co.uk/uni-emails`, config)
      .then((response) => {
        setAdminEmails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [emails]);
  return (
    <div className="email-space">
      {role === "superadmin"
        ? adminEmails.map((row) => (
            <div className="all-emails-list">
              <div
                onClick={() => {
                  handleShow({ email: row.email, password: row.password });
                  setCredentails({ email: row.email, password: row.password });
                  setLoading(true);
                  setEmailSelected(row.email);
                  setOption("Inbox");
                  setSelectEmail("");
                }}
              >
                {row.email}
              </div>
              {emailSelected === row.email ? (
                <div className="email-details">
                  {options.map((item, index) => (
                    <p
                      className={option === item ? "email-option-select" : ""}
                      key={index}
                      onClick={() => {
                        setOption(item);
                        changeOption(
                          { email: row.email, password: row.password },
                          item
                        );
                        setLoading(true);
                        setSelectEmail("");
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          ))
        : emails
            .filter((row) => row.show === true) // Filter emails based on row.show property
            .map((row, index) => (
              <div className="all-emails-list" key={index}>
                <div
                  onClick={() => {
                    handleShow({ email: row.email, password: row.id.password });
                    setCredentails({
                      email: row.email,
                      password: row.id.password,
                    });
                    setLoading(true);
                    setEmailSelected(row.email);
                    setOption("Inbox");
                  }}
                >
                  {row.email}
                </div>
                {emailSelected === row.email ? (
                  <div className="email-details">
                    {options.map((item, optionIndex) => (
                      <p
                        className={option === item ? "email-option-select" : ""}
                        key={optionIndex}
                        onClick={() => {
                          setOption(item);
                          changeOption(
                            { email: row.email, password: row.id.password },
                            item
                          );
                          setLoading(true);
                        }}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
    </div>
  );
};

export default AllEmails;
