import React, { useState } from "react";
import axios from "axios";

const Otp = (props) => {
  const [input, setInput] = useState("");
  const txnId = props.tId;

  const handleChange = (e) => {
    const newInput = e.target.value;
    setInput(newInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(typeof input);
    console.log(typeof txnId);
    axios
      .post(`https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP`, {
        otp: parseInt(input),
        txnId: txnId,
      })
      .then((res) => {
        console.log(res.data);
      });
    console.log(txnId);
  };

  return (
    <div>
      <p>Transaction Id - {txnId}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={input} />
        <button className="login-btn" type="submit">Verify</button>
      </form>
    </div>
  );
};

export default Otp;
