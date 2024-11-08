import React, { useEffect, useState } from "react";
import { WindowContent } from "react95";
import Image from 'next/image';
import { Page, WindowWrapper, Avatar } from "./styles";
import { useNavHeight } from "@/components/Root/navHeightContext";

import { authApis } from "@/app/normalApi";

import { WalletTgSdk } from '@uxuycom/web3-tg-sdk';

import { ConnectButton } from "@ant-design/web3"
import type { Account } from '@ant-design/web3';
import { ConfigProvider } from 'antd';

export default function UserPage() {
  const { navHeight } = useNavHeight();// 获取导航栏高度
  const [userInfo, setUserInfo] = useState<any>(null); // 用户信息
  const [gameAccount, setGameAccount] = useState<any>(null); // 游戏账户信息
  let SDk: WalletTgSdk | undefined;
  if (typeof window !== 'undefined') {
    const { WalletTgSdk } = require('@uxuycom/web3-tg-sdk');
    SDk = new WalletTgSdk();
  }

  const getSolana = () => {
    return SDk?.solana;
  }

  const [address, setAddress] = useState<Account | undefined>(undefined);

  const solanaProvider = getSolana()

  // 处理钱包连接
  const handleConnect = async () => {
    const res = await solanaProvider?.connect({}, false);
    console.log(res)
    const walletAddress = solanaProvider?.publicKey?.toString();
    setAddress({ "address": walletAddress }); // 设置钱包地址
  };


  const fetchData = async () => {
    try {
      const [userResponse, gameResponse] = await Promise.all([
        authApis.getUserInfo(),
        authApis.getGameAccount()
      ]);

      if (userResponse.data.success) {
        setUserInfo(userResponse.data.data);
      }
      if (gameResponse.data.success) {
        setGameAccount(gameResponse.data.data);
      }
    } catch (error) {
      console.error('获取数据失败:', error);
    }
  };


  useEffect(() => {
    fetchData()
  }, []);

  return (
    <Page $navHeight={navHeight}>
      <WindowWrapper>
        <WindowContent style={{
          height: '33%',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
        }}>
          <div className="grow flex flex-col">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 -mb-2">
                <Avatar>
                  <Image
                    src="/default-avatar.png"
                    alt={`${userInfo?.name}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Avatar>
                <div>
                  <h2 className="mb-0">{userInfo?.name}</h2>
                  <p className="m-0 text-white text-sm">Email:{userInfo?.email}</p>
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

            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: '#212529',
                    algorithm: true,
                  },
                },
                token: {
                  colorPrimary: '#ffffff',
                  colorBgBase: '#212529',
                  colorTextBase: '#ffffff',
                  colorBorder: '#444444',
                },
              }}
            >
              <ConnectButton
                type="primary"
                account={address}
                onConnectClick={handleConnect}
                onDisconnectClick={() => {
                  setAddress(undefined);
                  solanaProvider?.disconnect()
                }}
              />
            </ConfigProvider>
          </div>
        </WindowContent>
      </WindowWrapper>
    </Page>
  );
}
