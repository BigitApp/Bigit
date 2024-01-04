"use client"
import React, { useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { Home } from "./components/home";
import { Hero } from './components/Hero';

export default function App() {
  useEffect(() => {
    document.title = "Bigit丨全球最大的AI助手数字藏品生产、使用、交易平台";
  }, []);

  return (
    <>
      <Hero />
    </>
  );
}