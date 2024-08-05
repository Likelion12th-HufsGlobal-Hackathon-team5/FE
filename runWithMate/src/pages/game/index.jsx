import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import GameOver from "../../components/game/GameOver/GameOver";
import Map from "../../components/game/Map";
import GameInfo from "../../components/game/GameInfo";
import GameRanking from "../../components/game/GameRanking";
import GetMarker from "../../components/game/GetMarker";
import mockStartCheck from "../../server/inGame/mockStartCheck";
import useWsInstance from "../../hooks/useWsInstance";

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

  const { wsInstance, connected, disconnect } = useWsInstance(setReceivedData);

  useEffect(() => {
  }, [receivedData]);

  return (
    <>
      <Container>
        {isGameOver && <GameOver />}
        <GameInfo 
        // TODO : 백엔드에서 bet_point받아오기
          betPoint={1000}
          timeLimit={receivedData.time_left}
        />
        <GetMarker markerType='dopamine'/>
        <MapContainer>
          <Map
            />
        </MapContainer>
        <GameRanking />
      </Container>
    </>
  );
}

export default Game;
