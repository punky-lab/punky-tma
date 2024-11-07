import React from "react";
import { Button, GroupBox, ProgressBar } from "react95";
import { Card, FlexBox, ContentWrapper } from "../styles";
import styled from "styled-components";

const QuestCard = styled(Card)`
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const QuestContent = ({ label, description, progress, total, reward }: { 
  label: string, 
  description: string, 
  progress: number, 
  total: number, 
  reward: string 
}) => (
  <QuestCard>
    <FlexBox direction="column" style={{ gap: '12px' }}>
      <h4 style={{ margin: 0 }}>{label}</h4>
      <p style={{ margin: 0, color: '#424242' }}>{description}</p>
      <ProgressBar value={(progress / total) * 100} variant="tile" />
      <FlexBox style={{ justifyContent: 'space-between', width: '100%' }}>
        <span>Progress: {progress}/{total}</span>
        <Button disabled={progress < total}>
          Claim {reward}
        </Button>
      </FlexBox>
    </FlexBox>
  </QuestCard>
);

export default function Quests() {
  return (
    <ContentWrapper>
      <QuestContent
        label="Daily Challenge"
        description="Complete 3 battles today"
        progress={1}
        total={3}
        reward="100 coins"
      />
      <QuestContent
        label="Weekly Challenge"
        description="Win 10 battles this week"
        progress={4}
        total={10}
        reward="Rare Item Box"
      />
    </ContentWrapper>
  );
}