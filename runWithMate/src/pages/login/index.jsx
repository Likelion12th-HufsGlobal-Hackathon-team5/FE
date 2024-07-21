import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Image from '../../assets/images/Login.png';
import KakaoImg from '../../assets/images/kakao_login.png';
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
    // useEffect(()=>{s
    //     // 카카오 SDK 초기화
    //     const kakaoAppKey='70b6406b2ded139d1c5117b59f7d6ab8'

    //     if(!window.Kakao.isInitialized()){
    //         window.Kakao.init(kakaoAppKey);
    //     }
    // },[]);

    // const handleKakaoLogin = () => {
    //     window.Kakao.Auth.login({
    //       success: function(authObj) {
    //         console.log('로그인 성공', authObj);
    //         window.Kakao.API.request({
    //           url: '/v2/user/me',
    //           success: function(response) {
    //             console.log('사용자 정보', response);
    //           },
    //           fail: function(error) {
    //             console.log('사용자 정보 요청 실패', error);
    //           },
    //         });
    //       },
    //       fail: function(err) {
    //         console.log('로그인 실패', err);
    //       },
    //     });
    //   };

    const handleKakaoLogin = () => {
        window.location.href = 'http://www.google.com';
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