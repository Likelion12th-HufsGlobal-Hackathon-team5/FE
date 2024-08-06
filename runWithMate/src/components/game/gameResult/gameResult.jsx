import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ClipLoader from 'react-spinners/ClipLoader';

function GameResultBox() {
  const [gameData, setGameData] = useState(null);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [loserInfo, setLoserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedGameData = localStorage.getItem("game_result");
    if (storedGameData) {
      const gameData = JSON.parse(storedGameData);
      setGameData(gameData);

      const winner = gameData.users_info.find(info => info.user_id === gameData.winner_id);
      const loser = gameData.users_info.find(info => info.user_id !== gameData.winner_id);

      setWinnerInfo(winner || {});
      setLoserInfo(loser || {});
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <ClipLoader color={"#123abc"} loading={isLoading} size={50} />;
  }

  if (!gameData || !winnerInfo || !loserInfo) {
    return <div>게임 결과를 불러올 수 없습니다.</div>;
  }

  return (
    <ResultContainer>
      <UserPhoto />
      <Title>
        <UserName>{winnerInfo.user_name}님이</UserName>
        <WinLose>승리하셨습니다!</WinLose>
      </Title>
      <Point>
        <PointResultBox>
          <span>
            <p>{winnerInfo.user_name}님이</p>
            <p>획득한 point</p>
          </span>
          <p className="point">{winnerInfo.point + gameData.bet_point} point</p>
        </PointResultBox>
        <PointResultBox>
          <span>
            <p>{loserInfo.user_name}님이</p>
            <p>획득한 point</p>
          </span>
          <p className="point">{loserInfo.point} point</p>
        </PointResultBox>
      </Point>
    </ResultContainer>
  );
}

export default GameResultBox;

// 스타일 컴포넌트 정의
const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
`;

const UserPhoto = styled.div`
  margin: 3vh;
  padding: 13vh;
  border-radius: 100%;
  background-image: url("/img/Winner.png");
  background-size: cover;
  background-position: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1vh;
  align-items: center;
  justify-content: center;
`;

const UserName = styled.p`
  color: #2e2929;
  font-weight: 800;
  font-size: 28px;
`;

const WinLose = styled.p`
  color: #2e2929;
  font-weight: 800;
  font-size: 28px;
`;

const Point = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2vh;
  padding: 3vh 2vh;
`;

const PointResultBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10vh;
  width: 100%;

  p {
    font-size: 16px;
  }

  .point {
    font-size: 24px;
    font-weight: 800;
  }

  span {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1vh;
  }
`;