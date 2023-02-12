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

  const [allEvent, setAllEvent] = useState([]);

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  let allEvents = [];

  // React.useEffect(() => {
    
  // })
  

  const handleAddEvent = async () => {
    let requests = [];
    let approveTime = [];
    let names = [];
    // console.log(props.user);
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
      // console.log(id, time);
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
          approveTime.push(
            time
            // `${time.getFullYear()}-${
            //   time.getMonth() + 1
            // }-${time.getDate()}T${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
          );
          for (let i = 0; i < names.length; i++) {
            allEvents.push({
              title: names[i],
              start: approveTime[i],
              end: approveTime[i],
            });
          }
          setAllEvent(allEvents);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const get_date = async (id, time, longitude, latitude) => {
      await axios
        .post("https://Regression.devanshkapri1.repl.co/predict", {
          longitude: longitude,
          latitude: latitude,
        })
        .then((res) => {
          if (res.data) {
            let date = new Date(time);
            date = new Date(date.setDate(date.getDate() + res.data.prediction));
            // console.log(date);
            // console.log(res.data.prediction);
            updateArr(id, time);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const fetchRequestParams = async (_id) => {
      await axios
        .post("http://localhost:8000/getRequest", {
          _id: _id,
        })
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            get_date(
              res.data.user,
              res.data.createdAt,
              res.data.longitude,
              res.data.latitude
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };


    for (let i = 0; i < requests.length, i < 5; i++) {
      fetchRequestParams(requests[i]);
    }
    console.log(names, approveTime);
    
    console.log(allEvents);
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
  
  React.useEffect(() => {
    handleAddEvent();
  }, [props])

  console.log(allEvent)

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
        events={allEvent}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
}

export default Cal_comp_pick;
