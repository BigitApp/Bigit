import EditBotDialogContent from "@/app/ai/components/bot/bot-options/edit-bot-dialog";
import { BotItemContextProvider } from "@/app/ai/components/bot/use-bot";
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "@/app/constant";
import Locale from "@/app/locales";
import { useBotStore2 } from "@/app/ai/store/bot";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import BotItem from "./bot-item";

export default function BotList() {
  const botStore = useBotStore2();
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
      <div className="space-y-2 mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" onClick={onClickCreate}>
              <PlusCircle className="mr-2 h-4 w-4" /> {Locale.Bot.Page.Create}
            </Button>
          </DialogTrigger>
          {editBot && (
            <BotItemContextProvider bot={editBot}>
              <EditBotDialogContent />
            </BotItemContextProvider>
          )}
        </Dialog>
        <Input
          className="text-center"
          type="text"
          placeholder={Locale.Bot.Page.Search(allBots.length)}
          onInput={(e) => setSearchText(e.currentTarget.value)}
        />
      </div>
      <ScrollArea className="h-[60vh] pr-0 md:pr-3">
        {botList.map((b) => (
          <BotItem key={b.id} bot={b} />
        ))}
      </ScrollArea>
    </div>
  );
}
