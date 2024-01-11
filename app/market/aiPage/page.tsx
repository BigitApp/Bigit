"use client"
import React, { useEffect, useState } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { AI } from "@/app/ai/AI";
import Welcome from "@/app/components/home/welcome/welcome";

export default function MyBot() {
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  useEffect(() => {
    document.title = "Bigit丨MyBot";
    setIsLoading(false);
  }, []);

  return (
    <>
      <AI />
      <Analytics />
    </>
  );
}