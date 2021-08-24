import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import axios from "axios";

//************************import for Table ************************/
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Center = () => {
  const classes = useStyles();
  const [showInput, setShowInput] = useState(true);
  const [stateValue, setStateValue] = useState("");
  const [districtValue, setDistrictValue] = useState("");
  const [inputPin, setInputPin] = useState("");
  const [recordByPin, setRecordByPin] = useState([{}]);
  //hospName: "", address: "", feeType: "", vaccine: ""
  const [allStates, setAllStates] = useState([]);
  const [alldistricts, setAllDistricts] = useState([]);

  const [search, setSearch] = useState(false);
  const [showCenter, setShowCenter] = useState(false);

  // useEffect(() => {
  //   const newData = async () => {
  //     const myStatesData = await axios.get(
  //       "https://cdn-api.co-vin.in/api/v2/admin/location/states"
  //     );
  //     let recordArr = [];
  //     myStatesData.data.states.forEach((e) => {
  //       recordArr.push(e.state_name);
  //     });
  //     setAllStates(recordArr);
  //   };
  //   newData();
  // }, []);

  useEffect(() => {
    setRecordByPin([{}]);
    // return () => {
    //   cleanup
    // }
  }, []);

  useEffect(() => {
    const date = new Date();
    const utc = new Date().toJSON().slice(0, 10).split("-").reverse().join("-");
    const dataByPin = async () => {
      const pinData = await axios.get(
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" +
          inputPin +
          "&date=" +
          utc
      );

      pinData.data.sessions.forEach((e) => {
        setRecordByPin((prev) => {
          return [
            ...prev,
            {
              hospName: e.name,
              address: e.address,
              feeType: e.fee_type,
              vaccine: e.vaccine,
            },
          ];
        });
      });
      // const { name } = pinData.data.sessions;
      console.log(recordByPin);
    };

    dataByPin();
  }, [search]);

  return (
    <div id="Center">
      <h1>Check Your Nearest Vaccination Center And Slots Availability</h1>
      <div id="center-container">
        <div id="get-center">
          <div id="center-btns">
            <Button
              style={{
                margin: "0 0 0 12rem",
                borderRadius: "50px",
                backgroundColor: "rgb(255,192,2)",
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
                margin: "0 1rem 0 7rem",
                borderRadius: "50px",
                backgroundColor: "rgb(255,192,2)",
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
            {showInput ? (
              <Input
                style={{ backgroundColor: "white", borderRadius: "50px" }}
                id="center-input-pin"
                placeholder="Enter your PIN"
                disableUnderline={true}
                value={inputPin}
                onChange={(e) => {
                  setInputPin(e.target.value);
                }}
              ></Input>
            ) : (
              <div id="select-by-district">
                {/* <FormControl id="form-control" variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">
                    State
                  </InputLabel>
                  <Select
                    onChange={async (e, index) => {
                      setStateValue(e.target.value);

                      const myDistrictData = await axios.get(
                        "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" +
                          index.props.value
                      );

                      let somArr = [];
                      myDistrictData.data.districts.forEach((e) => {
                        somArr.push(e.district_name);
                      });

                      setAllDistricts(somArr);
                      console.log(alldistricts);
                    }}
                    style={{ borderRadius: "50px", backdropFilter: "white" }}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={stateValue}
                    label="State"
                    required
                  >
                    {allStates.map((state, index) => {
                      return <MenuItem value={index}>{state}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <FormControl id="form-control" variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">
                    District
                  </InputLabel>
                  <Select
                    onChange={(e) => {
                      setDistrictValue(e.target.value);
                    }}
                    style={{ borderRadius: "50px", backdropFilter: "white" }}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={districtValue}
                    label="State"
                    required
                  >
                    {alldistricts.map((district, index) => {
                      return <MenuItem value={index}>{district}</MenuItem>;
                    })}
                  </Select>
                </FormControl> */}
              </div>
            )}
            <Button
              style={{
                backgroundColor: "rgb(0, 32, 96)",
                color: "#FFFFFF",
                width: "auto",
                height: "auto",
                margin: "0 5rem",
                padding: "1rem 3rem",
                borderRadius: "50px",
              }}
              onClick={() => {
                if (inputPin !== "") {
                  setSearch(!search);
                  setShowCenter(true);
                  console.log(search);
                } else {
                  alert("please enter pin");
                }
              }}
            >
              SEARCH
            </Button>
          </div>
        </div>
        <div id="show-center">
          {showCenter && (
            <TableContainer component="Paper">
              <Table
                style={{ border: "1px black solid", textAlign: "center" }}
                className={classes.table}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Hospital Name</TableCell>
                    <TableCell align="left">Address</TableCell>
                    <TableCell align="left">Fee Type</TableCell>
                    <TableCell align="left">Vaccine Available</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                // style={{
                //   display: "flex",
                //   flexDirection: "column",
                //   justifyContent: "flex-end",
                // }}
                >
                  {recordByPin.map((row, index) => (
                    <TableRow align="center" key={index}>
                      <TableCell align="center">{row.hospName}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      <TableCell align="center">{row.feeType}</TableCell>
                      <TableCell align="center">{row.vaccine}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
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
