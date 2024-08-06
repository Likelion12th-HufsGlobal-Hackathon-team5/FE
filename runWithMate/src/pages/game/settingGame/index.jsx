import styled from '@emotion/styled';
import Header from '../../../components/Header';
import Content from '../../../components/Setting/Content';
import Setting from '../../../components/Setting/Setting';
import Lobby from '../../../components/Setting/Lobby';
import { useNavigate, useLocation } from 'react-router-dom';
import useWsInstance from '../../../hooks/useWsInstance';
import { useEffect, useState } from 'react';

const Container = styled.div`
  display : flex;
  flex-direction: column;

  width : 100%;
  height : 100%;
`

const Background = styled.div`
  display : flex;
  flex-direction: column;
  align-items: center;

  width : 100%;
  height : 100%;
  padding: 2rem 0;
  background-image: url('https://i.imgur.com/VNjJZio.png');
  background-size: cover;
  background-position: center;
  gap: 2rem;
`
const StartGame = styled.button`
  width: 85%;
  height: 40px;
  border-radius: 0.93vh;
  border: 0.18vh solid #217EEF;
  background: #217EEF;
  color: white;
`;

const initialMock = {
  type: 'room_joined',
  user1: "로딩중입니다",
  user2: "로딩중입니다",
  bet_point: 7,
  time_limit: 7
};

function SettingGame() {
  // initialMock 빼지 말아주세요~ tsx가 아니라서 자료형 선언해주려면 필요합니다!
  const [receivedData, setReceivedData] = useState(initialMock); 
  const [betPoint,setBetPoint] = useState(0);
  const [isGameAvailable, setIsGameAvailable] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  if (queryParams.get("roomId")) {
    const roomId = queryParams.get("roomId");

    if (!localStorage.getItem('userId')) {
      localStorage.setItem('redirect_roomId',true);
      alert('먼저 로그인을 하셔야 합니다. 로그인 화면으로 이동합니다.');
      navigate('/login');
    }

    localStorage.setItem("roomId",roomId);
    window.history.replaceState({}, null, location.pathname);
  }

  // 인자로 받은 setReceivedData를 사용하여 수신된 데이터를 저장하는 커스텀 훅입니당~
  // 코드 너무 길어져서 따로 빼놨어요!
  const { wsInstance, connected } = useWsInstance(setReceivedData);

  useEffect(()=>{
    wsInstance("join_room", {});
  },[connected])

  useEffect(()=>{
    if(receivedData.type==="game_started"){
      navigate('/game');
    }
  },[receivedData]);

  const handleStartGame = () => {
    if (!isGameAvailable){
      alert("포인트가 부족한 유저가 있으므로, 게임을 시작할 수 없습니다.");
      return;
    }
    wsInstance("start_game", {});
  };

  return (
  <>
    <Container>
      <Header />
      <Background>
        <Content />
        <Setting 
          betPoint={betPoint}
          setBetPoint={setBetPoint}
          receivedData={receivedData} 
          wsInstance={wsInstance}
        />
        <Lobby 
          receivedData={receivedData}
          betPoint={betPoint} 
          setIsGameAvailable={setIsGameAvailable}
        /> {/* receivedData의 초기값을 mock데이터로 설정하고 변경했습니다! */}
        <StartGame onClick={handleStartGame}>게임 시작하기</StartGame>
      </Background>
    </Container>
  </>
  );
}

export default SettingGame;
