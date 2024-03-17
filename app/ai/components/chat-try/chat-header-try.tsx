import { useNavigate } from 'react-router-dom';
import { Button } from "@/app/components/ui/button";
import { useBotStore2 } from "@/app/ai/store/bot";
import { Undo2 } from "lucide-react";
import Locale from "@/app/locales";
import { Separator } from "@/app/components/ui/separator";
import Typography from "@/app/components/ui/typography";
import React, { useEffect, useState } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

export default function ChatHeaderTry() {
  const navigate = useNavigate();
  const botStore = useBotStore2();
  const bot = botStore.currentBot();
  const session = botStore.currentSession();
  const numberOfMessages =
    (bot.botHello?.length ? 1 : 0) + session.messages.length;
  const [countdown, setCountdown] = useState(60);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(prevCountdown => prevCountdown - 1);
      } else {
        clearInterval(timer); 
        handleGoBack(); 
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, handleGoBack]);

  return (
    <div className="relative">
      <div className="absolute top-4 left-5">
        <Button
          size="mini"
          variant="outline"
          title={Locale.Chat.Actions.ChatList}
          onClick={handleGoBack}
        >
          <Undo2 />
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <Typography.H4>{bot.name}</Typography.H4>
        <div className="flex items-center text-muted-foreground">
          {countdown > 0 ? (
            <>
              <ClockIcon className="h-4 w-4 mr-1 text-red-500" />
              {`${countdown}s left`}
            </>
          ) : (
            Locale.Chat.SubTitle(numberOfMessages)
          )}
        </div>
      </div>
      <Separator />
    </div>
  );
}
