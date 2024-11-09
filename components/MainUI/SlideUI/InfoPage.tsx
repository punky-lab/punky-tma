import React, { useState } from "react";
import { Tabs, Tab, WindowContent } from "react95";
import { Page, WindowWrapper, TabsContainer, ScrollContainer } from "./styles";
import { useNavHeight } from "@/components/Root/navHeightContext";
import Quests from "./components/Quests";
import Ranking from "./components/Ranking";
import Invite from "./components/Invite";

export default function InfoPage() {
  const { navHeight } = useNavHeight();
  const [currentTab, setCurrentTab] = useState<string>("quest");

  return (
    <Page $navHeight={navHeight}>
      <WindowWrapper>
        <WindowContent
          style={{
            height: 288,
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            paddingBottom: 20,
          }}
        >
          <TabsContainer>
            <Tabs value={currentTab} onChange={(value) => setCurrentTab(value)}>
              <Tab value="quest">Quest</Tab>
              <Tab value="ranking">Ranking</Tab>
              <Tab value="invite">Invite</Tab>
            </Tabs>
          </TabsContainer>
          <ScrollContainer>
            {currentTab === "quest" && <Quests />}
            {currentTab === "ranking" && <Ranking />}
            {currentTab === "invite" && <Invite />}
          </ScrollContainer>
        </WindowContent>
      </WindowWrapper>
    </Page>
  );
}
