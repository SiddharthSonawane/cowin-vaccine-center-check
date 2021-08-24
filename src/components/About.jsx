import { Button } from "@material-ui/core";
import React from "react";

const About = () => {
  return (
    <div id="about">
      <div id="about-sub">
        <h1>CoWIN Is Helping Countries Worldwide To Run Vaccination Drives</h1>
        <p>
          Launching CoWIN as an open source platform for countries to
          orchestrate successful vaccination with efficient monitoring with an
          aim of achieving universal vaccination
        </p>
        <Button
          className="nav-btn nav-items"
          style={{
            backgroundColor: "rgb(0, 32, 96)",
            color: "#FFFFFF",
            borderRadius: "50px",
            width: "15rem",
            height: "3rem",
          }}
          type="submit"
          variant="contained"
        >
          <a
            href="https://sandbox.cowin.gov.in/"
            target="_blank"
            rel="noreferrer"
          >
            Know more
          </a>
        </Button>
      </div>
    </div>
  );
};

export default About;
