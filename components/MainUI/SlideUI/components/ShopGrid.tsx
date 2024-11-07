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
    <Grid style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        padding: '16px'
    }}>
      {items.map((item) => (
        <Card key={item.id}>
          <FlexBox direction="column" style={{ alignItems: 'center' }}>
            <Image 
              src={item.image} 
              alt={item.name} 
              width={80}
              height={80}
              style={{ objectFit: 'contain' }}
            />
            <h3 style={{ margin: '8px 0', textAlign: 'center' }}>{item.name}</h3>
            <div style={{ color: '#008080', margin: '8px 0' }}>
              {item.price} coins
            </div>
            <p style={{ 
              fontSize: '0.9em', 
              margin: '8px 0', 
              textAlign: 'center' 
            }}>
              {item.description}
            </p>
            <Button onClick={() => handleBuy(item)}>Buy</Button>
          </FlexBox>
        </Card>
      ))}
    </Grid>
  );
}
