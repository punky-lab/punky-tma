import React from "react";
import styled from "styled-components";
import { Button } from "react95";
import { Page } from "../styles";

interface ShopItem {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

interface Props {
  items: ShopItem[];
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
`;

const ItemCard = styled.div`
  border: 2px solid #424242;
  padding: 8px;
  text-align: center;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const ItemName = styled.h3`
  margin: 8px 0;
`;

const ItemPrice = styled.div`
  color: #008080;
  margin: 8px 0;
`;

const ItemDescription = styled.p`
  font-size: 0.9em;
  margin: 8px 0;
`;

export default function ShopGrid({ items }: Props) {
  const handleBuy = (item: ShopItem) => {
    // 处理购买逻辑
    console.log(`Buying ${item.name}`);
  };

  return (
    <Grid>
      {items.map((item) => (
        <ItemCard key={item.id}>
          <ItemImage src={item.image} alt={item.name} />
          <ItemName>{item.name}</ItemName>
          <ItemPrice>{item.price} coins</ItemPrice>
          <ItemDescription>{item.description}</ItemDescription>
          <Button onClick={() => handleBuy(item)}>Buy</Button>
        </ItemCard>
      ))}
    </Grid>
  );
}
