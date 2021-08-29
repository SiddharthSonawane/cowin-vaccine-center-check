import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const ShowData = (props) => {
  console.log(props.record);
  return (
    <div>
      <TableContainer>
        <Table
          style={{ width: "100%", textAlign: "center" }}
          aria-label="simple table"
        >
          <TableHead
            style={{
              width: "100%",
              textAlign: "center",
              backgroundColor: "rgb(0, 32, 96)",
            }}
            headerAlign="left"
          >
            <TableRow style={{ textAlign: "center" }}>
              <TableCell
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "1.2rem",
                }}
                align="left"
              >
                Hospital Name
              </TableCell>
              <TableCell
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "1.2rem",
                }}
                align="left"
              >
                Address
              </TableCell>
              <TableCell
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "1.2rem",
                }}
                align="left"
              >
                Fee Type
              </TableCell>
              <TableCell
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: "1.2rem",
                }}
                align="left"
              >
                Vaccine Available
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.record.map((row, index) => (
              <TableRow align="left" key={index}>
                <TableCell align="center">{row.hospName}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center">{row.feeType}</TableCell>
                <TableCell align="center">{row.vaccine}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ShowData;
