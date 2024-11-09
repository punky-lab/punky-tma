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
    try {
      const response = await authApis.login({
        username: "wsnm@website.me",
        password: "password"
      });
      const { access_token, refresh_token } = response.data.data;
      localStorage.setItem('token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
    } catch (error) {
      console.error('自动登录失败:', error);
    }
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
    }
    fetchData();
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "chat":
        return <ChatPage loading={loading} setLoading={setLoading} />;
      case "shop":
        return <ShopPage />;
      case "info":
        return <InfoPage />;
      case "user":
        return <UserPage userInfo={userInfo} gameAccount={gameAccount} />;
      default:
        return null;
    }
  };

  const renderAction = () => {
    if (isActionOpen) {
      return <Action />;
    }

    if (!isActionOpen && !isSlideOpen) {
      return (
        <div className="flex flex-col items-center w-full mb-2">
          <div className="text-white text-sm shadow-lg">Try to interact with me</div>
          <div className="text-sm">👇</div>
        </div>
      )
    }

    return null;
  };

  return (
    <div className="flex flex-col w-full h-full relative">
      <PetInfo gameAccount={gameAccount} />
      <Dog onClick={closeSlide} loading={loading} />
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
  );
}
