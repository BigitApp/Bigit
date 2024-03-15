"use client"
import React, { useEffect, useState } from 'react';
import { AI } from "@/app/ai/AI";
import { useRouter, useSearchParams } from 'next/navigation'

export default function AiPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Bigit丨AiPage";
    setIsLoading(false);
  }, []);


  return (
    <>
      <AI />
    </>
  );
}