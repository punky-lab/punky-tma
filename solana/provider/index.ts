import { PublicKey } from "@solana/web3.js";
import { WalletTgSdk } from "@uxuycom/web3-tg-sdk";

export function useSolanaProvider() {
  let SDK: WalletTgSdk | undefined;
  if (typeof window !== "undefined") {
    const { WalletTgSdk } = require("@uxuycom/web3-tg-sdk");
    SDK = new WalletTgSdk();
  }

  return { provider: SDK?.solana };
}

export const usePublicKey = () => {
  const { provider } = useSolanaProvider();
  let publicKey: PublicKey | undefined;
  if (provider && provider.publicKey) {
    publicKey = new PublicKey(provider.publicKey.toString());
  }
  return { publicKey };
};
