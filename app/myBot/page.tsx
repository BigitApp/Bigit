"use client"
import React, { useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { Home } from "../components/home";


export default async function myBot() {
  useEffect(() => {
    document.title = "Bigit丨MyBot";
  }, []);
  return (
    <>
      <Home />
      <Analytics />
    </>
  );
}