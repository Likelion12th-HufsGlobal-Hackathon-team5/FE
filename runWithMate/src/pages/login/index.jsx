import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import Image from '/img/Login.png';
import KakaoImg from '/img/kakao_login.png';

import {BiHome} from 'react-icons/bi';

const Container=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 2vw;
    min-height: 889px;
    max-height: 100vh;

    img{
        margin-bottom: 4%;
    }
    p{
        margin: 0;
    }

    .girlImg{
        /* width: 92.5%; */
        width: 80%;
    }

    .kakao{
        color:#2E2929;
        margin: 5% 0;
        font-size: 12px;
        font-weight: 400;
    }

    .kakaoBold{
        color:#2E2929;
        font-size: 13px;
        font-weight: 800;
    }

    .kakaoImg{
        width: 90%;

        /* &:hover{
            transition: all 0.2s;
            background-color: rgba(107,99,26,0.35);
        } */
    }
`;

const Text=styled.div`
    align-items: center;
    text-align: left;

    flex-wrap: wrap;
    gap: 0.5vh;

    margin-top: 5%;

    color: #2E2929;
    font-weight: 800;
    font-size: 40px;
    line-height: 1.3;

    .intro{
        margin-top: 3%;
        margin-bottom: 35%;
        color: #2E2929;
        font-weight: 400;
        font-size: 16px;
    }

    .introBold{
        font-weight: 800;
        font-size: 16px;
    }

`;
const StyledLink=styled(Link)`
    display: flex;
    justify-content: center;
    width: 100%;

    text-decoration: none;
`;
const GotoMainBtn=styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;

    flex-wrap: wrap;
    gap: 22.5%;

    /* width: 92.5%; */
    width: 90%;

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
function Login(){
    const handleKakaoLogin = () => {
        window.location.href = 'https://api.runwithmate.klr.kr/oauth2/authorization/kakao';
      };
      
      
    return(
        <>
            <Container>
                <img src={Image} className='girlImg'/>
                <Text>
                    Run With Mate
                    <br />
                    <p className='intro'>
                    지친 당신의 일상을 벗어나 <br/>
                    <span className='introBold'>Run With Mate!</span>와 함께 <br/>친구와 당신의 능력을 시험해보세요!
                    </p>
                </Text>
                <p className='kakao'>카카오 로그인 후 <span className='kakaoBold'>Run With Mate!</span>를  시작해보세요 !!</p>
                <img 
                    src={KakaoImg} 
                    className='kakaoImg'
                    onClick={handleKakaoLogin}
                    />
                <StyledLink to='/'>
                    <GotoMainBtn>
                        <BiHome className='homeIcon'/>
                        홈 화면으로 돌아가기
                    </GotoMainBtn>
                </StyledLink>
            </Container>
        </>
    )
}

export default Login;