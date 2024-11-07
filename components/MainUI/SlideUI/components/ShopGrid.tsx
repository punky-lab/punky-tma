import React from "react";
import { Button } from "react95";
import { Grid, Card, FlexBox } from "../styles";
import Image from "next/image";

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

export default function ShopGrid({ items }: Props) {
  const handleBuy = (item: ShopItem) => {
    console.log(`Buying ${item.name}`);
  };

  return (
    <Grid>
      {items.map((item) => (
        <Card key={item.id}>
          <FlexBox direction="column">
            <Image 
              src={item.image} 
              alt={item.name} 
              width={100}
              height={100}
              style={{ objectFit: 'contain' }}
            />
            <h3 style={{ margin: '8px 0' }}>{item.name}</h3>
            <div style={{ color: '#008080', margin: '8px 0' }}>
              {item.price} coins
            </div>
            <p style={{ fontSize: '0.9em', margin: '8px 0' }}>
              {item.description}
            </p>
            <Button onClick={() => handleBuy(item)}>Buy</Button>
          </FlexBox>
        </Card>
      ))}
    </Grid>
  );
}
