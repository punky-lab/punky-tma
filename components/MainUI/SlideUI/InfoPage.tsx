import React, { useState } from "react";
import { Tabs, Tab, WindowContent } from "react95";
import { Page, WindowWrapper, TabsContainer, ScrollContainer } from "./styles";
import { useNavHeight } from "@/components/Root/navHeightContext";
import Quests from "./components/Quests";
import Ranking from "./components/Ranking";
import Invite from "./components/Invite";
import RANKING_AVATAR from "@/assets/ui/shop-avatar.png";
import OWN_AVATAR from "@/assets/ui/shop-own.png";

export default function InfoPage() {
  const { navHeight } = useNavHeight();
  // const [currentTab, setCurrentTab] = useState<string>("quest");

  // return (
  //   <Page $navHeight={navHeight}>
  //     <WindowWrapper>
  //       <WindowContent
  //         style={{
  //           height: 288,
  //           padding: "8px",
  //           display: "flex",
  //           flexDirection: "column",
  //           paddingBottom: 20,
  //         }}
  //       >
  //         <TabsContainer>
  //           <Tabs value={currentTab} onChange={(value) => setCurrentTab(value)}>
  //             <Tab value="quest">Quest</Tab>
  //             <Tab value="ranking">Ranking</Tab>
  //             <Tab value="invite">Invite</Tab>
  //           </Tabs>
  //         </TabsContainer>
  //         <ScrollContainer>
  //           {currentTab === "quest" && <Quests />}
  //           {currentTab === "ranking" && <Ranking />}
  //           {currentTab === "invite" && <Invite />}
  //         </ScrollContainer>
  //       </WindowContent>
  //     </WindowWrapper>
  //   </Page>
  // );
  const [currentTab, setCurrentTab] = useState<string>("quest");
  const rankingComponent = () => {
    return (
      <div className="w-full text-xs p-2 h-44 overflow-y-auto">
        {/* 顶部用户信息 */}
        <div className="bg-[#d9d9d9]/65 text-white p-3 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <img src={RANKING_AVATAR.src} alt="avatar" className="w-8 h-8" /> */}
            <span className="">username</span>
          </div>
          <span className="">DIAMOND #1</span>
          <span className="">122</span>
        </div>

        {/* 排行榜标题 */}
        <div className="bg-[#d9d9d9]/65 text-white p-3 mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <span className=" ">TOP 100 MINERS</span>
          </div>
          <span className=" ">DIAMOND</span>
        </div>

        {/* 排行榜列表 */}
        <div className=" overflow-hidden">
          {[
            { rank: 1, name: "Hi", points: "41624425" },
            { rank: 2, name: "Hi", points: "39879334" },
            { rank: 3, name: "Hi", points: "14549472" },
            { rank: 4, name: "FARIMAN", points: "6512786" },
            { rank: 5, name: "Noken46", points: "5580541" },
            { rank: 6, name: "hi", points: "5167224" },
          ].map((item, index) => (
            <div
              key={item.rank}
              className={`bg-[#d9d9d9]/65  text-white p-2 flex items-center justify-between ${
                index === 0 ? "border-t-0" : "border-t"
              }`}
            >
              <div className="flex items-center gap-3 ">
                <span className=" w-6 ">{item.rank}</span>
                {/* <img
                  src={RANKING_AVATAR.src}
                  alt="avatar"
                  className="w-6 h-6"
                /> */}
                <span className="">{item.name}</span>
              </div>
              <span className="">{item.points}</span>
            </div>
          ))}
        </div>

        {/* 分页器 */}
        <div className="flex justify-center gap-2 mt-4">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 rounded-full flex text-[#2D4F44] items-center justify-center
                ${
                  page === 1
                    ? "bg-[#D8E3DB] border border-[#2D4F44]"
                    : "bg-[#E7F0E9] opacity-50"
                }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    );
  };
  const questComponent = () => {
    return (
      <div className="w-full text-xs p-2 h-44 overflow-y-auto">
        {/* 每日签到部分 */}
        <div>
          <h2 className="text-center mb-3 text-white">DAILY CHECK IN</h2>
          <p className="text-center text-white mb-6  opacity-60">
            Get your daily points
          </p>

          <div className="space-y-4">
            {/* 每日签到卡片 */}
            <div className="bg-[#d9d9d9]/65 text-white p-5 flex items-center justify-between cursor-pointer hover:opacity-90">
              <div className="flex items-center gap-4">
                {/* <div className="w-10 h-10">
                  <img
                    src={OWN_AVATAR.src}
                    alt="soul"
                    className="w-full h-full"
                  />
                </div> */}
                <div>
                  <div className="">Daily Check in</div>
                  <div className="  opacity-60">
                    + 100P <span className="ml-2">✓ Claimed</span>
                  </div>
                </div>
              </div>
              <div className="text-2xl text-[#1B1B1B] opacity-60">›</div>
            </div>

            {/* Chat with Soul卡片 */}
            <div className="bg-[#d9d9d9]/65 text-white p-5 flex items-center justify-between cursor-pointer hover:opacity-90">
              <div className="flex items-center gap-4">
                {/* <div className="w-10 h-10">
                  <img
                    src={OWN_AVATAR.src}
                    alt="soul"
                    className="w-full h-full"
                  />
                </div> */}
                <div>
                  <div className=" ">Chat with Soul</div>
                  <div className="  opacity-60">
                    + 100P <span className="ml-2">Claimable</span>
                  </div>
                </div>
              </div>
              <div className="text-2xl text-[#1B1B1B] opacity-60">›</div>
            </div>

            {/* Tap your Soul卡片 */}
            <div className="bg-[#d9d9d9]/65 text-white p-5 flex items-center justify-between cursor-pointer hover:opacity-90">
              <div className="flex items-center gap-4">
                {/* <div className="w-10 h-10">
                  <img
                    src={OWN_AVATAR.src}
                    alt="soul"
                    className="w-full h-full"
                  />
                </div> */}
                <div>
                  <div className=" ">Tap your Soul</div>
                  <div className="  opacity-60">
                    + 100P <span className="ml-2">Claimable</span>
                  </div>
                </div>
              </div>
              <div className="text-2xl text-[#1B1B1B] opacity-60">›</div>
            </div>
          </div>
        </div>

        {/* 任务部分 */}
        <div>
          <h2 className="text-center m-3 text-white text-xl tracking-wide">
            MISSION
          </h2>
          <p className="text-center text-white mb-6  opacity-60">
            LEVEL-UP with your Soul
          </p>

          <div className="bg-[#d9d9d9]/65 text-white p-5 flex items-center justify-between cursor-pointer hover:opacity-90">
            <div className="flex items-center gap-4">
              {/* <div className="min-w-10 h-10 flex-grow ">
                <img
                  src={OWN_AVATAR.src}
                  alt="soul"
                  className="w-full h-full"
                />
              </div> */}
              <div>
                <div className="  ">Join Alterim AI Official Discord</div>
                <div className="  opacity-60">+ 1000P</div>
              </div>
            </div>
            <div className="text-2xl text-[#1B1B1B] opacity-60">›</div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Page $navHeight={navHeight}>
      <WindowWrapper>
        <WindowContent
          style={{
            height: 288,
            padding: "0px",
            display: "flex",
            flexDirection: "column",
            paddingBottom: 20,
            width: "100%",
          }}
        >
          <div className="grow flex flex-col ">
            <div className="grid grid-cols-2 w-full h-14 mb-1 ">
              <button
                className={`py-2 text-sm border-2 border-[#33E3FF] px-4 bg-gray-400 active:bg-gray-500 focus:outline-none ${
                  currentTab === "quest" ? "bg-gray-500" : ""
                }`}
                onClick={() => setCurrentTab("quest")}
              >
                Quests
              </button>
              <button
                className={`py-2 text-sm border-2 border-[#33E3FF] border-l-0 px-4 bg-gray-400 active:bg-gray-500 focus:outline-none ${
                  currentTab === "ranking" ? "bg-gray-500" : ""
                }`}
                onClick={() => setCurrentTab("ranking")}
              >
                Ranking
              </button>
            </div>

            <div className="flex flex-col border-2 border-[#33E3FF]  items-center bg-[#625669]/65 justify-center flex-1 ">
              {currentTab === "quest" && questComponent()}
              {currentTab === "ranking" && rankingComponent()}
            </div>
          </div>
        </WindowContent>
      </WindowWrapper>
    </Page>
  );
}
