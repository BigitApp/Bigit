import { FireIcon, PlayIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'next-i18next'
import { useBotStore } from "@/app/store/bot";
import { BotAvatarLarge } from "@/app/components/ui/emoji";
import { useRouter } from 'next/router';

import { useSetIsWalletModalOpen, useConnectionStatus } from '@thirdweb-dev/react'
import { useNavigate } from "react-router-dom";

const AppListLoading = () => {

  const setIsWalletModalOpen = useSetIsWalletModalOpen()
  const status = useConnectionStatus()
  const isConnected = status === 'connected'
  const { t } = useTranslation('common')
  const botStore = useBotStore();
  const currentBot = botStore.currentBot();
  const navigate = useNavigate();

  const handleBuy = async () => {   //购买的逻辑
    if (!isConnected) {
      setIsWalletModalOpen(true)
      return
    }
  }

  const handleRun = async () => {   //Run的逻辑
    navigate('/market/aiPage');
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {[1, 2, 3, 4, 5, 6].map((app, idx) => (
        <li
          key={idx}
          className="col-span-1 flex flex-col justify-between divide-y divide-gray-600 rounded-lg bg-white text-center shadow border border-gray-600"
        >
          <div>
            <div className="flex flex-1 flex-col items-center p-8">
              <div className="bg-white flex items-center justify-center transform hover:scale-110 transition-transform duration-200 cursor-pointer">
                <BotAvatarLarge avatar={currentBot.avatar} />
              </div>
              <h3 className="mt-6 text-sm font-medium text-gray-900">
                {currentBot.modelConfig.model}
              </h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Title</dt>
                <dd className="w-full text-center text-sm text-gray-500">
                  {currentBot.name}
                </dd>
              </dl>
            </div>
          </div>

          <div>
            <div className="-mt-px flex divide-x divide-gray-600">
              <div className="flex w-0 flex-1">
                <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 cursor-pointer transform hover:scale-110 transition-transform duration-200" onClick={handleBuy}>
                  <FireIcon
                    className="h-5 w-5 text-green-700"
                    aria-hidden="true"
                  />
                  {t('Buy Now')}
                </div>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <div className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 cursor-pointer transform hover:scale-110 transition-transform duration-200" onClick={handleRun}>
                    <PlayIcon
                      className="h-5 w-5 text-green-700"
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
  )
}

export default AppListLoading