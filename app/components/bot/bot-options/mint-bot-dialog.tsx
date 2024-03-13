import Locale from "../../../locales";
import { useState } from "react";
import axios from 'axios';
import { DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { ScrollArea } from "../../ui/scroll-area";
import { Separator } from "../../ui/separator";
import BotSettings from "../bot-settings";
import { useBotStore } from "../../../store/bot";
import { downloadAs } from "../../../utils/download";
import { useConnectionStatus } from "@thirdweb-dev/react";
import { Button } from "../../ui/button";
import { ethers } from "ethers";
import { createToken} from '@/app/contracts/index'
import Loading from '@/app/components/Loading'; 

const apiKey = '18cef194571c96059033';
const apiSecret = '166e6ef67ec4ac961b4c2552c72a6e2b032d32bed735cb3b70c9fe2467401d1c';


export default function MintBotDialogContent() {
    const botStore = useBotStore();
    const status = useConnectionStatus()
    const isConnected = status === 'connected'
    const [showAlert, setShowAlert] = useState(false);
    const [formInput, updateFormInput] = useState({ price: ''})

    const mintBots = async () => {
        if (!isConnected) {
            setShowAlert(true);
        } else {
            Loading.start('Creating...');
            const currentBot = botStore.currentBot();
            const botName = currentBot ? currentBot.name : 'Bot';
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
                Loading.stop();
                
              }
        }
    };

  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{'Mint Your Bot'}</DialogTitle>
      </DialogHeader>
      <Separator />
      <ScrollArea className="h-[50vh] mt-4 pr-4">
        {/* <BotSettings /> */}
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
      </ScrollArea>
      <Button onClick={mintBots} className="mt-4">
        {'Mint Bot'}
      </Button>
      {showAlert && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 text-black">
                    <div className="bg-white p-5 rounded shadow-lg max-w-sm mx-auto w-full h-auto overflow-auto flex flex-col">
                        <div className="pb-5">
                        </div>
                        <div className="mb-5">
                            Please connect your wallet first
                        </div>
                        <Button onClick={() => setShowAlert(false)} className="mt-4">
                            {'OK'}
                        </Button>
                    </div>
                </div>
    )}
    </DialogContent>
  );
}
