import styled from '@emotion/styled';
import Player from './Player';
import OtherPlayer from './Player2';
import { BsLink45Deg } from "react-icons/bs";

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
    top: 10vh;
    left: 4vh;
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
`;

const CodeContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`;

const LinkImg = styled(BsLink45Deg)`
    font-size: 4vh;
    color: #FFF; 
    margin-right: 2vh; 
`;

const CopyBtn = styled.div`
    width: 100%;
    height: 6vh;
    flex-shrink: 0;
    border-radius: 1vh;
    background: #000;
    text-align: center;
    display: flex; /* Flexbox 사용 */
    align-items: center; /* 수직 중앙 정렬 */
    justify-content: flex-start; /* 수평 왼쪽 정렬 */
    padding-left: 1vh; /* 아이콘과 텍스트 사이에 여백 추가 */
    position: relative;
    margin-top : 1vh;
    margin-bottom : 1vh;
`;

const CopyTitle = styled.h3`
    color: #FFF;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0; /* margin-top 제거 */
    margin-left: 1vh; /* 아이콘과 텍스트 사이에 여백 추가 */
`;

const HorizontalLine = styled.div`
    border-top: 0.2vh solid black;  
    width: 100%;
    color: #217EEF;
    margin-top: 1vh;
`;

const ReadyContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export default function Lobby() {
    const copyUrlToClipboard = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl)
          .then(() => {
            alert('URL이 클립보드에 복사되었습니다.');
          })
          .catch(err => {
            console.error('URL 복사 실패', err);
          });
    };

    return (
        <LobbyForm>
            <LobbyTitle>게임 로비</LobbyTitle>
            <CodeContainer>
                <CopyBtn onClick={copyUrlToClipboard}>
                    <LinkImg />
                    <CopyTitle>초대 링크 공유하기</CopyTitle>
                </CopyBtn>
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
