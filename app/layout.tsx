"use client"
import "./styles/globals.css";
import "./styles/lib/markdown.css";
import "./styles/lib/highlight.css";
import loadFont from 'next/font/local'
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "@/app/components/ui/toaster";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import {Sepolia} from '@thirdweb-dev/chains'

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";

const localFont = loadFont({
  src: '../public/fonts/BaiJamjuree-Regular.ttf',
  variable: '--font-bai-jamjuree',
  display: 'optional'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <ThirdwebProvider
    supportedChains={[Sepolia]}
    activeChain={Sepolia}
    clientId="758c04f9bf0da56dc07ff4c7e6d18b83"
    supportedWallets={[
      metamaskWallet({ recommended: true }),
      coinbaseWallet(),
      walletConnect(),
      localWallet(),
      embeddedWallet({
        auth: {
          options: [
            "email",
            "google",
            "apple",
            "facebook",
          ],
        },
      }),
    ]}
  > 
    <html lang="en">
        <head>
          <link rel="manifest" href="/site.webmanifest"></link>
          <script src="/serviceWorkerRegister.js" defer></script>
        </head>
        <body className={`${localFont.className}`}>
          <div style={{ height: '80px' }}>
              <Header />
          </div>
          {children}
          <Analytics />
          <SpeedInsights />
          <Toaster />
          <Footer />
        </body>
    </html>
  </ThirdwebProvider>
   
  );
}
