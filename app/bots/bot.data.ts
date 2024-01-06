import { Bot } from "@/app/store/bot";
import { nanoid } from "nanoid";
import Locale from "../locales";
import { ModelType } from "@/app/client/platforms/llm";
import { createEmptySession } from "../store";

const TEMPLATE = (PERSONA: string) =>
  `I want you to act as a ${PERSONA}. I will provide you with the context needed to solve my problem. Use intelligent, simple, and understandable language. Be concise. It is helpful to explain your thoughts step by step and with bullet points.`;

type DemoBot = Omit<Bot, "session">;

export const DEMO_BOTS: DemoBot[] = [
  {
    id: "1",
    avatar: "1f5a5-fe0f",
    name: "Bigit项目机器人",
    botHello: "你好，我是Bigit项目机器人，我可以帮助你解决Bigit项目相关的问题。",
    context: [
      {
        role: "system",
        content: TEMPLATE("Bigit项目机器人"),
      },
    ],
    modelConfig: {
      model: "gpt-3.5-turbo",
      temperature: 0.1,
      maxTokens: 4096,
      sendMemory: true,
    },
    readOnly: false,
    hideContext: false,
  },
  {
    id: "2",
    avatar: "1f454",
    name: "代码天才",
    botHello: "你好！我是代码天才，可以帮您解决代码相关的问题",
    context: [
      {
        role: "system",
        content: TEMPLATE("代码天才"),
      },
    ],
    modelConfig: {
      model: "gpt-3.5-turbo",
      temperature: 0.1,
      maxTokens: 4096,
      sendMemory: true,
    },
    readOnly: false,
    hideContext: false,
  },
  {
    id: "3",
    avatar: "1f4da",
    name: "宠物助手",
    botHello: "你好！我是宠物助手，可以帮助您解决一切宠物的问题",
    context: [
      {
        role: "system",
        content: TEMPLATE("宠物助手"),
      },
    ],
    modelConfig: {
      model: "gpt-3.5-turbo",
      temperature: 0.1,
      maxTokens: 4096,
      sendMemory: true,
    },
    readOnly: false,
    hideContext: false,
  },
];

export const createDemoBots = (): Record<string, Bot> => {
  const map: Record<string, Bot> = {};
  DEMO_BOTS.forEach((demoBot) => {
    const bot: Bot = JSON.parse(JSON.stringify(demoBot));
    bot.session = createEmptySession();
    map[bot.id] = bot;
  });
  return map;
};

export const createEmptyBot = (): Bot => ({
  id: nanoid(),
  avatar: "1f916",
  name: Locale.Store.DefaultBotName,
  context: [],
  modelConfig: {
    model: "gpt-4-1106-preview" as ModelType,
    temperature: 0.5,
    maxTokens: 4096,
    sendMemory: true,
  },
  readOnly: false,
  createdAt: Date.now(),
  botHello: Locale.Store.BotHello,
  hideContext: false,
  session: createEmptySession(),
});
