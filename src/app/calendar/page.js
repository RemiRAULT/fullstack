'use client'

import "../calendar/custom-calendar.css";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "../events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'bootstrap/dist/css/bootstrap.min.css';

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);

  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title,
        },
      ]);
  };

  return (
    <div className="App">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
        components={{
          toolbar: CustomToolbar,
          event: CustomEvent,
          agenda: {
            event: CustomAgendaEvent,
          },
        }}
      />
    </div>
  );
}

// CustomToolbar component to style the calendar header
function CustomToolbar({ label, onView, onNavigate }) {
  return (
    <div className="custom-toolbar">
      <span className="toolbar-label">{label}</span>
      <div className="toolbar-buttons">
        <button className="toolbar-button" onClick={() => onView("month")}>
          Mois
        </button>
        <button className="toolbar-button" onClick={() => onView("week")}>
          Semaine
        </button>
        <button className="toolbar-button" onClick={() => onView("day")}>
          Jour
        </button>
      </div>
    </div>
  );
}

// CustomEvent component to style the individual events on the calendar
function CustomEvent({ event }) {
  return (
    <div className="custom-event">
      <span className="event-title">{event.title}</span>
    </div>
  );
}

// CustomAgendaEvent component to style the events in the agenda view
function CustomAgendaEvent({ event }) {
  return (
    <div className="custom-agenda-event">
      <span className="event-title">{event.title}</span>
      <span className="event-time">
        {moment(event.start).format("h:mm A")} - {moment(event.end).format("h:mm A")}
      </span>
    </div>
  );
}
