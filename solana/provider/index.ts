import { WalletTgSdk } from "@uxuycom/web3-tg-sdk";

export function useSolanaProvider() {
  let SDK: WalletTgSdk | undefined;
  if (typeof window !== "undefined") {
    const { WalletTgSdk } = require("@uxuycom/web3-tg-sdk");
    SDK = new WalletTgSdk();
  }

  return { provider: SDK?.solana };
}
