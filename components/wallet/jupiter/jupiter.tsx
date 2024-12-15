import {
  Adapter,
  BaseSignerWalletAdapter,
  UnifiedWalletButton,
  UnifiedWalletProvider,
  WalletAdapterNetwork,
} from "@jup-ag/wallet-adapter";
import {
  SolflareWalletAdapter,
  TrustWalletAdapter,
  WalletConnectWalletAdapter,
  NightlyWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";
import {
  metadata,
  WalletAdapterWithMutableSupportedTransactionVersions,
} from "./something";

export const JupiterWalletConnect = () => {
  const wallets: Adapter[] = useMemo(() => {
    const walletConnectWalletAdapter: WalletAdapterWithMutableSupportedTransactionVersions<BaseSignerWalletAdapter> | null =
      (() => {
        const adapter: WalletAdapterWithMutableSupportedTransactionVersions<BaseSignerWalletAdapter> =
          new WalletConnectWalletAdapter({
            network: WalletAdapterNetwork.Mainnet,
            options: {
              relayUrl: "wss://relay.walletconnect.com",
              projectId: metadata.walletConnectProjectId,
              metadata: {
                name: metadata.name,
                description: metadata.description,
                url: metadata.url,
                icons: metadata.iconUrls,
              },
            },
          });

        // While sometimes supported, it mostly isn't. Should this be dynamic in the wallet-adapter instead?
        adapter.supportedTransactionVersions = new Set(["legacy"]);
        return adapter;
      })();

    return [
      new NightlyWalletAdapter(),
      new SolflareWalletAdapter(),
      new TrustWalletAdapter(),
      walletConnectWalletAdapter,
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
