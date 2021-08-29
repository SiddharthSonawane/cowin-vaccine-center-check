import React, { useEffect, useState } from "react";
import ShowData from "./ShowData";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import axios from "axios";

const DataByDistrict = () => {
  const [stateValue, setStateValue] = useState("");
  const [districtValue, setDistrictValue] = useState("");
  const [stateId, setStateId] = useState("");
  const [showCenter, setShowCenter] = useState(false);
  const [record, setRecord] = useState([]);

  const [allStates, setAllStates] = useState([]);
  const [alldistricts, setAllDistricts] = useState([]);

  const [showDist, setShowDist] = useState(false);

  useEffect(() => {
    //getting all states data here
    const stateData = async () => {
      await axios
        .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
        .then((res) => {
          res.data.states.forEach((e) => {
            setAllStates((prev) => {
              return [...prev, e];
            });
          });
        });
    };
    stateData();

    return () => {
      setAllStates([]);
    };
  }, []);

  useEffect(() => {
    setRecord([]);
  }, [districtValue]);

  useEffect(() => {
    for (let x of allStates) {
      if (x.state_name === stateValue) {
        axios
          .get(
            "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" +
              x.state_id
          )
          .then((res) => {
            let l = [];
            res.data.districts.forEach((e) => {
              l.push(e);
            });
            setAllDistricts(l);
          });
      }
    }
  }, [showDist]);

  const stateChange = (e) => {
    setStateValue(e.target.value);
  };

  const distChange = (e) => {};

  const handleClose = () => {
    setShowDist(!showDist);
  };

  return (
    <div className="select-by-district">
      <div className="pin-dist-select">
        <FormControl id="form-control" variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
          <Select
            style={{
              borderRadius: "50px",
              backdropFilter: "white",
            }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="State"
            onChange={stateChange}
            onClick={handleClose}
            value={stateValue}
            required
          >
            {allStates.map((state, index) => {
              return (
                <MenuItem key={index} value={state.state_name} id={index + 1}>
                  {state.state_name}
                </MenuItem>
              );
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
            style={{
              borderRadius: "50px",
              backdropFilter: "white",
            }}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={districtValue}
            label="State"
            required
          >
            {alldistricts.map((district, index) => {
              return (
                <MenuItem
                  value={district.district_name}
                  key={index}
                  id={index + 1}
                  onClick={(e) => {
                    setShowCenter(true);
                    const utc = new Date()
                      .toJSON()
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("-");
                    axios
                      .get(
                        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" +
                          district.district_id +
                          "&date=" +
                          utc
                      )
                      .then((res) => {
                        res.data.sessions.forEach((e) => {
                          setRecord((prev) => {
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
                      });
                    console.log(record);
                  }}
                >
                  {district.district_name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      <div className="show-center">
        {showCenter && <ShowData record={record} />}
      </div>
    </div>
  );
};

export default DataByDistrict;
