"use client"
import React, { useEffect } from 'react';
import { Hero } from './components/Hero';
import Features from "@/app/components/home/Features/Features";

export default function App() {
  useEffect(() => {
    document.title = "Bigit丨The world's largest platform for producing, using, and trading AI assistant NFT";
  }, []);

  return (
    <>
      <Hero />
      <Features />
    </>
  );
}