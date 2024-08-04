import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import useWebSocket from '../../hooks/useWebSocket';

import Giveup from '../../components/game/gameGiveUp/giveup';
import Timer from './Timer';
import axios from 'axios';

import useStomp  from '../../hooks/useStomp';
import GetMarker from './GetMarker';

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

function GameInfo({betPoint, timeLimit}){
    const { disconnect } = useStomp();
    
    const [isLoser, setIsLoser]=useState(false);
    // const [isGameOver, setIsGameOver] = useState(false); // 게임 오버 상태 추가
    
    // const { sendMessage } = useWebSocket(WEBSOCKET_URL);

    //이하 모달창의 상태관리
    const [isGiveupOpen, setIsGiveupOpen] = useState(false);
    
    const openGiveup = () => {
        setIsGiveupOpen(true);
    };

    const closeGiveup = () => {
        setIsGiveupOpen(false);
    };


    // const handleSurrender=async()=>{
    //     // true : 사용자가 기권했음
    //     setIsLoser(true);
    //     disconnect();

    //     // ws로 서버에 기권 사실을 알림 / {} 빈 바디
    //     sendMessage({type:`surrender`,user:userName});
    
    //     try{
    //         await axios.post(`/surrender/&{roomId}`,{})
    //     } catch (error) {
    //         console.error('Error message - during surrender : ', error);
    //     }

    //     // giveup 모달창을 닫기 위해 false로 설정
    //     setIsGiveupOpen(false);
    // };


    return(
        <>
            <Container>
                <GameInfoDiv>
                    <GameInfoHeader>
                        Game Info
                        <GameStopButton onClick={openGiveup}>
                            기권
                        </GameStopButton>
                        {isGiveupOpen && 
                            <Giveup 
                                onClose={closeGiveup} 
                                // onSurrender={handleSurrender}
                                />}
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
                            300P
                        </GameInfoContentEach>
                    </GameInfoContents>
                </GameInfoDiv>
            </Container>
        </>
    )
}

export default GameInfo;