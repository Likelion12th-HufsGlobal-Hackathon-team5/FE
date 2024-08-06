import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import {BsFillPersonFill} from 'react-icons/bs';

const GameRankingDiv=styled.div`
    z-index: 10;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    position: absolute;
    bottom: 0;

    width: 100%;

    border-top: 3px solid black;
    .header{
        font-weight: 700;
    }

    background-color: white;
`;
const GameRankingInfoAboutMe=styled.div`
    display: flex;
    flex-direction: column;
    
    flex-wrap: wrap;
    gap: 2vh;

    width: 100%;
    padding: 2vh;

    border-radius: 15px;
    .score{
        margin: auto 0 auto auto;

        font-weight: 900;
        font-size: 24px;
    }

    &:hover{
        transition:all 0.2s;
        color: #217EEF;
        background-color: #C8E1FF;
        border-radius: 15px;
    }
`;
const GameRankingInfoAboutOpponent=styled.div`
    display: flex;
    flex-direction: column;
    
    flex-wrap: wrap;
    gap: 2vh;

    width: 100%;
    padding: 2vh;
    .user{
        margin: auto 0 auto auto;
    }
    .score{
        margin: auto auto 0 0;

        font-weight: 900;
        font-size: 24px;
    }

    &:hover{
        transition:all 0.2s;
        color: #217EEF;
        background-color: #C8E1FF;
        border-radius: 15px;
    }
`;
const GameRankingInfoHeader=styled.div`
    display: flex;
    flex-direction: row;
    font-size: 14px;

    .icon{
        width: 20px;
    }
`;

function GameRanking({receivedData}){
    const [pointOne, setPointOne]=useState(0);
    const [pointTwo, setPointTwo]=useState(0);
    const [playerOne, setPlayerOne]=useState('');
    const [playerTwo, setPlayerTwo]=useState('');

    useEffect(()=>{
        if (receivedData.type !== "player_points") return;
        setPointOne(receivedData.player_points[localStorage.getItem('userId')]?.point);
        for (const key in receivedData.player_points){
            if(key!==localStorage.getItem('userId')){
                setPointTwo(receivedData.player_points[key].point);
                break;
            }
        }
    },[receivedData]);


    useEffect(()=>{
        if (receivedData.type !== "start_check") return;
        setPlayerOne(receivedData.user_nicknames[localStorage.getItem('userId')]);
        for (const key in receivedData.user_nicknames){
            if(key!==localStorage.getItem('userId')){
                setPlayerTwo(receivedData.user_nicknames[key]);
                break;
            }
        }
    },[receivedData]);

    return(
        <>
            <GameRankingDiv>
                    <GameRankingInfoAboutMe>
                        <GameRankingInfoHeader>
                            <BsFillPersonFill className='icon'/>
                            {playerOne} (나)
                        </GameRankingInfoHeader>
                        <p className='score'>{pointOne}점</p>
                    </GameRankingInfoAboutMe>
                    <GameRankingInfoAboutOpponent>
                        <GameRankingInfoHeader className='user'>
                            <BsFillPersonFill className='icon'/>
                            {playerTwo} (상대)
                        </GameRankingInfoHeader>
                        <p className='score'>{pointTwo}점</p>
                    </GameRankingInfoAboutOpponent>
                </GameRankingDiv>
        </>
    )
}

export default GameRanking;