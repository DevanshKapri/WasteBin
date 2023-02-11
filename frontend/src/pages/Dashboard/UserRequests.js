import React, { useState } from "react";

export default function UserRequests() {
  const [userRequests, getUserRequests] = useState([
    {
      date: "2012-09-31",
      waste_type: "Recyclable",
      status: "Pending",
      credits: 8,
    },
    {
      date: "2013-09-31",
      waste_type: "Recyclable",
      status: "Pending",
      credits: 8,
    },
    {
      date: "2014-09-31",
      waste_type: "Non-Recyclable",
      status: "Accepted",
      credits: 8,
    },
    {
      date: "2015-09-31",
      waste_type: "Recyclable",
      status: "Pending",
      credits: 8,
    },
    {
      date: "2016-09-31",
      waste_type: "Recyclable",
      status: "Pending",
      credits: 8,
    },
  ]);
  return (
    <div>
      <table
        class="table table-striped"
        style={{ width: "92%", left: "6%", position: "absolute" }}
      >
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Date</th>
            <th scope="col">Waste Type</th>
            <th scope="col">Status</th>
            <th scope="col">Credits</th>
          </tr>
        </thead>

        <tbody id="tableBody">
          {userRequests.map((user, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{user.date}</td>
              <td>{user.waste_type}</td>
              <td>
                <div
                  style={{
                    borderStyle: "solid",
                    borderRadius: "15px",
                    backgroundColor:
                      user.status === "Pending" ? "#e66e6e" : "#70d156",
                    maxWidth: "100px",
                    textAlign: "center",
                  }}
                >
                  {user.status}
                </div>
              </td>
              <td>{user.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
