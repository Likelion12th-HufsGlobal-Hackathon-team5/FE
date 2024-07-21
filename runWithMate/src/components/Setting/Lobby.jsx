import styled from '@emotion/styled';
import Player from './Player';
import OtherPlayer from './Player2';

const LobbyForm = styled.form`
    width: 85%;
    height: 100%;
    padding: 3vh;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 2vh;
    border: 0.7vh solid #217EEF;
    background: #FFF;
    position: relative;
    top : 10vh;
    left : 4vh;
`;

const LobbyTitle = styled.h2`
    color: #000;
    font-family: Inter;
    font-size: 4vh; 
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const LobbySubtitle = styled.p`
    color: #000;
    font-family: Inter;
    font-size: 2vh; 
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top : 2.5vh;
`;

const CodeContainer = styled.div`
    display: flex;
    width : 100%;
    height : 100%;
`

const InviteCodeContainer = styled.div`
    flex-direction: column;
    width : 50%;
    height : 100%;
`
const KakaoCodeContainer = styled.div`
    flex-direction: column;
    width : 50%;
    height : 100%;
`

const Kakaobutton = styled.button`
    display: flex; 
    justify-content: center; 
    align-items: center; 
    width : 100%;
    height : 100%;
    border-radius: 1vh;
    background: #FAE100;
    font-family: Inter, sans-serif;
    font-size: 2vh; 
    color: #000; 
    `

const Line = styled.div`
  border-left: 0.3vh solid black;
  width: 1vh;
  height: 6vh;
  color: #217EEF;
  margin-top : 2vh;
`;

const HorizontalLine = styled.div`
  border-top: 0.2vh solid black;  
  width: 100%;
  color: #217EEF;
  margin-top : 2vh;
`;

const ReadyContainer = styled.div`
    width : 100%;
    height : 100%;
`



export default function Lobby(){
    return(

        <LobbyForm>
            <LobbyTitle>게임 로비</LobbyTitle>
            <CodeContainer>
                <InviteCodeContainer>
                    <LobbySubtitle>초대코드</LobbySubtitle>
                    <h1>벡앤드코드</h1>
                </InviteCodeContainer>
                <Line />
                <KakaoCodeContainer>
                    <LobbySubtitle>또는</LobbySubtitle>
                    <Kakaobutton>카카오톡 초대</Kakaobutton>
                </KakaoCodeContainer>
            </CodeContainer>
            <HorizontalLine />
            <LobbySubtitle>플레이어</LobbySubtitle>
            <ReadyContainer>
                <Player />
                <HorizontalLine />
                <OtherPlayer />
            </ReadyContainer>
        </LobbyForm>
    );
}