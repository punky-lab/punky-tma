import React, { useState } from "react";
import styled from "styled-components";
import { Window, WindowHeader, WindowContent, Tabs, Tab, TabBody } from "react95";
import Quests from "./components/Quests";
import Ranking from "./components/Ranking";
import Invite from "./components/Invite";
import { Page, WindowWrapper } from "./styles";

export default function InfoPage() {
    const [currentTab, setCurrentTab] = useState<string>("quest");
    const renderTab = () => {
        switch (currentTab) {
            case "quest": return <Quests />;
            case "ranking": return <Ranking />;
            case "invite": return <Invite />;
            default: return <Quests />;
        }
    }
  return (
    <Page>
        <WindowWrapper>
            <Tabs value={currentTab} onChange={(value) => setCurrentTab(value)}>
                <Tab value="quest">Quest</Tab>
                <Tab value="ranking">Ranking</Tab>
                <Tab value="invite">Invite</Tab>
            </Tabs>
            <TabBody>
                {renderTab()}
            </TabBody>
        </WindowWrapper>
    </Page>
  )
}
