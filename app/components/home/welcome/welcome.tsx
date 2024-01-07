import React, { useEffect } from "react";
import classes from "./welcome.module.css";

const Welcome = ({ showWelcomeScreen }) => {
  useEffect(() => {
    document.getElementById("dropIcon").onanimationend = () => {
      showWelcomeScreen(false);
    };
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.gena}>Bigit</div>
      <div className={classes.drop}>
        Start N
        <div className={classes.imageContainer}>
          <img id="dropIcon" className={classes.image} src="/logo.svg" alt="" />
        </div>
        W
      </div>
    </div>
  );
};

export default Welcome;
