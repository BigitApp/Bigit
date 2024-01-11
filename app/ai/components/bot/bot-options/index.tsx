import {
  ClipboardEdit,
  Copy,
  MoreHorizontal,
  Share2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import Locale from "@/app/locales";
import { AlertDialog, AlertDialogTrigger } from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {HardDriveDownload} from "lucide-react";
import { useBot } from "../use-bot";
import DeleteBotDialogContent from "./delete-bot-dialog";
import EditBotDialogContent from "./edit-bot-dialog";
import { downloadAs } from "@/app/utils/download";
import { useBotStore2 } from "@/app/ai/store/bot";
import { FileName } from "@/app/constant";

export default function BotOptions() {

  const botStore = useBotStore2();
  const { isReadOnly, isShareble, cloneBot } = useBot();
  const [dialogContent, setDialogContent] = useState<JSX.Element | null>(null);

  const backupBots = () => {
    const currentBot = botStore.currentBot();
    const botName = currentBot ? currentBot.name : 'Bot';
    const botId = currentBot.id;

    const dataToDownload = {
      bots: {
        [botId]: currentBot,
      },
      currentBotId: botId,
    };

    downloadAs(JSON.stringify(dataToDownload), `${botName}.json`);
  };


  return (
    <Dialog>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={cloneBot}>
              <Copy className="mr-2 w-4 h-4" />
              <span>{Locale.Bot.EditModal.Clone}</span>
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem
                disabled={isReadOnly}
                onClick={() => setDialogContent(<EditBotDialogContent />)}
              >
                <ClipboardEdit className="mr-2 w-4 h-4" />
                <span>{Locale.Bot.Item.Edit}</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger className="w-full">
              <DropdownMenuItem
                disabled={isReadOnly && !isShareble}
                onClick={() => setDialogContent(<DeleteBotDialogContent />)}
              >
                <XCircle className="mr-2 w-4 h-4" />
                <span>{Locale.Bot.Item.Delete}</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <DialogTrigger asChild>
              <DropdownMenuItem
                disabled={isReadOnly}
                onClick={backupBots}
              >
                <HardDriveDownload className="mr-2 w-4 h-4" />
                <span>{Locale.Bot.Item.Mint}</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogContent}
      </AlertDialog>
    </Dialog>
  );
}
