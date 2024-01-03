import { Analytics } from "@vercel/analytics/react";
import Head from 'next/head';

import { Home } from "../components/home";


export default async function App() {
  return (
    <>
      <Home />
      <Analytics />
    </>
  );
}