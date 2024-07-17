import { useEffect } from 'react';
import styled from '@emotion/styled'

const Container=styled.div``;

function Login(){
    useEffect(()=>{
        // 카카오 SDK 초기화
        const kakaoAppKey='70b6406b2ded139d1c5117b59f7d6ab8'

        if(!window.Kakao.isInitialized()){
            window.Kakao.init(kakaoAppKey);
        }
    },[]);

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
        window.location.href = 'http://localhost:5173/auth/kakao';
      };
      

    return(
        <>
            <Container>
                login 페이지
                <button onClick={handleKakaoLogin}>카카오로 로그인하기</button>
            </Container>
        </>
    )
}

export default Login;