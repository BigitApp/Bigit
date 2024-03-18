import { Bot } from "@/app/store/bot";
import { nanoid } from "nanoid";
import Locale from "../locales";
import { ModelType } from "@/app/client/platforms/llm";
import { createEmptySession } from "../store";

const TEMPLATE = (PERSONA: string) =>
  `
  我希望你扮演一个${PERSONA}的角色。我会提供你需要的背景信息来解决我的问题。使用智能、简单且易于理解的语言。请保持简洁。逐步解释你的想法，并使用项目符号来阐述会非常有帮助。`;

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
      {
        role: "system",
        content: 'Bigit项目是一个创新的应用，它首次将区块链技术与本地大模型融合，实现了真正的属于自己的AI助手，并赋予了价值属性。项目的技术实现主要依赖于Python后端，以更好地将BigDL融入主流框架。bigit的官网是：https://www.bigitapp.com/',
      }
    ],
    modelConfig: {
      model: "gpt-3.5-turbo",
      temperature: 0.1,
      maxTokens: 512,
      sendMemory: true,
    },
    readOnly: false,
    hideContext: true,
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
      maxTokens: 512,
      sendMemory: true,
    },
    readOnly: false,
    hideContext: true,
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
      maxTokens: 512,
      sendMemory: true,
    },
    readOnly: false,
    hideContext: true,
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
    model: "gpt-3.5-turbo" as ModelType,
    temperature: 0.5,
    maxTokens: 512,
    sendMemory: true,
  },
  readOnly: false,
  createdAt: Date.now(),
  botHello: Locale.Store.BotHello,
  hideContext: false,
  session: createEmptySession(),
});
