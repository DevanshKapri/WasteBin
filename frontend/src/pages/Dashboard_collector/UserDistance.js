import React, { useState } from "react";

export default function CollectorResponse(props) {
  // let data = [
  //   {
  //     name: "abcd",
  //     updatedBy: "2000-10-06T22:22:55",
  //     wasteType: "Recyclable",
  //     message: "jregkjfchx4kjgn",
  //     distance: 65.48,
  //   },
  //   {
  //     name: "efgh",
  //     updatedBy: "2022-10-06T22:22:55",
  //     wasteType: "Non-Recyclable",
  //     message: "kjrbjbkrjklbjbyrkg",
  //     distance: 57.48,
  //   },
  //   {
  //     name: "ijkl",
  //     updatedBy: "2021-10-06T22:22:55",
  //     wasteType: "Organic",
  //     message: "yjorhiotrjrhbijt",
  //     distance: 48.45,
  //   },
  //   {
  //     name: "mnop",
  //     updatedBy: "2023-10-06T22:22:55",
  //     wasteType: "Non-Recyclable",
  //     message: "jklnjtjlgnjltnbjlnjn",
  //     distance: 55.47,
  //   },
  //   {
  //     name: "qrst",
  //     updatedBy: "2020-10-06T22:22:55",
  //     wasteType: "Recyclable",
  //     message: "lnbklvnjrlkgnbvllfhngcblfgnhjlgbjdjbhvjdfhvjdfvjfjvjdfvhjfv",
  //     distance: 66.48,
  //   },
  // ];
  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      ...{ [e.target.id]: e.target.value },
    }));
    // console.log(state);
  };
  let data = props.data;
  data.sort((a, b) => (a.distance > b.distance ? 1 : 0));
  const [requests, setRequests] = useState(data);
  const [state, setState] = useState([]);
  return (
    <div class="container-fluid row" style={{ marginLeft: "60px" }}>
      {requests.map((user, index) => (
        <div
          class="noteCard my-2 mx-2 card"
          style={{ width: "20rem", backgroundColor: "white" }}
        >
          <div class="card-body" style={{ width: "100%" }}>
            {/* <h5 class="card-title" id="title ${index}"><b>${element.noteTitle}</b></h5> */}
            <p class="card-text">Username:{user.user}</p>
            <p class="card-text">Request Date:{user.updatedBy}</p>
            <p class="card-text">Waste Type:{user.wasteType}</p>
            <p class="card-text">Message:{user.messageg}</p>
            <p class="card-text">Distance:{user.distance}</p>
            <hr />
            <form>
              <label htmlFor={index}>Enter Date and time:</label>
              <input
                type="datetime-local"
                name="time"
                min={user.date}
                id={index + 1}
                onChange={handleChange}
              />
              <button
                onClick={(e) => {
                  // console.log(
                  //   `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}T${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
                  // );
                  let Datetime = "";
                  e.preventDefault();
                  for (const [key, value] of Object.entries(state)) {
                    if (key == index + 1) {
                      Datetime = value;
                      break;
                    }
                  }
                  if (Datetime != "") {
                    console.log("Request approved by collector");
                    setRequests(
                      requests.filter((item) => item.user != user.user)
                    );
                  } else {
                    alert("Invalid date or time");
                  }
                }}
                class="btn btn-primary mx-2 my-3"
              >
                Add to schedule
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
