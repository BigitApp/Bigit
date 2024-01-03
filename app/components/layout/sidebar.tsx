import { ThemeToggle } from "@/app/components/layout/theme-toggle";
import { Github, Settings } from "lucide-react";
import dynamic from "next/dynamic";
import { useNavigate } from "react-router-dom";
import { GITHUB_URL, Path } from "../../constant";
import Locale from "../../locales";
import { Button } from "../ui/button";
import Typography from "../ui/typography";
import { useSidebarContext } from "@/app/components/home";
import { ConnectWallet, useConnectionStatus } from '@thirdweb-dev/react'

const BotList = dynamic(async () => (await import("../bot/bot-list")).default, {
  loading: () => null,
});

export function SideBar(props: { className?: string }) {
  const navigate = useNavigate();
  const { setShowSidebar } = useSidebarContext();
  const status = useConnectionStatus()
  const isConnected = status === 'connected'

  return (
    <div className="h-full relative group border-r w-full md:w-[300px]">
      <div className="w-full h-full p-5 flex flex-col gap-5">
        <div className="flex flex-col flex-1">
          <div className="mb-5 flex justify-between items-center gap-4">
            <ConnectWallet 
              className={`${isConnected ? 'border-none bg-black-main text-white' : 'p-2 text-white'}`}
              theme={"dark"}
              switchToActiveChain={true}
              modalSize={"compact"}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                navigate(Path.Settings);
                setShowSidebar(false);
              }}
            >
              <Settings className="h-5 w-5" />
            </Button>
            <ThemeToggle />
          </div>
          <BotList />
        </div>
      </div>
    </div>
  );
}
