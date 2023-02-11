import React, { useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import { RxCross1 } from "react-icons/rx";
export default function CollectorResponse() {
  const [collectorArr, setCollectorArr] = useState([
    { name: "abcd", email: "jgh5j@gmail.com", phone: "9414461366" },
    { name: "wxyz", email: "rkobgjv@gmail.com", phone: "9414454553" },
    { name: "efgh", email: "relbmvm@gmail.com", phone: "8578057555" },
    { name: "ijkl", email: "klrhmbv@gmail.com", phone: "6565667764" },
    { name: "mnop", email: "rklgbmvlm@gmail.com", phone: "7688768785" },
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
            <th scope="col">Collector Name</th>
            <th scope="col">Collector Email</th>
            <th scope="col">Collector Mobile No.</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody id="tableBody">
          {collectorArr.map((collector, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{collector.name}</td>
              <td>{collector.email}</td>
              <td>{collector.phone}</td>
              <td>
                <button
                  style={{ marginRight: "20px" }}
                  onClick={() => {
                    console.log("Collector approved successfully");
                    setCollectorArr(
                      collectorArr.filter(
                        (item) => item.email !== collector.email
                      )
                    );
                  }}
                >
                  <FcCheckmark fontSize="1.4em" />
                </button>
                <button
                  onClick={() => {
                    console.log("Collector rejected successfully");
                    setCollectorArr(
                      collectorArr.filter((item) => item.sno !== collector.sno)
                    );
                  }}
                >
                  <RxCross1 color="red" fontSize="1.4em" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
