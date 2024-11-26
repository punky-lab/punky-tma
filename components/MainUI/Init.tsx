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
import { WalletTgSdk } from "@uxuycom/web3-tg-sdk";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import { Program, AnchorProvider, BN } from "@coral-xyz/anchor";
import IDL from "@/contract/idl.json";
import { Idl } from "@coral-xyz/anchor";

export type PageState = "chat" | "shop" | "info" | "user";

export default function Init({
  switchTo,
}: {
  switchTo: (target: UIState) => void;
}) {
  let SDk: WalletTgSdk | undefined;
  if (typeof window !== "undefined") {
    const { WalletTgSdk } = require("@uxuycom/web3-tg-sdk");
    SDk = new WalletTgSdk();
  }
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

  const autoLogin = async () => {
    // try {
    //   const response = await authApis.login({
    //     username: "wsnm@website.me",
    //     password: "password"
    //   });
    //   const { access_token, refresh_token } = response.data.data;
    //   localStorage.setItem('token', access_token);
    //   localStorage.setItem('refresh_token', refresh_token);
    // } catch (error) {
    //   console.error('自动登录失败:', error);
    // }
  };

  const fetchUserData = async () => {
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
  };

  useEffect(() => {
    const fetchData = async () => {
      await autoLogin();
      await fetchUserData();
    };
    fetchData();
  }, []);

  const getSolana = () => {
    return SDk?.solana;
  };
  const solanaProvider = getSolana();

  const PROGRAM_ID = new PublicKey(
    "6YmNaSBGPwjxnxAFQePz7Z4R9YUMEoaCJGE2JakDrY7D"
  );

  const getProgram = async () => {
    if (!solanaProvider) return null;

    const connection = new Connection("https://api.devnet.sonic.game");

    const wallet = {
      publicKey: new PublicKey(solanaProvider?.publicKey?.toString()),
      signTransaction: solanaProvider.signTransaction.bind(solanaProvider),
      signAllTransactions:
        solanaProvider.signAllTransactions.bind(solanaProvider),
    };

    const provider = new AnchorProvider(
      connection,
      wallet,
      AnchorProvider.defaultOptions()
    );

    return new Program(IDL as Idl, provider);
  };

  const feedPet = async () => {
    try {
      const program = await getProgram();
      if (!program) return;

      const gameAccountPDA = new PublicKey(gameAccount.address);

      await program.methods
        .feedPet()
        .accounts({
          gameAccount: gameAccountPDA,
        })
        .rpc();

      await fetchUserData();
    } catch (error) {
      console.error("Feed pet failed:", error);
    }
  };

  const getAccountData = async () => {
    try {
      const program = await getProgram();
      if (!program || !solanaProvider) return;
      const userPublicKey = new PublicKey(solanaProvider.publicKey?.toString());
      // 获取 PDA
      const [gameAccountPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("game_account"), userPublicKey.toBytes()],
        PROGRAM_ID
      );
      // 获取账户数据
      const accountData =
        await program.account.gameAccount.fetch(gameAccountPDA);
      return accountData;
    } catch (error) {
      console.error("Failed to fetch account data:", error);
      return null;
    }
  };

  const petPet = async () => {
    try {
      const program = await getProgram();
      if (!program || !solanaProvider) return;

      const userPublicKey = new PublicKey(solanaProvider.publicKey?.toString());
      const [gameAccountPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("game_account"), userPublicKey.toBytes()],
        PROGRAM_ID
      );

      await program.methods
        .petPet()
        .accounts({
          gameAccount: gameAccountPDA,
        })
        .rpc();

      const accountData = await getAccountData();
      console.log("accountData", accountData);
      setGameAccount(accountData);
    } catch (error) {
      console.error("Pet pet failed:", error);
    }
  };

  const initializeGameAccount = async () => {
    try {
      const program = await getProgram();
      if (!program || !solanaProvider) return;

      const userPublicKey = new PublicKey(solanaProvider.publicKey?.toString());

      const [gameAccountPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("game_account"), userPublicKey.toBytes()],
        PROGRAM_ID
      );

      await program.methods
        .initialize()
        .accounts({
          signer: userPublicKey,
          gameAccount: gameAccountPDA,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      const accountData = await getAccountData();
      setGameAccount(accountData);
    } catch (error) {
      console.error("Initialize failed:", error);
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
              solanaProvider={solanaProvider}
              initializeGameAccount={initializeGameAccount}
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
              <p>Notice :Your off-chain data may lose.</p>
              <menu className="dialog-menu mt-4">
                <button
                  className="nes-btn"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="nes-btn is-primary ml-10"
                  onClick={handleConfirm}
                >
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
