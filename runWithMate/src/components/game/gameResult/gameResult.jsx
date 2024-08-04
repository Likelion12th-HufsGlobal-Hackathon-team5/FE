import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import PointImg from "/img/profile.png";
import ClipLoader from 'react-spinners/ClipLoader';

const mockData = {
  type: "game_finished",
  finish_type: "time_exceed",
  winner: "user1",
  game_info: {
    bet_point: 30,
    users_info: [
      {
        user_id: "user1",
        user_name: "홍길동",
        point: 20,
        dopamine: 15,
      },
      {
        user_id: "user2",
        user_name: "김철수",
        point: 10,
        dopamine: 5,
      },
    ],
  },
};

function GameResultBox() {
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [loserInfo, setLoserInfo] = useState(null);
  const [betPoint, setBetPoint] = useState(0);

  useEffect(() => {
    // 목데이터를 로컬 스토리지에 저장
    localStorage.setItem("gameData", JSON.stringify(mockData));

    // 로컬 스토리지에서 게임 데이터 불러오기
    const storedGameData = localStorage.getItem("gameData");
    if (storedGameData) {
      const gameData = JSON.parse(storedGameData);
      const winner = gameData.winner;
      const usersInfo = gameData.game_info.users_info;

      // 승자 정보와 패자 정보 구조화
      const winnerData = usersInfo.find(user => user.user_id === winner);
      const loserData = usersInfo.find(user => user.user_id !== winner);

      setWinnerInfo(winnerData);
      setLoserInfo(loserData);
      setBetPoint(gameData.game_info.bet_point); // 베팅 포인트 설정
    }
  }, []);

  // 승자와 패자 정보가 없을 경우 로딩 메시지를 보여줌
  if (!winnerInfo || !loserInfo) {
    return <div>게임결과를 불러오고 있습니다.</div>;
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
          <p className="point">{winnerInfo.point + betPoint} point</p> {/* 베팅 포인트를 승자 포인트에 합산 */}
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