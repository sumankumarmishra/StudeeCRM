import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import EventForm from "./EventForm";
import axios from "axios";
import UpdateForm from "./UpdateForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClock,
  faTimes,
  faUserCircle,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
const localizer = momentLocalizer(moment);

const CalendarSchedule = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [members, setMembers] = useState([]);
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const [member, setMember] = useState(id);
  const token = localStorage.getItem("ieodkvToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get(`https://crm.internationaleducationoffice.co.uk/members`, config)
      .then((response) => {
        setMembers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (member) {
      axios
        .get(`https://crm.internationaleducationoffice.co.uk/schedules/${member}`, config)
        .then((response) => {
          const data = response.data.map((event) => ({
            personal: event.personal,
            title: `${event.title}`,
            start: new Date(event.date),
            end: new Date(event.date),
            startTime: event.startTime,
            date: event.date,
            endTime: event.endTime,
            student: event.student?._id,
            status: event.status,
            taken_by: event.taken_by?._id,
            color: event.color,
            _id: event._id,
          }));
          setEvents(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [events, member]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Scheduled":
        return <FontAwesomeIcon icon={faClock} />;
      case "Completed":
        return <FontAwesomeIcon icon={faCheck} />;
      case "Cancelled":
        return <FontAwesomeIcon icon={faTimes} />;
      case "Rescheduled":
        return <FontAwesomeIcon icon={faSync} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Modal show={openAddModal} onHide={() => setOpenAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EventForm />
        </Modal.Body>
      </Modal>

      <Modal show={openUpdateModal} onHide={() => setOpenUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateForm selectedEvent={selectedEvent} />
        </Modal.Body>
      </Modal>

      <h2 className="px-3 pt-3 fw-bold">My Calendar</h2>
      {role === "superadmin" ? (
        <Form>
          <Form.Group className="ms-3">
            <Form.Label className=" fw-bold">
              Select Member
            </Form.Label>
        
              <Form.Control
                as="select"
                value={member}
                style={{width: "350px"}}
                onChange={(e) => {
                  setMember(e.target.value);
                  setSelectedEvent(null);
                }}
              >
                <option value=""></option>
                {members.map((row, index) => {
                  return (
                    <option key={index} value={row._id}>
                      {row.username}
                    </option>
                  );
                })}
              </Form.Control>
         
          </Form.Group>
        </Form>
      ) : (
        ""
      )}

      <Button className="ms-3 mt-3 mb-3" onClick={() => setOpenAddModal(true)}>Create Event</Button>

      <Calendar
        localizer={localizer}
        events={events.map((event) => ({ ...event, end: event.start }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800 }}
        views={["month", "agenda"]}
        onSelectEvent={(event) => {
          if (id === member) {
            setSelectedEvent((prevEvent) =>
              prevEvent === event ? null : event
            );
            setOpenUpdateModal(true);
          } else {
            setSelectedEvent(null);
            setOpenUpdateModal(false);
          }
        }}
        components={{
          eventWrapper: ({ event, children }) => {
            console.log(event.personal);
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: event.color,
                  marginTop: 5,
                }}
              >
                <div style={{ marginRight: 20 }}>{children}</div>
                {getStatusIcon(event.status)}
                {event.personal === "mine" ? (
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    style={{ marginLeft: "5px" }}
                  />
                ) : (
                  ""
                )}
                {/* Render the icon */}
              </div>
            );
          },
        }}
        eventPropGetter={(event, start, end, isSelected) => ({
          style: {
            backgroundColor: event.color,
          },
        })}
      />
    </div>
  );
};

export default CalendarSchedule;
