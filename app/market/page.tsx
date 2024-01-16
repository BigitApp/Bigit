"use client"
import React, { useEffect,useState } from 'react';
import { SearchInput } from '@/app/market/components/SearchInput'
import AppListLoading from '@/app/market/components/AppListLoading'
import Welcome from "@/app/components/home/welcome/welcome";

import { HashRouter as Router} from "react-router-dom";


export default function Market() {
    const [searchValue, setSearchValue] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

    useEffect(() => {
        document.title = "Bigit丨Market";
        setIsLoading(false);
    }, []);

    if (isLoading) {
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
                    <Router>
                        <AppListLoading />
                    </Router>
                    </div>
                </div>
            </main>
            <Welcome showWelcomeScreen={setShowWelcomeScreen} />
          </>
        );
      }


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
                <Router>
                   <AppListLoading /> 
                </Router>
                </div>
            </div>
        </main>
        </>
    );
}