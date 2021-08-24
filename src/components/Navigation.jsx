import React, { useCallback } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Navigation = () => {
  const history = useHistory();

  const handleClick = () => history.push("/login");

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

        <Button
          className="nav-btn nav-items"
          style={{
            backgroundColor: "rgb(255,192,2)",
            color: "#FFFFFF",
            borderRadius: "50px",
          }}
          onClick={handleClick}
          type="submit"
          variant="contained"
        >
          <Link to="/login">REGISTER / SIGN IN</Link>
        </Button>
      </ul>
    </div>
  );
};

export default Navigation;
