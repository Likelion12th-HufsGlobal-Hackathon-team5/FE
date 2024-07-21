import styled from '@emotion/styled';
import Header from '../../../components/Header';
import Content from '../../../components/Setting/Content';
import Setting from '../../../components/Setting/Setting';
import Lobby from '../../../components/Setting/Lobby';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display : flex;
  flex-direction: column;
  width : 100%;
  height : 100%;
`

const Background = styled.div`
  background-image: url('https://i.imgur.com/VNjJZio.png');
  background-size: cover;
  background-position: center;
  width : 100%;
  height : 100%;
`
// 추후 변경
const StartGame = styled.button`
  margin-top: 13vh;
  margin-left: 5vh;
  width: 80%;
  height: 100%;
  padding : 1vh;
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
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };


  return (
  <>
    <Container>
      <Header />
      <Background>
        <Content />
        <Setting />
        <Lobby />
        <StartGame onClick={handleStartGame}>게임 시작하기</StartGame>
      </Background>
    </Container>
  </>
  );
}

export default SettingGame;
