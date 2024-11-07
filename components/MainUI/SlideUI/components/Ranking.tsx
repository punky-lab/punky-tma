import { Card, FlexBox } from "../styles";
import styled from "styled-components";

const RankItem = styled(Card)<{ $top3: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  background: ${props => props.$top3 ? '#c3c7cb' : 'white'};
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PlayerInfo = styled.div`
  flex: 1;
  margin: 0 12px;
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
          <span style={{ fontSize: '24px' }}>{player.avatar}</span>
          <PlayerInfo>
            <div style={{ fontWeight: 'bold' }}>{player.name}</div>
            <div style={{ color: '#424242' }}>Score: {player.score}</div>
          </PlayerInfo>
          <div>#{player.rank}</div>
        </RankItem>
      ))}
    </FlexBox>
  );
}