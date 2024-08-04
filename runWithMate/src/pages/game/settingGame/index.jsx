import styled from '@emotion/styled';
import Header from '../../../components/Header';
import Content from '../../../components/Setting/Content';
import Setting from '../../../components/Setting/Setting';
import Lobby from '../../../components/Setting/Lobby';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import UseStomp from '../../../hooks/useStomp';

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

// const initialMock = {
//   type: 'room_joined',
//   user1: "로딩중입니다",
//   user2: "로딩중입니다",
//   bet_point: 0,
//   time_limit: 0
// };

function SettingGame() {
  const [Point,setPoint] = useState(23500);
  // const [receivedData, setReceivedData] = useState(initialMock);
  const [receivedData, setReceivedData] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  if (queryParams.get("roomId")) {
    const roomId = queryParams.get("roomId");
    localStorage.setItem("roomId",roomId);
    window.history.replaceState({}, null, location.pathname);
  }

  // --------------------------
  // 수신 함수
  const onMessageReceived = (message) => {
    setReceivedData(JSON.parse(message.body));
  };

  const { connected, send, disconnect }=UseStomp(onMessageReceived);

  // 송신 함수
  const wsInstance = useCallback((wsMethod, data) => {
    if (connected) {
      send(`/send/${wsMethod}/${localStorage.getItem('roomId')}`, {}, JSON.stringify(data));
    }
  }, [connected, send]);
  // --------------------------

  useEffect(() => {
    wsInstance("check_room", {});
  }, [connected])

  useEffect(()=>{
    const bet_point=receivedData.bet_point;
    const time_limit=receivedData.time_limit;
    const settingData={bet_point, time_limit};
    localStorage.setItem('setting',settingData);
  })

  const handleStartGame = () => {
    wsInstance("start_game", {});
    navigate('/game');
  };

  // --------------------------


  return (
  <>
    <Container>
      <Header />
      <Background>
        <Content />
        <Setting 
          Mypoint={Point} 
          receivedData={receivedData} 
          wsInstance={wsInstance}
        />
        <Lobby receivedData={receivedData}/> {/* receivedData의 초기값을 mock데이터로 설정하고 변경했습니다! */}
        <StartGame onClick={handleStartGame}>게임 시작하기</StartGame>
      </Background>
    </Container>
  </>
  );
}

export default SettingGame;
