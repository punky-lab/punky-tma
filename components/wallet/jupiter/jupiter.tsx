import {
  Adapter,
  UnifiedWalletButton,
  UnifiedWalletProvider,
} from "@jup-ag/wallet-adapter";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { NightlyWalletAdapter } from "@solana/wallet-adapter-nightly";
import { useMemo } from "react";

export const JupiterWalletConnect = () => {
  const wallets: Adapter[] = useMemo(() => {
    return [
      new NightlyWalletAdapter(),
      new SolflareWalletAdapter(),
    ].filter((item) => item && item.name && item.icon) as Adapter[];
  }, []);

  return (
    <UnifiedWalletProvider
      wallets={wallets}
      config={{
        autoConnect: false,
        env: "mainnet-beta",
        metadata: {
          name: "UnifiedWallet",
          description: "UnifiedWallet",
          url: "https://jup.ag",
          iconUrls: ["https://jup.ag/favicon.ico"],
        },
        notificationCallback: {
          onConnect: () => {
            console.log("onConnect");
          },
          onConnecting: () => {
            console.log("onConnecting");
          },
          onDisconnect: () => {
            console.log("onDisconnect");
          },
          onNotInstalled: () => {
            console.log("onNotInstalled");
          },
        },
        walletlistExplanation: {
          href: "https://station.jup.ag/docs/additional-topics/wallet-list",
        },
        theme: "jupiter",
        lang: "en",
      }}
    >
      <UnifiedWalletButton />
    </UnifiedWalletProvider>
  );
};
