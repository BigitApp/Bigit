import { Settings, Bot } from "lucide-react";
import dynamic from "next/dynamic";
import { useNavigate } from "react-router-dom";
import { Path } from "@/app/constant";
import { Button } from "@/app/components/ui/button";
import { useSidebarContext } from "@/app/ai/AI";
import { ConnectWallet, useConnectionStatus } from '@thirdweb-dev/react'
import Link from 'next/link';

const BotList = dynamic(async () => (await import("@/app/ai/components/bot/bot-list")).default, {
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
          <BotList />
        </div>
      </div>
    </div>
  );
}
