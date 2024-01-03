"use client"
import "./styles/globals.css";
import "./styles/lib/markdown.css";
import "./styles/lib/highlight.css";

import Locale from "./locales";
import { Header } from "./components/Header";
import { type Metadata } from "next";
import { Toaster } from "@/app/components/ui/toaster";
import { ThemeProvider } from "@/app/components/layout/theme-provider";
import { Ethereum, Goerli, Binance, Arbitrum } from '@thirdweb-dev/chains'
import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";

// export const metadata: Metadata = {
//   title: Locale.Welcome.Title,
//   description: Locale.Welcome.SubTitle,
//   viewport: {
//     width: "device-width",
//     initialScale: 1,
//     maximumScale: 1,
//   },
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
//   appleWebApp: {
//     title: Locale.Welcome.Title,
//     statusBarStyle: "default",
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <ThirdwebProvider
    activeChain="goerli"
    clientId="758c04f9bf0da56dc07ff4c7e6d18b83"
    supportedWallets={[
      metamaskWallet(),
      coinbaseWallet({ recommended: true }),
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
        <body>
          <div style={{ height: '100px' }}>
              <Header />
          </div>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
  </ThirdwebProvider>
   
  );
}
