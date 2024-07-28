import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import GameOver from "../../components/game/GameOver/GameOver";
import Map from "../../components/game/Map";
import GameInfo from "../../components/game/GameInfo";
import GameRanking from "../../components/game/GameRanking";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* background-color: red; */
`;
const MapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

function Game() {
  const navigate = useNavigate();
  // 기본값으로 3분 설정
  const [timeLimit, setTimeLimit] = useState(18);
  const [isGameOver, setIsGameOver] = useState(false); // 게임 오버 상태 추가

  useEffect(() => {
    const timer = setTimeout(() => {
        setIsGameOver(true); // 게임 오버 상태 변경
        setTimeout(()=>{
            navigate("/gameResult");
        }, 2000);
    }, timeLimit * 1000);
    
    // timeLimit을 milliseconds 로 설정

    return () => clearTimeout(timer); // clear the timer when the component is unmounted
  }, [timeLimit, history]);

      // 3초 후에 게임 오버 상태 변경
      useEffect(() => {
        const timer = setTimeout(() => {
            setIsGameOver(true); // 게임 오버 상태 변경
        }, 1000);

        // 컴포넌트 언마운트 시 타이머 정리
        return () => clearTimeout(timer);
    }, []);

  return (
    <>
      <Container>
        {isGameOver && <GameOver />} {/* GameOver 컴포넌트 추가 */}
        <GameInfo />
        <MapContainer>
          <Map />
        </MapContainer>
        <GameRanking />
      </Container>
    </>
  );
}

export default Game;
