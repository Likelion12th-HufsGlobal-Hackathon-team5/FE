import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import Header from '../../components/Header';
import Content from '../../components/main/Content';

import GameIcon from '/img/gameIcon.png';
import PointIcon from '/img/pointIcon.png';
import { BsCaretRightFill } from 'react-icons/bs';

import getUserIdAndToken from '../../server/user/getUserIdAndToken';
import createRoom from '../../server/gameRoom/createRoom';

const Container=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    flex-wrap: wrap;
    gap: 16px;

    min-height: 889px;
    max-height: 100vh;
    /* max-height: 889px; */
`;
const MainHeader = styled.p`
    padding: 0% 1%;
    margin-top: 67px;
    
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

const GotoGame = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;

    padding: 30px 35px;
    width: 80%;

    flex-wrap: wrap;
    gap: 20px;

    color: white;
    background-color: #2E2929;
    border-radius: 20px;
    cursor: pointer;

    .gameIcon {
        width: 38px;
        height: auto;
    }
`;
const GotoPointshop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;

    padding: 30px 35px;
    width: 80%;

    flex-wrap: wrap;
    gap: 19.1px;

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
    gap: 8.5px;

    text-align: left;
    line-height: 1.2;
`;
const GotoHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    flex-wrap: wrap;
    gap: 10px;
    font-size: 20px;
    font-weight: 700;
`;


function Main (){
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('redirect_roomId')){
            localStorage.setItem('roomId', localStorage.getItem('redirect_roomId'));
            localStorage.removeItem('redirect_roomId');
            navigate('/settingGame');
        }
        const fetch = async () => {
            try {
                const myInfo = await getUserIdAndToken();
                localStorage.setItem("userId", myInfo.userId);
                localStorage.setItem("accessToken", myInfo.accessToken);
            } catch (error) {
                console.log(error);
            }
        };
        fetch();
    }, []);


    const handleGotoGameButtonClick = async (event) => {
        if(localStorage.getItem('userId')){
            event.preventDefault();
            try{
                const roomId = await createRoom();
                localStorage.setItem("look", true)
                localStorage.setItem("roomId", roomId);
                navigate('/settingGame');
            } catch(error) {
                console.log('Main - error creating room : ',error);
            }
        } else{
            alert('먼저 로그인을 하셔야합니다!');
            navigate('/login');
        }

    }

    const handleGotoPointshop = () => {
        if(localStorage.getItem('userId')){
            navigate('/point');
        }else{
            alert('먼저 로그인을 하셔야합니다!');
            navigate('/login');
        }
    }

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
                <Content />
                <GotoGame 
                    onClick={handleGotoGameButtonClick}
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
                <GotoPointshop 
                    onClick={handleGotoPointshop}
                    >
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
