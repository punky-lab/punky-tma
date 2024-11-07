import React, { useState } from "react";
import { WindowHeader, WindowContent, Tabs, Tab } from "react95";
import ShopGrid from "./components/ShopGrid";
import { Page, WindowWrapper } from "./styles";
import { useNavHeight } from "@/components/Root/navHeightContext";

// 保持原有的 interface 和模拟数据
interface ShopItem {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

const ITEMS_DATA: ShopItem[] = [
  { id: '1', name: 'Sword', image: '/sword.png', price: 100, description: 'A sharp sword' },
];

const TRAITS_DATA: ShopItem[] = [
  { id: '1', name: 'Speed', image: '/speed.png', price: 200, description: 'Increase speed' },
];

export default function ShopPageComponent() {
  const { navHeight } = useNavHeight();
  const [currentTab, setCurrentTab] = useState<string>("items");
  
  return (
    <Page $navHeight={navHeight}>
      <WindowWrapper>
        <WindowContent>
          <Tabs value={currentTab} onChange={(value) => setCurrentTab(value)}>
            <Tab value="items">Items</Tab>
            <Tab value="traits">Traits</Tab>
          </Tabs>
          <ShopGrid items={currentTab === "items" ? ITEMS_DATA : TRAITS_DATA} />
        </WindowContent>
      </WindowWrapper>
    </Page>
  );
}
