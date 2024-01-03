'use client'
import Image from 'next/image'
import Link from 'next/link'

import { ConnectWallet, useConnectionStatus } from '@thirdweb-dev/react'

import logo from '../../public/logo.png'

const routeLinks = [
  { name: 'Market', url: '/' },
  { name: 'My Bot', url: '/myBot' },
  { name: 'Download', url: 'https://docs.x-fluid.com/developers/x-fluid-settler/automatic-settlement' }
]

const TopHeader = ({ className = '' }) => {
  const status = useConnectionStatus()
  const isConnected = status === 'connected'

  return (
    <div className={`flex items-center justify-between px-12 bg-gray-900 text-white ${className}`}>
      <Link href="/">
        <Image className="align-middle"
            priority
            alt="logo" 
            src={logo} 
            width={50}
            height={50}
        />
      </Link>
      <div  style={{ marginLeft: '-150px' }}>
        {routeLinks.map((link) => {
          return (
            <Link key={link.url} href={link.url} className="px-6 text-xl font-bold no-underline">
              {link.name}
            </Link>
          )
        })}
      </div>
      <div className="flex items-center space-x-8" style={{ height: '80px' }}>
        <ConnectWallet 
            className={`${isConnected ? 'border-none bg-black-main text-white' : 'p-2 text-white'}`}
            theme={"dark"}
            switchToActiveChain={true}
            modalSize={"compact"}
        />
      </div>
    </div>
  )
}

export default TopHeader



