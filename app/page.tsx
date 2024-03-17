"use client"
import React, { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import Features from "@/app/components/home/Features/Features";
import Welcome from "@/app/components/home/welcome/welcome";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  useEffect(() => {
    document.title = "Bigit: Blockchain And AI Generate Your Individual Assistant";
    setIsLoading(false);
  }, []);


  // if (isLoading) {
  //   return (
  //     <>
  //       <Hero />
  //       <Features />
  //       <Welcome showWelcomeScreen={setShowWelcomeScreen} />
  //     </>
  //   );
  // }

  return (
    <>
      <Hero />
      <Features />
    </>
  );
}