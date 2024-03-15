"use client"
import React, { useEffect,useState } from 'react';
import { SearchInput } from '@/app/market/components/SearchInput'
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
                <div className="mb-10 grid grid-cols-1 items-center justify-between pt-10 sm:grid-cols-3 sm:pt-0 ">
                    <div />
                    <SearchInput
                        setSearchValue={setSearchValue}
                        placeholder={'Search AI Assistant...'}
                    />
                    <div />
                </div>
                <DynamicBrowserRouter>
                   <AppList/> 
                </DynamicBrowserRouter>
                </div>
            </div>
        </main>
    </>
    );
}