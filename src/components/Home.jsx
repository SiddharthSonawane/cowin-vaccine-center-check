import React from "react";

import { Link } from "react-router-dom";

import { Button } from "@material-ui/core";

const Home = () => {
  return (
    <div id="home">
      <div>
        <h1>Are You Protected Against COVID-19?</h1>
        <Button
          className="nav-btn nav-items"
          style={{
            backgroundColor: "rgb(255,192,2)",
            color: "#FFFFFF",
            borderRadius: "50px",
            width: "15rem",
            height: "3rem",
          }}
          type="submit"
          variant="contained"
        >
          <Link to="/login">REGISTER</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
