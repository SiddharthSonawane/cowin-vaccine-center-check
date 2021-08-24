import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button } from "@material-ui/core";
import { useHistory } from "react-router";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState(0);
  const [input, setInput] = useState("");
  const [txnId, setTxnId] = useState("");
  const [error, setError] = useState("");

  //let history = useHistory();

  const inputUpdate = (e) => {
    const newInput = e.target.value;
    setInput(newInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input !== "") {
      const pattern = new RegExp(/^[0-9\b]+$/);

      if (pattern.test(input) === true) {
        if (input.length === 10) {
          axios
            .post(`https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`, {
              mobile: mobileNumber,
            })
            .then((res) => {
              console.log(res.data.txnId); //Getting transaction Id here
              setTxnId(res.data.txnId);
              console.log(txnId);
            })
            .catch((err) => {
              if (err.response.status === 500) {
                console.log("Internal Server Error");
              } else {
                alert("wrong input");
              }
            });
        } else {
          setError("Please enter 10 digit mobile number");
        }
      } else {
        setError("Please enter mobile number");
      }
    }
  };

  const otherHandle = () => {
    //history.push("/otp");
    setError("Please enter valid phone number");
  };

  useEffect(() => {
    setMobileNumber(input);
    setError("");
  }, [input]);

  return (
    <div className="Login">
      <div className="login-heading">
        <h1>Register or Sign In for Vaccination</h1>
        <p>An OTP will be sent to your mobile number for verification</p>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <Input
          id="login-input"
          type="tel"
          pattern="[0-9]{10}"
          placeholder="Enter your mobile number"
          onChange={inputUpdate}
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
        {/* <Button onClick={otherHandle} variant="contained" color="primary">
          Other
        </Button> */}
      </form>
    </div>
  );
};

export default Login;
