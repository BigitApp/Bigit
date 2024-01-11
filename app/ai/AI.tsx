"use client";

import React, { useContext, useEffect, useState } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { useMobileScreen } from "@/app/utils/mobile";

import dynamic from "next/dynamic";
import { Path } from "@/app/constant";
import { ErrorBoundary } from "@/app/ai/components/layout/error";
import { readFromFile } from "@/app/utils/download";
import Locale from "@/app/locales";
import { useToast } from "@/app/components/ui/use-toast";

import { Button} from "@/app/components/ui/button";

import {
  Route,
  HashRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Bot, useBotStore2 } from "@/app/ai/store/bot";
import { SideBar } from "@/app/ai/components/layout/sidebar";
import { LoadingPage } from "@/app/components/ui/loading";
import { Loader2 } from "lucide-react";

export function Loading() {
  return <Loader2 className="h-4 w-4 animate-spin" />;
}

const SettingsPage = dynamic(
  async () => (await import("@/app/ai/components/settings")).Settings,
  {
    loading: () => <LoadingPage />,
  },
);

const ChatPage = dynamic(async () => (await import("@/app/ai/components/chat/chat")).Chat, {
  loading: () => <LoadingPage />,
});

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

const loadAsyncGoogleFont = () => {
  const linkEl = document.createElement("link");
  const googleFontUrl = "https://fonts.googleapis.com";
  linkEl.rel = "stylesheet";
  linkEl.href =
    googleFontUrl + "/css2?family=Noto+Sans:wght@300;400;700;900&display=swap";
  document.head.appendChild(linkEl);
};


function withBot(Component: React.FunctionComponent, bot?: Bot) {
  return function WithBotComponent() {
    console.log('WithBotComponent rendered');
    const [botInitialized, setBotInitialized] = useState(false);
    const navigate = useNavigate();
    const botStore = useBotStore2();

    const handleButtonClick = async () => {
      const content = await readFromFile();
      const importBots = JSON.parse(content);
      console.log(importBots);
      botStore.restore(importBots);
      setBotInitialized(true);
    };

    if (botInitialized) {
      return <Component />;
    } else {
      return (
        <div className="w-full h-screen max-h-full flex items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <Button variant="default" className="h-8 w-32 p-0" onClick={handleButtonClick}>Choose File</Button>
        </div>
      );
    }
  };
}

const SidebarContext = React.createContext<{
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
} | null>(null);

function SidebarContextProvider(props: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
      {props.children}
    </SidebarContext.Provider>
  );
}

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "useSidebarContext must be used within an SidebarContextProvider",
    );
  }
  return context;
};

function Screen() {
  const isMobileScreen = useMobileScreen();
  const { showSidebar } = useSidebarContext();

  const showSidebarOnMobile = showSidebar || !isMobileScreen;

  useEffect(() => {
    loadAsyncGoogleFont();
  }, []);

  return (
    <main className="flex overflow-hidden h-[85vh] w-screen box-border">
      <>
        {showSidebarOnMobile && <SideBar />}
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path={Path.Chat} element={<ChatPage />} />
            <Route path={Path.Settings} element={<SettingsPage />} />
          </Routes>
        </div>
      </>
    </main>
  );
}

export function AI({ bot }: { bot?: Bot }) {
  if (!useHasHydrated()) {
    return <LoadingPage />;
  }

  const BotScreen = withBot(Screen, bot);
  const queryClient = new QueryClient();

  return (
    <ErrorBoundary>
      <Router>
        <QueryClientProvider client={queryClient}>
          <SidebarContextProvider>
            <BotScreen />
          </SidebarContextProvider>
        </QueryClientProvider>
      </Router>
    </ErrorBoundary>
  );
}
