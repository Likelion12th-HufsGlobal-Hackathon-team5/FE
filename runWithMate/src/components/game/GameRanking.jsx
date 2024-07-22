import styled from '@emotion/styled';
import {BsFillPersonFill} from 'react-icons/bs';

const GameRankingDiv=styled.div`
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

function GameRanking(){

    return(
        <>
            <GameRankingDiv>
                    <GameRankingInfoAboutMe>
                        <GameRankingInfoHeader>
                            <BsFillPersonFill className='icon'/>
                            이수혁(나)
                        </GameRankingInfoHeader>
                        <p className='score'>900점</p>
                    </GameRankingInfoAboutMe>
                    <GameRankingInfoAboutOpponent>
                        <GameRankingInfoHeader className='user'>
                            <BsFillPersonFill className='icon'/>
                            유지희 (상대)
                        </GameRankingInfoHeader>
                        <p className='score'>1200점</p>
                    </GameRankingInfoAboutOpponent>
                </GameRankingDiv>
        </>
    )
};

export default GameRanking;