import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Giveup from '../../components/game/gameGiveUp/giveup';
import Map from '../../components/game/Map';
import GameOver from '../../components/game/GameOver/GameOver'; // GameOver 컴포넌트 경로

import { BsFillPersonFill } from 'react-icons/bs';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const GameInfo = styled.div`
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
`;

const GameInfoHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    font-weight: 900;
    font-size: 32px;
`;

const GameStopButton = styled.button`
    position: absolute;
    top: 2vh;
    right: 2vh;
    padding: 1vh 2vh;
    color: white;
    background-color: #E96D6D;
    border-radius: 10px;

    &:hover {
        transition: all 0.2s;
        background-color: #A43B3B;
        font-weight: 700;
    }

    &:active {
        transform: all 0.2s;
        color: #A43B3B;
        font-weight: 700;
        background-color: #E96D6D;
        border: 2.7px solid #A43B3B;
    }
`;

const GameInfoContents = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
`;

const GameInfoContentEach = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.4;
`;

const Line = styled.div`
    background-color: #44a530;
    width: 3vh;
    height: 85%;
`;

const GameRanking = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 3px solid black;
`;

const GameRankingInfoAboutMe = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 2vh;
    width: 100%;
    padding: 2vh;
    border-radius: 15px;

    .score {
        margin: auto 0 auto auto;
        font-weight: 900;
        font-size: 24px;
    }

    &:hover {
        transition: all 0.2s;
        color: #217EEF;
        background-color: #C8E1FF;
        border-radius: 15px;
    }
`;

const GameRankingInfoAboutOpponent = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 2vh;
    width: 100%;
    padding: 2vh;

    .user {
        margin: auto 0 auto auto;
    }

    .score {
        margin: auto auto 0 0;
        font-weight: 900;
        font-size: 24px;
    }

    &:hover {
        transition: all 0.2s;
        color: #217EEF;
        background-color: #C8E1FF;
        border-radius: 15px;
    }
`;

const GameRankingInfoHeader = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 14px;

    .icon {
        width: 20px;
    }
`;

function GameCopy() {
    const [isGiveupOpen, setIsGiveupOpen] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false); // 게임 오버 상태 추가

    const openGiveup = () => {
        setIsGiveupOpen(true);
    };

    const closeGiveup = () => {
        setIsGiveupOpen(false);
    };

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
                <GameInfo>
                    <GameInfoHeader>
                        Game Info
                        <GameStopButton onClick={openGiveup}>
                            기권
                        </GameStopButton>
                        {isGiveupOpen && <Giveup onClose={closeGiveup} />}
                    </GameInfoHeader>
                    <GameInfoContents>
                        <GameInfoContentEach>
                            남은 시간<br />
                            14:53
                        </GameInfoContentEach>
                        <Line />
                        <GameInfoContentEach>
                            획득 점수<br />
                            2000점
                        </GameInfoContentEach>
                        <Line />
                        <GameInfoContentEach>
                            획득 포인트<br />
                            300P
                        </GameInfoContentEach>
                    </GameInfoContents>
                </GameInfo>
                <Map />
                <GameRanking>
                    <GameRankingInfoAboutMe>
                        <GameRankingInfoHeader>
                            <BsFillPersonFill className='icon' />
                            이수혁(나)
                        </GameRankingInfoHeader>
                        <p className='score'>900점</p>
                    </GameRankingInfoAboutMe>
                    <GameRankingInfoAboutOpponent>
                        <GameRankingInfoHeader className='user'>
                            <BsFillPersonFill className='icon' />
                            유지희 (상대)
                        </GameRankingInfoHeader>
                        <p className='score'>1200점</p>
                    </GameRankingInfoAboutOpponent>
                </GameRanking>
            </Container>
        </>
    );
}

export default GameCopy;
