'use client'

import { Ethereum, Goerli, Binance, Arbitrum } from '@thirdweb-dev/chains'
import { ThirdwebProvider, safeWallet, metamaskWallet, walletConnect, coinbaseWallet } from '@thirdweb-dev/react'
import { Banner, TopHeader } from "../components";

export default function Home() {
  return (

    <ThirdwebProvider
    // clientId="758c04f9bf0da56dc07ff4c7e6d18b83"
    supportedChains={[Ethereum, Goerli, Binance, Arbitrum]}
    supportedWallets={[
      metamaskWallet(),
      walletConnect(),
      coinbaseWallet(),
      safeWallet({
        recommended: true,
        personalWallets: [metamaskWallet(), walletConnect(), coinbaseWallet()]
      })
    ]}
  >
    <div>
      <TopHeader />
      <Banner />
    </div>
  </ThirdwebProvider>
  );
}
