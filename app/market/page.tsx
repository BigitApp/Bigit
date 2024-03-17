"use client"
import React, { useEffect,useState } from 'react';
import AppList from '@/app/market/components/AppList'
import dynamic from 'next/dynamic';

const DynamicBrowserRouter = dynamic(
  () => import('react-router-dom').then((mod) => mod.BrowserRouter),
  { ssr: false }
);

export default function Market() {
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        document.title = "Bigit丨Market";
    }, []);
    return (
        <>
        <main>
            <div className="w-full pb-20 pt-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <DynamicBrowserRouter>
                   <AppList/> 
                </DynamicBrowserRouter>
                </div>
            </div>
        </main>
    </>
    );
}