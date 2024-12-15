import { Connection, PublicKey } from "@solana/web3.js";
import IDL from "./idl/idl.json";
import { usePublicKey, useSolanaProvider } from "../provider";
import { AnchorProvider, Idl, Program, Wallet } from "@coral-xyz/anchor";
import { currentRPC } from "./rpc";

export const PROGRAM_ID = new PublicKey(
  "6YmNaSBGPwjxnxAFQePz7Z4R9YUMEoaCJGE2JakDrY7D"
);

export function useGameProgram(): { program: Program | undefined } {
  const { provider } = useSolanaProvider();
  const { publicKey } = usePublicKey();

  if (!provider || !publicKey) return { program: undefined };

  const wallet = {
    publicKey,
    signTransaction: provider.signTransaction.bind(provider),
    signAllTransactions: provider.signAllTransactions.bind(provider),
  };

  const connection = new Connection(currentRPC());

  const anchorProvider = new AnchorProvider(
    connection,
    wallet as any,
    AnchorProvider.defaultOptions()
  );

  const program = new Program(IDL as Idl, anchorProvider);

  return { program };
}

export function useGameAccountPDA() {
  const { publicKey } = usePublicKey();
  if (!publicKey) return { pda: undefined };

  const [gameAccountPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("game_account"), publicKey.toBytes()],
    PROGRAM_ID
  );

  return { pda: gameAccountPDA };
}
