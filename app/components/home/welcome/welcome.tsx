import React, { useEffect, FC } from "react";
import classes from "./welcome.module.css";

interface WelcomeProps {
  showWelcomeScreen: (show: boolean) => void;
}

const Welcome: FC<WelcomeProps> = ({ showWelcomeScreen }) => {
  useEffect(() => {
    const dropIconElement = document.getElementById("dropIcon");
    if (dropIconElement) {
      dropIconElement.onanimationend = () => {
        showWelcomeScreen(false);
      };
    }
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.gena}>Bigit</div>
      <div className={classes.drop}>
        N
        <div className={classes.imageContainer}>
          <img id="dropIcon" className={classes.image} src="/logo.svg" alt="" />
        </div>
        W
      </div>
    </div>
  );
};

export default Welcome;