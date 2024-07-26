import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import PointImg from "../../../assets/images/profile.png";

function GameResultBox() {
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    // 목 데이터 생성
    const mockGameData = {
      type: "game_finished",
      finish_type: "time_exceed",
      winner: "승자 ID",
      winner_name: "player1",
      loser_name: "player2",
      point_p1: 800,
      point_p2: 1000,
      dopamin_p1: 30,
      dopamin_p2: 25,
    };

    // 목 데이터를 상태에 즉시 설정
    setGameData(mockGameData);
  }, []);

  // gameData가 null인지 확인
  if (!gameData) {
    return null; // 또는 다른 대체 UI를 반환할 수 있습니다.
  }

  return (
    <ResultContainer>
      <UserPhoto />
      <Title>
        {gameData.point_p1 > gameData.point_p2 ? (
          <UserName>{gameData.winner_name}님이</UserName>
        ) : (
          <UserName>{gameData.loser_name}님이</UserName>
        )}
        <WinLose>승리하셨습니다!</WinLose>{" "}
      </Title>
      <Point>
        <PointResultBox>
          <span>
            <p>{gameData.winner_name}님의</p>
            <p>획득 point</p>
          </span>
          <p className="point">{gameData.point_p1} 점</p>
        </PointResultBox>
        <PointResultBox>
          <span>
            <p>{gameData.loser_name}님의</p>
            <p>획득 point</p>
          </span>
          <p className="point">{gameData.point_p2} 점</p>
        </PointResultBox>
      </Point>
      {gameData.point_p1 > gameData.point_p2 ? (
        <AllPoint>
          + {gameData.point_p1 + gameData.dopamin_p1 + gameData.dopamin_p2}point
        </AllPoint>
      ) : (
        <AllPoint>+ {gameData.point_p1}point</AllPoint>
      )}
    </ResultContainer>
  );
}

export default GameResultBox;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
`;

const UserPhoto = styled.div`
  margin: 3vh 3vh 1vh 3vh;
  padding: 10vh;
  border-radius: 100%;
  background-image: url(${PointImg});
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
  color: black;
  font-weight: 800;
  font-size: 28px;
`;

const WinLose = styled.p`
  color: black;
  font-weight: 800;
  font-size: 28px;
`;

const Point = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3vh;
  padding: 3vh 2vh;
  border-bottom: black solid 3px;
  margin-bottom: 2vh;
`;

const PointResultBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8vh;
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

const AllPoint = styled.div`
  font-size: 24px;
  font-weight: 700;
`;
