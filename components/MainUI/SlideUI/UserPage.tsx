import React, { useEffect, useState } from "react";
import { WindowContent } from "react95";
import Image from "next/image";
import { Page, WindowWrapper, Avatar } from "./styles";
import { useNavHeight } from "@/components/Root/navHeightContext";

import { ConnectButton } from "@ant-design/web3";
import type { Account } from "@ant-design/web3";

export default function UserPage({
  userInfo,
  gameAccount,
  solanaProvider,
  initializeGameAccount,
}: {
  userInfo: any;
  gameAccount: any;
  solanaProvider: any;
  initializeGameAccount: () => void;
}) {
  const { navHeight } = useNavHeight(); // 获取导航栏高度

  const [address, setAddress] = useState<Account | undefined>(undefined);

  // 处理钱包连接
  const handleConnect = async () => {
    const res = await solanaProvider?.connect({}, false);
    const walletAddress = solanaProvider?.publicKey?.toString();
    setAddress({ address: walletAddress }); // 设置钱包地址
    initializeGameAccount();
  };

  return (
    <Page $navHeight={navHeight}>
      <WindowWrapper>
        <WindowContent
          style={{
            height: 288,
            display: "flex",
            flexDirection: "column",
            padding: 0,
            paddingBottom: 20,
          }}
        >
          <div className="grow flex flex-col">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {/*<Avatar>
                  <Image
                    src="/default-avatar.png"
                    alt={`${userInfo?.name}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Avatar>*/}
                <div className="p-4">
                  <p className="mb-2">{userInfo?.name}</p>
                  <p className="m-0 text-white text-sm">
                    @{userInfo?.telegram_username}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center -mb-2">
              <div className="nes-container is-dark with-title w-[43%] h-[75%]">
                <p className="title">Coins</p>
                <div className="flex flex-col items-center">
                  <i className="nes-icon coin"></i>
                  <p>{gameAccount?.coins}</p>
                </div>
              </div>
              <div className="nes-container is-dark with-title w-[43%] h-[75%]">
                <p className="title">Level</p>
                <div className="flex flex-col items-center">
                  <i className="nes-icon star"></i>
                  <p>1</p>
                </div>
              </div>
            </div>
            {/* <a className="nes-btn" href="#">Connect Wallet</a> */}

            <ConnectButton
              type="primary"
              account={address}
              onConnectClick={handleConnect}
              onDisconnectClick={() => {
                setAddress(undefined);
                solanaProvider?.disconnect();
              }}
            />
          </div>
        </WindowContent>
      </WindowWrapper>
    </Page>
  );
}
