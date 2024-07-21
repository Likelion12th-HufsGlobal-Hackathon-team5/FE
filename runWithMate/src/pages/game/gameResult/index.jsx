import {Link} from 'react-router-dom';
import styled from '@emotion/styled';
import Header from '../../../components/Header';

import {BiHome} from 'react-icons/bi';
import {BsArrowCounterclockwise} from 'react-icons/bs';
const Container=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    flex-wrap: wrap;
    gap: 3vh;

    box-sizing: border-box;
    .text{
        text-align: center;
        color: #AEAEB2;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.4;
    }
`;
const UserPhoto=styled.div`
    margin: 4.5vh auto;

    width: 17.5vh;
    height: 17.5vh;
    border-radius: 100%;
    background-color: red;
`;
const UserName=styled.p`
    color: black;
    font-weight: 800;
    font-size: 28px;
`;
const Point=styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;

    flex-wrap: wrap;
    gap:3vh;

    width: 70%;
    padding: 3vh;
    border-bottom: black solid 3px;

    /* font-size: 16px; */
`;
const MyPoint=styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    /* width: 80%; */
    width: 100%;
    
    /* color: blue; */
    /* background-color: black; */
    p{
        font-size: 16px;

    }
    .point{
        font-size: 16px;
        font-weight: 800;
    }
`;
const OpponentPoint=styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    /* width: 80%; */
    width: 100%;
    /* font-size: 16px; */

    p{
        font-size: 16px;
    }


    .point{
        font-size: 16px;
        font-weight: 800;
    }
`;
const AllPoint=styled.div`
    font-size:24px;
    font-weight:700;
`;
const StyledLink=styled(Link)`
    display: flex;
    justify-content: center;
    width: 100%;

    text-decoration: none;
`;
const GotoMain=styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;

    flex-wrap: wrap;
    gap: 5vh;

    width: 80%;

    padding: 3.5% 4%;
    color: white;
    background-color: #217EEF;

    border: none;
    border-radius: 5px;

    font-size: 14px;
    font-weight: 700;

    &:hover,:active{
        transition: all 0.2s;
        background-color: #1B63BB;
    }
    .homeIcon{
        margin: 0;
        width: 26px;
        height: 26px;
    }
`;
const AgainGame=styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;

    flex-wrap: wrap;
    gap: 5vh;

    width: 80%;

    box-sizing: border-box;

    padding: 3.5% 4%;
    color: white;
    background-color: #2E2929;

    border: none;
    border-radius: 5px;
 
    font-size: 14px;
    font-weight: 700;

    &:hover,:active{
        transition: all 0.2s;
        background-color: #414B57;
        /* background-color: black; */
        
        box-sizing: border-box;
        /* border-color:#232E3B; */
        /* border: 3px solid #232E3B; */

    }
    .again{
        margin: 0;
        width: 26px;
        height: 26px;
    }
`;

function GameResult(){

    return(
        <>
            <Container>
                <Header />
                <UserPhoto />
                <UserName>
                    김민석님
                </UserName>
                <Point>
                    <MyPoint>
                        <p>나의 획득 point</p>
                        <p className='point'>1200 점</p>
                    </MyPoint>
                    <OpponentPoint>
                        <p>상대의 획득 point</p>
                        <p className='point'>1200 점</p>
                    </OpponentPoint>
                </Point>
                <AllPoint>
                    20000 point
                </AllPoint>
                <p className='text'>
                    지난 경기 결과는<br/>
                    마이페이지에서 볼 수있습니다
                </p>
                <StyledLink to='/point'>
                    <GotoMain >
                        <BiHome className='homeIcon'/>
                        획득한 포인트 FLEX하러가기
                    </GotoMain>
                </StyledLink>
                <StyledLink to='/settingGame'>
                    <AgainGame >
                        <BsArrowCounterclockwise className='again'/>
                        오늘 잠 못자!! 다시하기
                    </AgainGame>
                </StyledLink>
            </Container>
        </>
    )
}

export default GameResult;