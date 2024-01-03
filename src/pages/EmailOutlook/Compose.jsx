import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Compose = ({ credentails, popUpColor, popUpText, popUpShow }) => {
  const user = credentails;
  const [emails, setEmails] = useState([]);
  const [adminEmails, setAdminEmails] = useState([]);
  const [to, setTo] = useState("");
  const [students, setStudents] = useState([]);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [html, setHtml] = useState("");
  const [from, setFrom] = useState(user ? user.email : "");
  const [password, setPassword] = useState(user ? user.password : "");
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
      .get("https://crm.internationaleducationoffice.co.uk/students", config)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://crm.internationaleducationoffice.co.uk/uni-emails", config)
      .then((response) => {
        setAdminEmails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`https://crm.internationaleducationoffice.co.uk/members/member1/${id}`, config)
      .then((response) => {
        setEmails(response.data.emailShow);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [emails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: from,
      password: password,
      to: to,
      text: text,
      subject: subject,
      html: html,
    };
    axios
      .post("https://crm.internationaleducationoffice.co.uk/imap/compose", data, config)
      .then((response) => {
        alert(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="email-form" onSubmit={handleSubmit}>
      <label>From</label>
      {role === "superadmin" ? (
        <div style={{ width: "100%" }}>
          <select
            className="email-from"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              const findEmail = adminEmails.find(
                (row) => row.email === e.target.value
              );

              setPassword(findEmail.password);
            }}
          >
            <option value=""></option>
            {adminEmails.map((row) => (
              <option value={row.email}>{row.email}</option>
            ))}
          </select>
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <select
            value={from}
            className="email-from"
            onChange={(e) => {
              setFrom(e.target.value);
              const findEmail = emails.find(
                (row) => row.email === e.target.value
              );
              setPassword(findEmail.id.password);
            }}
          >
            <option value=""></option>
            {emails
              .filter((row) => row.show === true)
              .map((row, index) => (
                <option key={index} value={row.email}>
                  {row.email}
                </option>
              ))}
          </select>
        </div>
      )}
      <label>To</label>
      <div style={{ width: "100%" }}>
        <select
          className="email-to-select"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        >
          <option value=""></option>
          {students.map((row) => (
            <option value={row.email}>{row.email}</option>
          ))}
        </select>
        <input
          className="email-to-input"
          type="email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <label>Subject</label>
      <input
        className="email-subject"
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <label>Subject</label>
      <ReactQuill
        className="email-html"
        value={html}
        onChange={(value) => {
          setHtml(value);
        }}
      />
      <input type="submit" className="email-btn" />
    </form>
  );
};

export default Compose;
