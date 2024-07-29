import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';

import Header from '../../components/Header';

import axios from 'axios';
// import useWebSocket from '../../hooks/useWebSocket';
import UseStomp from '../../hooks/useStomp';

import GameIcon from '../../assets/images/gameIcon.png';
import PointIcon from '../../assets/images/pointIcon.png';
import BrainIcon from '../../assets/images/brainIcon.png';

import { BsCaretRightFill } from 'react-icons/bs';
import { FaRunning } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";


const websocketUrl='ws서버-url';

const Container=styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;

    flex-wrap: wrap;
    gap: 16px;

    min-height: 889px;
    max-height: 100vh;
`;
const MainHeader = styled.p`
    padding: 0% 1%;
    margin-top: 8vh;
    
    font-size: 42px;
    font-weight: 900;
`;
const Intro = styled.p`
    justify-content: left;

    color: #2E2929;

    width: 80%;
    font-size: 16px;
    line-height: 1.2;

    .blue {
        font-size: 16px;
        color: #217EEF;
        font-weight: 700;
    }
`;
const ContentsBox = styled.div`
    display: flex;
    flex-direction: column; 

    padding: 2vh;

    width: 80%;
    border: 2.5px solid #AEAEB2;
    border-radius: 10px;

    font-size: 13px;
    font-weight: 400;
    line-height: 1.2;
`;
const Point = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    flex-wrap: wrap;
    gap: 3vh;

    margin-top: 2vh;
`;
const PointText = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;

    flex-wrap: wrap;
    gap: 0.3vh;

    p {
        font-weight: 700;
        font-size: 16px;
    }

    font-size: 13px;
`;
const Circle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 5vh;
    height: 5vh;
    padding: 1vh;

    color: white;
    background-color: #2E2929;
    border-radius: 100%;

    .run {
        width: 22px;
        height: 28px;
    }
    .people {
        width: 28px;
        height: 21px;
    }
    .brain {
        width: 24px;
        height: 22px;
    }
`;
const GotoGame = styled(Link)`
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;

    padding: 4vh 4vh;
    width: 80%;

    color: white;
    background-color: #2E2929;
    border-radius: 20px;

    .gameIcon {
        width: 38px;
        height: auto;
    }
`;
const GotoPointshop = styled(Link)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    padding: 4vh 3vh;
    width: 80%;

    color: white;
    background-color: #217EEF;
    border-radius: 20px;

    .pointIcon {
        width: 39px;
        height: 42px;
    }
`;
const GotoText = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1vh;

    margin-left: 3vh;
    text-align: left;
    line-height: 1.2;
`;
const GotoHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    flex-wrap: wrap;
    gap: 1vh;
    font-size: 20px;
    font-weight: 700;
`;


function Main (){
    const navigate = useNavigate();
    const { connected, roomNumber, createRoom }=UseStomp();

    const SERVER_URL='http://api.runwithmate.klr.kr';
    const [onDiv, setonDiv] = useState(true);

    const handleButtonClick = async () => {
        await createRoom();
        setonDiv(false);
        // alert(onDiv);
        // 상태가 업데이트된 후 로컬 스토리지에 값을 저장하기 위해 useEffect에서 처리
        if (connected && roomNumber) {
            navigate('/settingGame');
        }
    };

    useEffect(() => {
        // onDiv 상태가 변경될 때마다 로컬 스토리지 업데이트
        localStorage.setItem("look", onDiv);
    }, [onDiv]); // onDiv가 변경될 때마다 이 useEffect가 실행됨
     

    return (
        <>
            <Container>
                <Header />
                <MainHeader>
                    Run With Mate!
                </MainHeader>
                <Intro>
                    지친 당신의 일상을 벗어나 <br />
                    <span className='blue'>Run With Mate!</span>와 함께<br />
                    친구와 당신의 능력을 시험해보세요!
                </Intro>
                <ContentsBox>
                    경쟁은 간혹 부정적인 의미로 많이 남죠.<br />
                    하지만 잘 갖춰진 경쟁의 세계는<br />
                    오히려 긍정적인 효과를 극대화시킬 수 있습니다! haha
                    <Point>
                        <Circle>
                            <FaRunning className='run' />
                        </Circle>
                        <PointText>
                            <p>일단 뛰세요!</p>
                            너, 너무 게을러.
                        </PointText>
                    </Point>
                    <Point>
                        <Circle>
                            <IoPeople className='people' />
                        </Circle>
                        <PointText>
                            <p>친구와 함께해서 더 재밌게!</p>
                            당신...친구 없어?
                        </PointText>
                    </Point>
                    <Point>
                        <Circle>
                            <img src={BrainIcon} className='brain' />
                        </Circle>
                        <PointText>
                            <p>도파민을 자극합니다</p>
                            건강한 도파민 자극!
                        </PointText>
                    </Point>
                </ContentsBox>

                <GotoGame to='/settingGame' 
                    onClick={handleButtonClick}
                    >
                    <img src={GameIcon} className='gameIcon'/>
                    <GotoText>
                        <GotoHeader>
                            게임 시작하기
                            <BsCaretRightFill />
                        </GotoHeader>
                        친구를 초대해 대결을 진행합니다
                    </GotoText>
                </GotoGame>
                <GotoPointshop to='/point'>
                    <img src={PointIcon} className='pointIcon' />
                    <GotoText>
                        <GotoHeader>
                            포인트샵 바로 가기
                            <BsCaretRightFill />
                        </GotoHeader>
                        다양한 상품을 둘러보세요
                    </GotoText>
                </GotoPointshop>
            </Container>
        </>
    )
}


export default Main;
