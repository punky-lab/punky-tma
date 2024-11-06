import { WindowHeader, WindowContent } from "react95";
import { Card, FlexBox } from "../styles";
import styled from "styled-components";

const RankItem = styled(Card)<{ $top3: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px;
  background: ${props => props.$top3 ? '#c3c7cb' : 'transparent'};
`;

export default function Ranking() {
  const players = [
    { rank: 1, name: "Player One", score: 1500, avatar: "🥇" },
    { rank: 2, name: "Player Two", score: 1200, avatar: "🥈" },
    { rank: 3, name: "Player Three", score: 1000, avatar: "🥉" },
  ];

  return (
    <FlexBox direction="column">
      {players.map(player => (
        <RankItem key={player.rank} $top3={player.rank <= 3}>
          <span>{player.avatar}</span>
          <div style={{ flex: 1 }}>
            <div>{player.name}</div>
            <div>Score: {player.score}</div>
          </div>
          <div>#{player.rank}</div>
        </RankItem>
      ))}
    </FlexBox>
  );
}