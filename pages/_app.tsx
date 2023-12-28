import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WalletContext, WalletContextProvider } from "../contexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <WalletContextProvider>
        <Component {...pageProps} />
      </WalletContextProvider>
    </QueryClientProvider>
  );
}
