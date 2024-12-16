const RPCs = {
  SonicOrigin: "https://api.devnet.sonic.game",
  SonicFrontierV1: "",
  SoonDevNet: "https://rpc.devnet.soo.network/rpc",
  SoonTestNet: "https://rpc.testnet.soo.network/rpc",
};

export function currentRPC() {
  return RPCs.SoonTestNet;
}
