import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import Map from '../../components/game/Map';
import GameInfo from '../../components/game/GameInfo';
import GameRanking from '../../components/game/GameRanking';

const Container=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    /* background-color: red; */
`;
const MapContainer=styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

function Game(){
    const navigate=useNavigate();
    // 기본값으로 3분 설정
    const [timeLimit,setTimeLimit]=useState(18);

    useEffect(()=>{
        const timer=setTimeout(()=>{
            navigate('/gameResult');
        },timeLimit*1000);
        // timeLimit을 milliseconds 로 설정

        return () => clearTimeout(timer); // clear the timer when the component is unmounted
  }, [timeLimit, history]);

    return(
        <>
            <Container>
                <GameInfo />
                <MapContainer>
                    <Map />
                </MapContainer>
                <GameRanking />
            </Container>
        </>
    )
}

export default Game;