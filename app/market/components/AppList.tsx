import { FireIcon, PlayIcon, CurrencyBangladeshiIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import { BotAvatarLarge } from "@/app/components/ui/emoji";
import { loadNFTs, buyNFT } from '@/app/contracts/index';
import { useSetIsWalletModalOpen, useConnectionStatus } from '@thirdweb-dev/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Buying } from "@/app/components/ui/loading";
import AppListLoading from '@/app/market/components/AppListLoading'

interface NFT {
  price: string;
  tokenId: number;
  seller: string;
  owner: string;
  bot: string;
  name: string;
  avatar: string;
}

const AppList = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const router = useRouter();
  const [isBuying, setIsBuying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const setIsWalletModalOpen = useSetIsWalletModalOpen();
  const status = useConnectionStatus();
  const isConnected = status === 'connected';
  const { t } = useTranslation('common');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const allData = await loadNFTs();
        setNfts(allData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      }
    };
    fetchData();
  }, []);

  const handleBuy = async (nft: NFT) => {
    if (!isConnected) {
      setIsWalletModalOpen(true);
      return;
    }
    setIsBuying(true);
    try {
      await buyNFT(nft);
    } catch (error) {
      console.error('Error during purchase:', error);
    } finally {
      setIsBuying(false);
    }
  };

  const handleRun = (tokenId: number) => {
    if (!isConnected) {
      setIsWalletModalOpen(true);
      return;
    }
    router.push(`/aiPage?tokenId=${tokenId}`)
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      { isLoading && <AppListLoading />}
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {nfts.map((nft, idx) => (
        <li
          key={idx}
          className="col-span-1 flex flex-col justify-between divide-y rounded-lg text-center shadow-lg border bg-opacity-20 cursor-pointer transform hover:scale-105 transition-transform duration-200"
        >
          <div>
            <div className="flex flex-1 flex-col items-center p-8">
              <div className="bg-white flex items-center justify-center transform hover:scale-110 transition-transform duration-200 cursor-pointer">
                <BotAvatarLarge avatar={nft.avatar} />
              </div>
              <h3 className="mt-6 text-sm font-bold text-gray-900">
                {nft.name}
              </h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Title</dt>
                <dd className="w-full text-center text-sm text-gray-500">
                  BOT #{nft.tokenId}
                </dd>
                <dd className="w-full text-center text-sm text-gray-500 flex items-center">
                  <span>Price: </span>
                  <CurrencyBangladeshiIcon
                    className="h-4 w-4 ml-1 text-green-700"
                    aria-hidden="true"
                  />
                  <span>{nft.price}</span>
                </dd>
              </dl>
            </div>
          </div>

          <div>
            <div className="-mt-px flex divide-x">
              <div className="flex w-0 flex-1">
                {!isBuying && ( 
                  <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg  py-4 text-sm font-semibold text-gray-900 cursor-pointer transform hover:scale-110 transition-transform duration-200" 
                    onClick={() => handleBuy(nft)}>
                    <FireIcon
                      className="h-5 w-5 text-green-700"
                      aria-hidden="true"
                    />
                    {t('Buy Now')}
                  </div>
                )}
                { isBuying && ( 
                  <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg  py-4 text-sm font-semibold text-gray-900 cursor-pointer transform hover:scale-110 transition-transform duration-200" >
                      <Buying /> 
                  </div>
                )}
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <div className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg py-4 text-sm font-semibold text-gray-900 cursor-pointer transform hover:scale-110 transition-transform duration-200"
                    onClick={() => handleRun(nft.tokenId)}>
                    <PlayIcon
                      className="h-5 w-5 text-green-700 mr-2.5"
                      aria-hidden="true"
                    />
                    {t('Run')}
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default AppList;