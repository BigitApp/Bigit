"use client"
import React, { useEffect,useState } from 'react';
import { SearchInput } from '@/app/myBotNft/components/SearchInput'
import MyAppList from '@/app/myBotNft/components/MyAppList'

import { BrowserRouter as Router } from 'react-router-dom';

import dynamic from 'next/dynamic';

const DynamicBrowserRouter = dynamic(
  () => import('react-router-dom').then((mod) => mod.BrowserRouter),
  { ssr: false }
);

export default function MyBotNFT() {
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        document.title = "Bigit丨My Bot NFT";
    }, []);

    return (
        <>
        <main>
            <div className="w-full pb-20 pt-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <DynamicBrowserRouter>
                    <MyAppList/> 
                    </DynamicBrowserRouter>
                </div>
            </div>
        </main>
        </>
    );
}