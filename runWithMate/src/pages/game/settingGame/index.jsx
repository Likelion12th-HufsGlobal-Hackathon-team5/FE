import styled from '@emotion/styled';
import Header from '../../../components/Header';
import Content from './components/Content';
import Setting from './components/Setting';
import Lobby from './components/Lobby';

const Background = styled.div`
  background-image: url('https://i.imgur.com/VNjJZio.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh; /* 화면 높이에 맞추기 */
  display: flex;
  flex-direction: column;
  overflow: auto; /* 스크롤 가능하도록 설정 */
`;

const StartGame = styled.button`
  margin-top: 9.26vh;
  margin-left: 3.7vh;
  width: 31.94vh;
  height: 4.17vh;
  justify-content: center;
  align-items: center;
  gap: 0.46vh;
  align-self: stretch;
  border-radius: 0.93vh;
  border: 0.18vh solid #217EEF;
  background: #217EEF;
  color: white;
  margin-bottom: 10vh; /* 버튼 아래에 여백 추가 */
`;

function SettingGame() {
  return (
    <>
      <Header />
      <Background>
        <Content />
        <Setting />
        <Lobby />
        <StartGame>게임 시작하기</StartGame>
      </Background>
    </>
  );
}

export default SettingGame;
