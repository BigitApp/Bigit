import { FireIcon, PlayIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useBotStore } from "@/app/store/bot";
import { BotAvatarLarge } from "@/app/components/ui/emoji";

const AppListLoading = () => {
  const { t } = useTranslation('common')
  const botStore = useBotStore();
  const currentBot = botStore.currentBot();

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
                <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                  <FireIcon
                    className="h-5 w-5 text-green-700"
                    aria-hidden="true"
                  />
                  {t('Buy Now')}
                </div>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <div className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                  <Link href="/market/aiPage" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <PlayIcon
                      className="h-5 w-5 text-green-700 mr-2.5"
                      aria-hidden="true"
                    />
                    {t('Run')}
                  </Link>
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