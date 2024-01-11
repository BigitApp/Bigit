import { Fingerprint, Users, Boxes  } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "@/app/constant";
import Locale from "@/app/locales";
import { useBotStore2 } from "@/app/ai/store/bot";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import BotItem from "./bot-item";
import { BotAvatarLarge } from "@/app/components/ui/emoji";

export default function BotList() {
  const botStore = useBotStore2();
  const currentBot = botStore.currentBot();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [editBotId, setEditBotId] = useState<string | undefined>(undefined);

  const onClickContainer = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      navigate(Path.Home);
    }
  };

  const onClickCreate = () => {
    const newBot = botStore.create();
    botStore.selectBot(newBot.id);
    setEditBotId(newBot.id);
  };

  const allBots = botStore.getAll();
  const filteredBots = allBots.filter((b) =>
    b.name.toLowerCase().includes(searchText.toLowerCase()),
  );
  const botList = searchText.length > 0 ? filteredBots : allBots;
  const editBot = editBotId ? botStore.get(editBotId) : undefined;

  return (
    <div className="flex-1" onClick={onClickContainer}>
      <ScrollArea className="h-[80vh] pr-0 md:pr-3 flex flex-col items-center justify-center space-y-4 p-4 rounded-lg">
        {botList.map((b) => (
          <BotItem key={b.id} bot={b} />
        ))}
        <div className="bg-white flex items-center justify-center mb-4 transform hover:scale-110 transition-transform duration-200 cursor-pointer">
          <BotAvatarLarge avatar={currentBot.avatar} />
        </div>
        <div className="text-base text-center bg-green-600 text-white p-2 border border-gray-300 rounded flex items-center justify-center">
          <Fingerprint className="mr-2 h-4 w-4" />
          Bot ID
        </div>
        <div className="text-base text-center bg-white text-black p-2 border border-gray-300 rounded mb-4">{currentBot.id}</div>
        <div className="text-base text-center bg-green-600 text-white p-2 border border-gray-300 rounded flex items-center justify-center">
          <Users className="mr-2 h-4 w-4" />
          Bot Name
        </div>
        <div className="text-base text-center bg-white text-black p-2 border border-gray-300 rounded mb-4">{currentBot.name}</div>
        <div className="text-base text-center bg-green-600 text-white p-2 border border-gray-300 rounded flex items-center justify-center">
          <Boxes className="mr-2 h-4 w-4" />
          Bot Model
        </div>
        <div className="text-base text-center bg-white text-black p-2 border border-gray-300 rounded">{currentBot.modelConfig.model}</div>
      </ScrollArea>
    </div>
  );
}
