import Locale from "@/app/locales";
import { DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Separator } from "@/app/components/ui/separator";
import BotSettings from "../bot-settings";

export default function EditBotDialogContent() {
  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{Locale.Bot.EditModal.Title}</DialogTitle>
      </DialogHeader>
      <Separator />
      <ScrollArea className="h-[50vh] mt-4 pr-4">
        <BotSettings />
      </ScrollArea>
    </DialogContent>
  );
}
