import React, { useState } from "react";
import { Tabs, Tab, TabBody, WindowContent } from "react95";
import Quests from "./components/Quests";
import Ranking from "./components/Ranking";
import Invite from "./components/Invite";
import { Page, WindowWrapper, ContentWrapper } from "./styles";
import { useNavHeight } from "@/components/Root/navHeightContext";

export default function InfoPage() {
    const { navHeight } = useNavHeight();
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
        <Page $navHeight={navHeight}>
            <WindowWrapper>
                <WindowContent>
                    <Tabs value={currentTab} onChange={(value) => setCurrentTab(value)}>
                        <Tab value="quest">Quest</Tab>
                        <Tab value="ranking">Ranking</Tab>
                        <Tab value="invite">Invite</Tab>
                    </Tabs>
                    <ContentWrapper>
                        {renderTab()}
                    </ContentWrapper>
                </WindowContent>
            </WindowWrapper>
        </Page>
    )
}
