"use client"
import React, { useEffect, useState} from 'react';
import { Hero } from './components/Hero';
import Features from "@/app/components/home/Features/Features";
import Welcome from "@/app/components/home/welcome/welcome";

export default function App() {

  useEffect(() => {
    document.title = "Bigit: Blockchain And AI Generate Your Individual Assistant";
  }, []);

  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  if (showWelcomeScreen && window.sessionStorage.showWelcomeScreen === undefined) {
    return <Welcome showWelcomeScreen={setShowWelcomeScreen} />;
  }

  return (
    <>
      <Hero />
      <Features />
    </>
  );
}