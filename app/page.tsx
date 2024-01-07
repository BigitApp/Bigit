"use client"
import React, { useEffect } from 'react';
import { Hero } from './components/Hero';
import Features from "@/app/components/home/Features/Features";

export default function App() {
  useEffect(() => {
    document.title = "Bigit: Blockchain And AI Generate Your Individual Assistant";
    document.body.style.zoom = "110%";
  }, []);

  return (
    <>
      <Hero />
      <Features />
    </>
  );
}