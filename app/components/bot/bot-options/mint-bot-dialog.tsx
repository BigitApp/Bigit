import Locale from "../../../locales";
import { useState } from "react";
import axios from 'axios';
import { DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { ScrollArea } from "../../ui/scroll-area";
import { Separator } from "../../ui/separator";
import { useBotStore } from "../../../store/bot";
import { Button } from "../../ui/button";
import { createToken} from '@/app/contracts/index'
import ConfigItem from "@/app/components/bot/bot-settings/config-item";
import { Minting } from "@/app/components/ui/loading";
import BotMint from "@/app/components/bot/bot-settings/bot-mint";
import { Input } from "@/app/components/ui/input";
import { useSetIsWalletModalOpen, useConnectionStatus } from '@thirdweb-dev/react';

const apiKey = '18cef194571c96059033';
const apiSecret = '166e6ef67ec4ac961b4c2552c72a6e2b032d32bed735cb3b70c9fe2467401d1c';


export default function MintBotDialogContent() {
    const botStore = useBotStore();
    const [isLoading, setIsLoading] = useState(false);
    const setIsWalletModalOpen = useSetIsWalletModalOpen();
    const status = useConnectionStatus();
    const isConnected = status === 'connected';
    const [formInput, updateFormInput] = useState({ price: ''})

    const mintBots = async () => {
        if (!isConnected) {
          setIsWalletModalOpen(true);
        } else {
            setIsLoading(true);
            const currentBot = botStore.currentBot();
            const botId = currentBot.id;
            const dataToMint = {
            bots: {
                [botId]: currentBot,
            },
            currentBotId: botId,
            };
            console.log(dataToMint)
            try {
                const response = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', dataToMint, {
                  headers: {
                    'Content-Type': 'application/json',
                    'pinata_api_key': apiKey,
                    'pinata_secret_api_key': apiSecret
                  }
                });
                const price = formInput.price;
                const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

                console.log(ipfsUrl)
                await createToken(ipfsUrl, price)
              } catch (error) {
                console.error('Error minting NFT:', error);
              } finally {
                setIsLoading(false);
              }
        }
    };

  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{Locale.Bot.Mint.Title}</DialogTitle>
      </DialogHeader>
      <Separator />
      <ScrollArea className="h-[50vh] mt-4 pr-4">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
        <BotMint />
        <ConfigItem title={Locale.Bot.Mint.Price}>
          <Input
            placeholder="Price in Eth"
            type="text"
            onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
          />
        </ConfigItem>
        <div style={{ marginBottom: '1rem' }}>
          {isLoading && <Minting />}
        </div>
      </div>

      </ScrollArea>
      <Button onClick={mintBots} className="mt-4">
        {'Mint Bot'}
      </Button>
    </DialogContent>
  );
}
