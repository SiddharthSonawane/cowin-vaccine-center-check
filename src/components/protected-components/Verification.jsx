import React, { useState, useEffect } from "react";
import axios from "axios";
import sha256 from "crypto-js/sha256";
import Cookies from "universal-cookie";
import { Input, Button } from "@material-ui/core";
import { useHistory } from "react-router";

const Verify = (props) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const txn = props.txn;
  const cookies = new Cookies();
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const encryptOTP = sha256(input).toString();
    const txxn = txn.toString();

    if (input !== "") {
      const pattern = new RegExp(/^[0-9\b]+$/);
      if (pattern.test(input) === true) {
        if (input.length === 6) {
          axios
            .post(`https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP`, {
              otp: encryptOTP,
              txnId: txxn,
            })
            .then((res) => {
              console.log(res.data.token);
              const token = res.data.token;
              cookies.set("cowinToken", token, { path: "/center" });
              props.setVerifyAuth(true);
              history.push("/center");
            })
            .catch((err) => {
              if (err) {
                console.log(err);
              } else {
                alert("wrong input");
              }
            });
          // const confirmOTP = async () => {
          //   const data = await
          // };
          // confirmOTP();
        } else {
          setError("Please enter 10 digit mobile number");
        }
      } else {
        setError("Please enter valid OTP");
      }
    }

    // const sendOTP = async () => {

    // };
    // sendOTP();
  };
  useEffect(() => {
    setError("");
  }, [input]);

  return (
    <div className="Login">
      <div className="login-heading">
        <h1 id="verification-heading">OTP Verification</h1>
        <p>Please enter OTP</p>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <Input
          className="login-input"
          id="login-input"
          type="tel"
          pattern="[0-9]{10}"
          placeholder="Enter OTP"
          onChange={(event) => {
            setInput(event.target.value);
          }}
          value={input}
          disableUnderline={true}
          required
        />
        <p
          style={{
            width: "100%",
            color: "red",
            textAlign: "center",
          }}
        >
          {error}
        </p>
        <Button
          style={{
            backgroundColor: "rgb(0, 32, 96)",
            color: "#FFFFFF",
            width: "30rem",
            height: "3rem",
            margin: "1% 0",
            fontSize: "1.2rem",
          }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Get OTP
        </Button>
      </form>
    </div>
  );
};

export default Verify;
