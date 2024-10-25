import { useState } from 'react';
import { WalletTgSdk } from '@uxuycom/web3-tg-sdk';
import { Button } from '@telegram-apps/telegram-ui'; // TelegramUI组件
import PopUp from './PopUp'; // 假设PopUp是自定义的弹窗组件
import { ConnectButton } from "@ant-design/web3"
import type { Account } from '@ant-design/web3';
import { ConfigProvider } from 'antd';


interface WalletProps {
    onClose: () => void;
}

export default function Wallet({
    onClose,
}: WalletProps) {
    const { solana } = new WalletTgSdk({
        injected: true,
        metaData: {
            hostname: 'your-app.com',
            name: 'Your DApp Name',
            icon: 'https://example.com/icon.png',
        },
    });

    const [address, setAddress] = useState<Account | undefined>(undefined);

    const solanaProvider = solana

    // 处理钱包连接
    const handleConnect = async () => {
        await solanaProvider.connect({}, false);
        const walletAddress = solanaProvider.publicKey?.toString();
        setAddress({ "address": walletAddress }); // 设置钱包地址
    };

    return (
        <PopUp onClose={onClose}>
            <div className="flex justify-center items-center">
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#8442ff', // 主要颜色
                            colorBgBase: '#000000',  // 背景颜色设置为黑色
                            colorTextBase: '#ffffff', // 文字颜色设置为白色
                            colorBorder: '#444444',  // 边框颜色设置为灰色
                        },
                    }}
                >
                    <ConnectButton
                        type="primary"
                        account={address}
                        onConnectClick={handleConnect}
                        onDisconnectClick={() => {
                            setAddress(undefined);
                            solanaProvider.disconnect()
                        }}
                    />
                </ConfigProvider>
            </div>
        </PopUp>
    );
}
