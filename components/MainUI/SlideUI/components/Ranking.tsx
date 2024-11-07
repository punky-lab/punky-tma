import { Card, FlexBox } from "../styles";
import styled from "styled-components";


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
        <Card key={player.rank}>
          <span style={{ fontSize: '24px' }}>{player.avatar}</span>
          <PlayerInfo>
            <div style={{ fontWeight: 'bold' }}>{player.name}</div>
            <div style={{ color: '#424242' }}>Score: {player.score}</div>
          </PlayerInfo>
          <div>#{player.rank}</div>
        </Card>
      ))}
    </FlexBox>
  );
}