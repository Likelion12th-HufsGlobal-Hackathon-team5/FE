import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Map from "../../components/game/Map";
import GameInfo from "../../components/game/GameInfo";
import GameOver from "../../components/game/GameOver/GameOver";
import GameRanking from "../../components/game/GameRanking";
import mockStartCheck from "../../server/inGame/mockStartCheck";
import useWsInstance from "../../hooks/useWsInstance";
import showError from "../../components/game/map/showError";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

function Game() {
  const [receivedData, setReceivedData] = useState(mockStartCheck);
  const [isGameOver, setIsGameOver] = useState(false);
  const [betPoint, setBetPoint] = useState(0);
  const { wsInstance, connected, disconnect } = useWsInstance(setReceivedData);

  useEffect(() => {
    if (!connected) return;
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      wsInstance("start_check", { lat: latitude, lng: longitude });
    }, showError, { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 });
  }, [connected]);

  return (
    <>
      <Container>
        {isGameOver && <GameOver />}
        <GameInfo 
        // TODO : 백엔드에서 bet_point받아오기
          betPoint={betPoint}
          timeLimit={receivedData.time_left}
        />
        <MapContainer>
          <Map 
            wsInstance={wsInstance}
            receivedData={receivedData}
            handleBetPoint={setBetPoint}
            />
        </MapContainer>
        <GameRanking />
      </Container>
    </>
  );
}

export default Game;
