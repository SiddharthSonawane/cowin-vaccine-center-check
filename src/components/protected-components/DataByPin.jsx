import React, { useEffect, useState } from "react";

import { Button, Input } from "@material-ui/core";
import ShowData from "./ShowData";
import axios from "axios";

const DataByPin = () => {
  const [inputPin, setInputPin] = useState("");
  const [record, setRecord] = useState([]);
  const [showCenter, setShowCenter] = useState(false);

  const [search, setSearch] = useState(false);

  useEffect(() => {
    setRecord([]);
  }, [search]);

  const handleClick = () => {
    if (inputPin !== "") {
      console.log(inputPin);
      setShowCenter(true);
      setSearch(!search);
      const date = new Date();
      const utc = new Date()
        .toJSON()
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("-");
      axios
        .get(
          "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=" +
            inputPin +
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
    } else {
      alert("please enter pin");
    }
  };

  return (
    <div className="select-by-district">
      <div className="pin-dist-select">
        <Input
          style={{ backgroundColor: "white", borderRadius: "50px" }}
          id="center-input-pin"
          placeholder="Enter your area PINCODE"
          disableUnderline={true}
          value={inputPin}
          onChange={(e) => {
            setInputPin(e.target.value);
          }}
        ></Input>
        <Button
          style={{
            backgroundColor: "rgb(0, 32, 96)",
            color: "#FFFFFF",
            width: "auto",
            height: "auto",
            margin: "0 5rem",
            padding: "0 3rem",
            borderRadius: "50px",
            fontSize: "1.2rem",
          }}
          onClick={handleClick}
        >
          SEARCH
        </Button>
      </div>
      <div className="show-center">
        {showCenter && <ShowData record={record} />}
      </div>
    </div>
  );
};

export default DataByPin;
