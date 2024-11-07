import React from "react";
import { WindowHeader, WindowContent, Button } from "react95";
import Image from 'next/image';
import { Page, WindowWrapper, Card, Grid, FlexBox } from "./styles";
import styled from "styled-components";
import { useNavHeight } from "@/components/Root/navHeightContext";

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border: 2px solid #424242;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: 12px;
`;

export default function UserPage() {
  const { navHeight } = useNavHeight();
  return (
    <Page $navHeight={navHeight}>
      <WindowWrapper>
        <WindowContent>
          <FlexBox direction="column" style={{ gap: '16px' }}>
            <Card>
              <FlexBox>
                <Avatar>
                  <Image 
                    src="/default-avatar.png" 
                    alt="User Avatar"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Avatar>
                <div>
                  <h2 style={{ margin: '0 0 8px 0' }}>Username</h2>
                  <p style={{ margin: '0', color: '#424242' }}>ID: #123456</p>
                </div>
              </FlexBox>
            </Card>

            <Grid style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <StatCard>
                <p>Coins</p>
                <p>1,234</p>
              </StatCard>
              <StatCard>
                <p>Level</p>
                <p>7</p>
              </StatCard>
            </Grid>

            <Button style={{ width: '100%' }}>Connect Wallet</Button>
          </FlexBox>
        </WindowContent>
      </WindowWrapper>
    </Page>
  );
}
