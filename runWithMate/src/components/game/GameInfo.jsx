import { useState } from 'react';
import styled from '@emotion/styled';

import Giveup from '../../components/game/gameGiveUp/giveup';

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

function GameInfo(){
    //이하 모달창의 상태관리

    const [isGiveupOpen, setIsGiveupOpen] = useState(false);

    const openGiveup = () => {
        setIsGiveupOpen(true);
    };

    const closeGiveup = () => {
        setIsGiveupOpen(false);
    };
    return(
        <>
            <GameInfoDiv>
                    <GameInfoHeader>
                        Game Info
                        <GameStopButton onClick={openGiveup}>
                            기권
                        </GameStopButton>
                        {isGiveupOpen && <Giveup onClose={closeGiveup} />}
                    </GameInfoHeader>
                    <GameInfoContents>  
                        <GameInfoContentEach>
                            남은 시간<br/>
                            14:53
                        </GameInfoContentEach>
                        <Line />
                        <GameInfoContentEach>
                            획득 점수<br/>
                            2000점
                        </GameInfoContentEach>
                        <Line />
                        <GameInfoContentEach>
                            획득 포인트<br/>
                            300P
                        </GameInfoContentEach>
                    </GameInfoContents>
                </GameInfoDiv>
        </>
    )
}

export default GameInfo;