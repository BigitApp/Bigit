import { Settings, Bot } from "lucide-react";
import dynamic from "next/dynamic";
import { useNavigate } from "react-router-dom";
import { Path } from "../../constant";
import { Button } from "../ui/button";
import { useSidebarContext } from "@/app/components/home";
import { ConnectWallet, useConnectionStatus } from '@thirdweb-dev/react'
import Link from 'next/link';

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
              theme={"light"}
              modalSize={"compact"}
              modalTitleIconUrl={""}
              switchToActiveChain={true}
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
            <Link href="/market">
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <Bot className="h-5 w-5" />
                </Button>
            </Link>
          </div>
          <BotList />
        </div>
      </div>
    </div>
  );
}
