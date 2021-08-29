import React from "react";

import { Button } from "@material-ui/core";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Navigation = ({ logoutBtn, setAuthentication, setVerifyAuth }) => {
  const history = useHistory();

  const logoutEvent = () => {
    setVerifyAuth(false);
    setAuthentication(false);
    history.push("/");
  };

  return (
    <div id="Nav">
      <ul id="nav-bar">
        <li className="nav-items">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-items">
          <Link to="/about">About</Link>
        </li>
        <li className="nav-items">
          <Link to="/contact">Contact</Link>
        </li>

        {logoutBtn ? (
          <Button
            className="nav-btn nav-items"
            style={{
              color: "#FFFFFF",
              borderRadius: "50px",
              width: "10rem",
              height: "3rem",
              fontSize: "1.1rem",
            }}
            variant="contained"
            color="secondary"
            onClick={logoutEvent}
          >
            Logout
          </Button>
        ) : (
          <Button
            className="nav-btn nav-items"
            style={{
              backgroundColor: "rgb(255,192,2)",
              color: "#FFFFFF",
              borderRadius: "50px",
              width: "15rem",
              height: "3rem",
            }}
            onClick={() => history.push("/login")}
            type="submit"
            variant="contained"
          >
            <Link to="/login">SIGN IN</Link>
          </Button>
        )}
      </ul>
    </div>
  );
};

export default Navigation;
