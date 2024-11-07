import React from "react";
import { Button, ProgressBar } from "react95";
import { Card, FlexBox } from "../styles";

const QuestContent = ({ label, description, progress, total, reward }: { 
  label: string, 
  description: string, 
  progress: number, 
  total: number, 
  reward: string 
}) => (
  <Card style={{ marginBottom: '16px' }}>
    <FlexBox direction="column" style={{ gap: '12px', alignItems: 'stretch' }}>
      <h4 style={{ margin: 0 }}>{label}</h4>
      <p style={{ margin: 0, color: '#424242' }}>{description}</p>
      <ProgressBar value={(progress / total) * 100} variant="tile" />
      <FlexBox style={{ justifyContent: 'space-between' }}>
        <span>Progress: {progress}/{total}</span>
        <Button disabled={progress < total}>
          Claim {reward}
        </Button>
      </FlexBox>
    </FlexBox>
  </Card>
);

export default function Quests() {
  return (
    <FlexBox direction="column" style={{ alignItems: 'stretch', padding: 0 }}>
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
    </FlexBox>
  );
}