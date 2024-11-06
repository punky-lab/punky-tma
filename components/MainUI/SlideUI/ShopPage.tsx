import React, { useState } from "react";
import { Window, WindowHeader, WindowContent, Tabs, Tab } from "react95";
import ShopGrid from "./components/ShopGrid"

// 定义商品数据类型
interface ShopItem {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

// 模拟数据
const ITEMS_DATA: ShopItem[] = [
  { id: '1', name: 'Sword', image: '/sword.png', price: 100, description: 'A sharp sword' },
  // ... 更多道具数据
];

const TRAITS_DATA: ShopItem[] = [
  { id: '1', name: 'Speed', image: '/speed.png', price: 200, description: 'Increase speed' },
  // ... 更多特质数据
];

export default function ShopPage() {
    const [currentTab, setCurrentTab] = useState<string>("items");
    
    const renderTab = () => {
        const data = currentTab === "items" ? ITEMS_DATA : TRAITS_DATA;
        return <ShopGrid items={data} />;
    }

    return (
        <Window>
            <WindowHeader>Shop</WindowHeader>
            <WindowContent>
                <Tabs value={currentTab} onChange={(value) => setCurrentTab(value)}>
                    <Tab value="items">Items</Tab>
                    <Tab value="traits">Traits</Tab>
                </Tabs>
                {renderTab()}
            </WindowContent>
        </Window>
    );
}
