import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// const events = [
//     {
//         title: "Big Meeting",
//         allDay: true,
//         start: new Date(2021, 6, 0),
//         end: new Date(2021, 6, 0),
//     },
//     {
//         title: "Vacation",
//         start: new Date(2021, 6, 7),
//         end: new Date(2021, 6, 10),
//     },
//     {
//         title: "Conference",
//         start: new Date(2021, 6, 20),
//         end: new Date(2021, 6, 23),
//     },
// ];

function Cal_comp_pick(props) {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  let allEvents = [];

  const handleAddEvent = async () => {
    let requests = [];
    let approveTime = [];
    let names = [];
    console.log(props.user);
    await axios
      .post("http://localhost:8000/getDetail", {
        _id: props.user,
      })
      .then((res) => {
        requests = res.data.requests;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(requests);
    const updateArr = async (id, time) => {
      await axios
        .post("http://localhost:8000/getDetail", {
          _id: id,
        })
        .then((res) => {
          if (res.data) {
            names.push(res.data.name);
          } else {
            names.push("unknown");
          }
          approveTime.push(time);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    for (let i = 0; i < requests.length; i++) {
      await axios
        .post("http://localhost:8000/getRequest", {
          _id: requests[i],
        })
        .then((res) => {
          if (res.data) {
            updateArr(res.data.user, res.data.approveTime);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(names, approveTime);
    for (let i = 0; i < names.length; i++) {
      allEvents.push({
        title: names[i],
        start: approveTime[i],
        end: approveTime[i],
      });
    }
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      /*
                console.log(d1 <= d2);
                console.log(d2 <= d3);
                console.log(d1 <= d4);
                console.log(d4 <= d3);
                  */

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("CLASH");
        break;
      }
    }
    // setAllEvents([...allEvents, newEvent]);
  };
  handleAddEvent();

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Calendar</h1>
      <h3 style={{ textAlign: "center", marginTop: "1rem" }}>Add New Event</h3>
      {/* <div>
        <input
          type="text"
          placeholder="Add Title"
          style={{ width: "20%", marginRight: "10px", marginTop: "5rem" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: "10px", marginTop: "5rem" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add Event
        </button>
      </div> */}
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
}

export default Cal_comp_pick;
