import React, { useEffect } from "react";
import Link from 'next/link';
import { Container } from '@/app/components/Container'
import classes from "./Features.module.css";
import features from "./Feature-Script";

const Features = () => {
  useEffect(() => {
    const cards = document.getElementsByClassName("features-card");
    const offSet = 100;
    window.addEventListener("scroll", () => {
      for (const card of cards) {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop + offSet <= window.innerHeight-200) {
          card.children[0].style.transform = "translateX(0)";
          card.children[1].style.transform = "translateX(0)";
        } else {
          card.children[0].style.transform = "translateX(-6em)";
          card.children[1].style.transform = "translateX(6em)";
        }
      }
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#eff3f9] to-[#ffffff] via-[rgba(144,238,144,0.2)] sm:pb-20 pb-10">
      <Container>
        <div className={classes.wrapper}>
          {features.map((f, idx) => (
            <div key={idx} className={`${classes.featureContainer} ${idx % 2 !== 0 && classes.not} features-card`}>
              <div className={classes.content}>
                <div className={classes.fHeading}>{f.heading}</div>
                <div className={classes.fTitle}>{f.title}</div>
                <div className={classes.fDescription}>{f.description}</div>
                <Link href={f.url} className={classes.fLink}>
                  <div>{f.link}</div>
                </Link>
              </div>
              <img className={classes.image} src={f.image} alt="" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Features;
