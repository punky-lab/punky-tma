import { UIState } from "@/lib/UI";
import PetInfo from "./PetInfo/PetInfo";
import Action from "./Action/Action";
import NavBar from "./Navigator/NavBar";
import Dog from "./Dog/Dog";
import ChatPage from "./SlideUI/ChatPage";
import ShopPage from "./SlideUI/ShopPage";
import InfoPage from "./SlideUI/InfoPage";
import UserPage from "./SlideUI/UserPage";
import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { authApis } from "@/app/normalApi";
import { ConfigProvider } from "antd";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useGameAccountPDA, useGameProgram } from "@/solana/game";
import { useSolanaProvider, usePublicKey } from "@/solana/provider";
import { showTxErrorModal } from "@/utils/solana";
import TxError from "../SolanaPopups/TxError";
import InitializeGameAccount from "../SolanaPopups/Initialize";

export type PageState = "chat" | "shop" | "info" | "user";

export default function Init({
  switchTo,
}: {
  switchTo: (target: UIState) => void;
}) {
  const [currentPage, setCurrentPage] = useState<PageState>("chat");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [springs, api] = useSpring(() => ({
    from: {
      maxHeight: 0,
    },
  }));
  const [userInfo, setUserInfo] = useState<any>(null); // 用户信息
  const [gameAccount, setGameAccount] = useState<any>(null); // 游戏账户信息
  const [loading, setLoading] = useState(false); // 对话加载状态
  const [isPetting, setIsPetting] = useState(false); // 摸宠物状态
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [emojisContent, setEmojisContent] = useState<string>(""); //气泡表情内容
  const [walletConnected, setWalletConnected] = useState(false);

  const { program } = useGameProgram();
  const { publicKey } = usePublicKey();
  const { provider } = useSolanaProvider();

  useEffect(() => {
    console.log("publicKey changed", publicKey);
  }, [publicKey]);

  useEffect(() => {
    console.log("program changed", program);
  }, [program]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
    };
    fetchData();
  }, []);

  const handleConfirm = () => {
    setIsDialogOpen(false);
  };

  const toggleAction = () => {
    setIsActionOpen(!isActionOpen);
  };

  const closeSlide = () => {
    if (!isSlideOpen) return;
    setIsSlideOpen(false);
    api.start({
      from: {
        maxHeight: 288,
      },
      to: {
        maxHeight: 0,
      },
    });
  };

  const openSlide = () => {
    if (isSlideOpen) return;
    setIsSlideOpen(true);
    api.start({
      from: {
        maxHeight: 0,
      },
      to: {
        maxHeight: 288,
      },
    });
  };

  const changePage = (page: PageState) => {
    if (!isSlideOpen) {
      openSlide();
    }
    setCurrentPage(page);
  };

  const fetchUserData = async () => {
    if (!publicKey || !walletConnected) {
      try {
        const [userResponse, gameResponse] = await Promise.all([
          authApis.getUserInfo(),
          authApis.getGameAccount(),
        ]);

        if (userResponse.data.success) {
          setUserInfo(userResponse.data.data);
        }
        if (gameResponse.data.success) {
          setGameAccount(gameResponse.data.data);
        }
      } catch (error) {
        console.error("获取数据失败:", error);
      }
    } else {
      const { fitness, happiness, loyalty, balance } = await getAccountData();
      setGameAccount({
        fitness,
        happiness,
        loyalty,
        balance: balance.toNumber(),
      });
    }
  };

  const feedPet = async () => {
    try {
      const { pda } = useGameAccountPDA();

      if (!program || !publicKey || !pda) {
        showTxErrorModal("Connect to wallet in user tab first");
        return;
      }

      await program.methods
        .feedPet()
        .accounts({
          gameAccount: pda,
        })
        .rpc();

      await fetchUserData();
    } catch (error) {
      console.error("Feed pet failed:", error);
    }
  };

  const getAccountData = async () => {
    try {
      const { pda } = useGameAccountPDA();
      // fetch account data
      // @ts-ignore
      const accountData = await program?.account.gameAccount.fetch(pda);

      console.log("accountData", accountData);
      return accountData;
    } catch (error) {
      console.error("Failed to fetch account data:", error);
      return null;
    }
  };

  const petPet = async () => {
    try {
      const { pda } = useGameAccountPDA();

      if (!program || !publicKey || !pda) {
        showTxErrorModal("Connect to wallet in user tab first");
        return;
      }

      await program.methods
        .petPet()
        .accounts({
          gameAccount: pda,
        })
        .rpc();

      await fetchUserData();
    } catch (error) {
      showTxErrorModal((error as any).transactionMessage);
      console.error("Pet pet failed:", error);
    }
  };

  const initializeGameAccount = async () => {
    try {
      const { pda } = useGameAccountPDA();

      if (!program || !publicKey || !pda) {
        showTxErrorModal("Connect to wallet in user tab first");
        return;
      }

      await program.methods
        .initialize()
        .accounts({
          signer: publicKey,
          gameAccount: pda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
    } catch (error) {
      console.error("Initialize failed:", error);
      // if the error message contains custom error 0x0, it means the account is already initialized
      if (
        (error as any).transactionMessage.includes("custom program error: 0x0")
      ) {
        showTxErrorModal("Account already initialized");
      } else {
        showTxErrorModal((error as any).transactionMessage);
      }
    }

    try {
      await fetchUserData();
    } catch (error) {
      console.error("Failed to fetch account data:", error);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "chat":
        return (
          <ChatPage
            loading={loading}
            setLoading={setLoading}
            fetchUserData={fetchUserData}
            setEmojisContent={setEmojisContent}
          />
        );
      case "shop":
        return <ShopPage />;
      case "info":
        return <InfoPage />;
      case "user":
        return (
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: "#212529",
                  algorithm: true,
                },
              },
              token: {
                colorPrimary: "#ffffff",
                colorBgBase: "#212529",
                colorTextBase: "#ffffff",
                colorBorder: "#444444",
              },
            }}
          >
            <UserPage
              userInfo={userInfo}
              gameAccount={gameAccount}
              solanaProvider={provider}
              onWalletConnect={() => {
                setWalletConnected(true);
              }}
              onWalletDisconnect={() => {
                setWalletConnected(false);
              }}
            />
          </ConfigProvider>
        );
      default:
        return null;
    }
  };

  const renderAction = () => {
    if (isActionOpen) {
      return (
        <Action
          fetchUserData={fetchUserData}
          setIsPetting={setIsPetting}
          petPet={petPet}
        />
      );
    }

    /*
    if (!isActionOpen && !isSlideOpen) {
      return (
        <div className="flex flex-col items-center w-full mb-6">
          <div className="text-white text-sm shadow-lg">Interact with me</div>
          <div className="text-sm">👇</div>
        </div>
      )
    }
    */

    return null;
  };

  return (
    <>
      <TxError />
      <InitializeGameAccount onConfirm={initializeGameAccount} />
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          <dialog
            className="nes-dialog relative z-50"
            id="dialog-default"
            open={isDialogOpen}
          >
            <form method="dialog">
              <p className="title">Tips</p>
              <p>This is an alpha test version of the app.</p>
              <menu className="dialog-menu mt-4 flex justify-end">
                <button className="nes-btn is-primary" onClick={handleConfirm}>
                  Confirm
                </button>
              </menu>
            </form>
          </dialog>
        </div>
      )}
      <div className="flex flex-col w-full h-full relative">
        <PetInfo gameAccount={gameAccount} />
        <Dog
          onClick={closeSlide}
          loading={loading}
          isPetting={isPetting}
          emojisContent={emojisContent}
        />
        {renderAction()}
        <NavBar
          onPageChange={changePage}
          toggleAction={toggleAction}
          openSlide={openSlide}
          closeSlide={closeSlide}
        />
        <animated.div
          style={{
            overflow: "hidden",
            ...springs,
          }}
        >
          {renderPage()}
        </animated.div>
      </div>
    </>
  );
}
