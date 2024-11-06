import React from "react";
import { WindowHeader, WindowContent, Button, GroupBox, ProgressBar } from "react95";
import { Card, FlexBox } from "../styles";

const QuestCard = ({ label, description, progress, total, reward }: { label: string, description: string, progress: number, total: number, reward: string }) => (
  <GroupBox label={label}>
    <FlexBox direction="column" style={{ padding: '8px' }}>
      <p>{description}</p>
      <ProgressBar value={(progress / total) * 100} variant="tile" />
      <p>Progress: {progress}/{total}</p>
      <Button disabled={progress < total}>
        Claim Reward: {reward}
      </Button>
    </FlexBox>
  </GroupBox>
);

export default function Quests() {
  return (
    <FlexBox direction="column">
      <QuestCard
        label="Daily Challenge"
        description="Complete 3 battles today"
        progress={1}
        total={3}
        reward="100 coins"
      />
      <QuestCard
        label="Weekly Challenge"
        description="Win 10 battles this week"
        progress={4}
        total={10}
        reward="Rare Item Box"
      />
    </FlexBox>
  );
}