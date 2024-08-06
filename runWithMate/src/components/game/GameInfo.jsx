import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import Giveup from '../../components/game/gameGiveUp/giveup';
import Timer from './Timer';


const Container=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const GameInfoDiv=styled.div`
    z-index: 10;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    position: absolute;
    top: 0;

    flex-wrap: wrap;
    gap: 2vh;

    padding: 2vh 3vh;

    width: 100%;

    border-bottom: 3px solid black;

    background-color: white;
`;
const GameInfoHeader=styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    width: 100%;

    font-weight: 900;
    font-size: 32px;

    /* background-color: blue; */
`;
const GameStopButton=styled.button`
    position: absolute;
    top: 2vh;
    right: 2vh;

    padding: 1vh 2vh;

    color: white;
    background-color: #E96D6D;
    border-radius: 10px;

    &:hover{
        transition: all 0.2s;
        background-color: #A43B3B;
        font-weight: 700;
    }

    &:active{
        transform: all 0.2s;
        color: #A43B3B;
        font-weight: 700;
        background-color: #E96D6D;
        border: 2.7px solid #A43B3B;
    }
`;
const GameInfoContents=styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    width: 100%;
    /* flex-wrap: wrap;
    gap: 2vh; */
`;
const GameInfoContentEach=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    
    font-size: 16px;
    font-weight: 700;
    line-height: 1.4;
`;
const Line=styled.div`
    background-color: #44a530;
    width: 3vh;
    height: 85%;
`;

// const WEBSOCKET_URL='ws server url'

function GameInfo({timeLimit, receivedData}){
    //이하 모달창의 상태관리
    const [isGiveupOpen, setIsGiveupOpen] = useState(false);
    const [betPoint, setBetPoint] = useState(0);
    const [myPoint, setMyPoint] = useState(0);

    useEffect(() => {
        if (receivedData.type !== "start_check") return;
        setBetPoint(receivedData.bet_point);
    }, [receivedData]);

    useEffect(() => {
        if (receivedData.type !== "player_points") return;
        setMyPoint(receivedData.player_points[localStorage.getItem('userId')]?.point);
    }, [receivedData]);
    
    const handleGiveup = () => {
        setIsGiveupOpen(!isGiveupOpen);
    };

    return(
        <>
            <Container>
                <GameInfoDiv>
                    <GameInfoHeader>
                        Game Info
                        <GameStopButton onClick={handleGiveup}>
                            기권
                        </GameStopButton>
                        {isGiveupOpen && 
                            <Giveup onClose={handleGiveup} />
                        }
                    </GameInfoHeader>
                    <GameInfoContents>  
                        <GameInfoContentEach>
                            남은 시간<br/>
                            <Timer timeLimit={timeLimit}/>
                        </GameInfoContentEach>
                        <Line />
                        <GameInfoContentEach>
                            베팅 포인트<br/>
                            {betPoint}P
                        </GameInfoContentEach>
                        <Line />
                        <GameInfoContentEach>
                            획득 포인트<br/>
                            {myPoint}P
                        </GameInfoContentEach>
                    </GameInfoContents>
                </GameInfoDiv>
            </Container>
        </>
    )
}

export default GameInfo;