import React, { useEffect, useState } from "react";
import DataByPin from "./DataByPin";
import DataByDistrict from "./DataByDistrict";

import { Button } from "@material-ui/core";

const Center = () => {
  const [showInput, setShowInput] = useState(true);

  return (
    <div id="Center">
      <h1>Check Your Nearest Vaccination Center And Slots Availability</h1>
      <div id="center-container">
        <div id="get-center">
          <div id="center-btns">
            <Button
              style={{
                margin: "0 3rem 0 0",
                borderRadius: "50px",
                backgroundColor: "rgb(255,192,2)",
                fontSize: "1.2rem",
                color: "black",
                padding: "0.5rem 3rem",
              }}
              variant="contained"
              color="primary"
              id="pin"
              onClick={() => {
                setShowInput(true);
              }}
            >
              Search by PIN
            </Button>
            <Button
              style={{
                margin: "0 0 0 1rem",
                borderRadius: "50px",
                backgroundColor: "rgb(255,192,2)",
                color: "black",
                padding: "0.5rem 3rem",
                fontSize: "1.2rem",
              }}
              variant="contained"
              color="primary"
              id="district"
              onClick={() => {
                setShowInput(false);
              }}
            >
              Search by District
            </Button>
          </div>
          <div id="center-input">
            {showInput ? <DataByPin /> : <DataByDistrict />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Center;
{
  /* <table>
              <th>
                <td>Hospital Name</td>
                <td>Address</td>
                <td>Fee Type</td>
                <td>Vaccines Available</td>
              </th>
              {recordByPin.map((rec) => {
                return (
                  <tr>
                    <td key="1">{rec.hospName}</td>
                    <td key="2">{rec.address}</td>
                    <td key="3">{rec.feeType}</td>
                    <td key="4">{rec.vaccine}</td>
                  </tr>
                );
              })}
            </table> */
}
//className={classes.table} component="Paper"
//res.data.districts.forEach((e) => {
//   setAllDistricts((prev) => {
//     return [...prev, e];
//   });
// });

//{showInput ? <DataByPin /> : <DataByDistrict />}
