import { useState } from "react";
import Locale from "../../../locales";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import ConfigItem from "./config-item";
import { BotAvatar } from "@/app/components/ui/emoji";
import { useBotStore } from "../../../store/bot";

export default function BotMint() {
  const botStore = useBotStore();
  const [showPicker, setShowPicker] = useState(false);
  const currentBot = botStore.currentBot();
  console.log(currentBot)

  return (
    <>
      <Card>
        <CardContent className="divide-y p-5">
          <ConfigItem title={Locale.Bot.Config.Avatar}>
            <Popover open={showPicker}>
              <PopoverTrigger onClick={() => setShowPicker(true)}>
                <BotAvatar avatar={currentBot.avatar} />
              </PopoverTrigger>
            </Popover>
          </ConfigItem>
          <ConfigItem title={Locale.Bot.Config.Name}>
            <Input
              type="text"
              value={currentBot.name}
            />
          </ConfigItem>
          <ConfigItem title={Locale.Bot.Config.ModelData}>
            <Input
              type="text"
              value={JSON.stringify(currentBot.modelConfig)}
            />
          </ConfigItem>
          <ConfigItem
            title={Locale.Bot.Config.BotHello.Title}
            subTitle={Locale.Bot.Config.BotHello.SubTitle}
          >
            <Input
              type="text"
              value={currentBot.botHello || ""}
            />
          </ConfigItem>
          <ConfigItem title={Locale.Bot.Config.History}>
            <Input
              type="text"
              value={JSON.stringify(currentBot.session)}
            />
          </ConfigItem>
        </CardContent>
      </Card>
    </>
  );
}
