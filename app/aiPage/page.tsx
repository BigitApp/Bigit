"use client"
import React, { useEffect, useState } from 'react';
import { AI } from "@/app/ai/AI";
import { useRouter, useSearchParams } from 'next/navigation'

export default function AiPage() {
  const router = useRouter();
  const [searchParams] = useSearchParams(); 
  const [tokenId, setTokenId] = useState<number | undefined>(undefined); 

  useEffect(() => {
    document.title = "Bigit丨AiPage";
    const getId = parseInt(searchParams[1])
    setTokenId(getId)
  }, []);

  useEffect(() => {
    document.title = "Bigit丨AiPage";
  }, []);


  return (
    <>
      {tokenId !== undefined && <AI tokenId={tokenId} />}
    </>
  );
}

