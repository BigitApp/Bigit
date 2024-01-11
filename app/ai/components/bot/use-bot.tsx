import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Path } from "@/app/constant";
import { Bot, useBotStore2 } from "@/app/ai/store/bot";
import { useSidebarContext } from "@/app/ai/AI";
import { Updater } from "@/app/typing";

const BotItemContext = createContext<{
  bot: Bot;
  isActive: boolean;
  isReadOnly: boolean;
  isShareble: boolean;
  ensureSession: () => void;
  cloneBot: () => void;
  deleteBot: () => void;
  updateBot: Updater<Bot>;
}>({} as any);

export const BotItemContextProvider = (props: {
  bot: Bot;
  children: JSX.Element;
}) => {
  const bot = props.bot;
  const botStore = useBotStore2();
  const navigate = useNavigate();
  const { setShowSidebar } = useSidebarContext();

  const cloneBot = () => {
    const newBot = botStore.create(bot, {
      reset: true,
    });
    newBot.name = `My ${bot.name}`;
  };

  const isReadOnly = bot.readOnly;
  const isShareble = !!bot.share;

  const ensureSession = () => {
    navigate(Path.Home);
    botStore.selectBot(bot.id);
    setShowSidebar(false);
  };

  const deleteBot = () => {
    botStore.delete(bot.id);
  };

  const updateBot: Updater<Bot> = (updater) => {
    botStore.update(bot.id, updater);
  };

  const isActive = botStore.currentBotId === props.bot.id;

  return (
    <BotItemContext.Provider
      value={{
        bot,
        isActive,
        isReadOnly,
        isShareble,
        ensureSession,
        cloneBot,
        deleteBot,
        updateBot,
      }}
    >
      {props.children}
    </BotItemContext.Provider>
  );
};

export const useBot = () => useContext(BotItemContext);
