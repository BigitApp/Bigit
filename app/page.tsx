"use client"
import React, { useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { Home } from "./components/home";

export default function App() {
  useEffect(() => {
    document.title = "Bigit";
  }, []);

  return (
    <>
    </>
  );
}