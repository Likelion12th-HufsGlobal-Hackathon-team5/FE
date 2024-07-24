import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { PiWarningFill } from "react-icons/pi";
import { BsXCircleFill } from "react-icons/bs";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 30%;
  border-radius: 35px;
  border: 5px solid #E96D6D;
  background: #E96D6D;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; 
`;

const CancleButton = styled(BsXCircleFill)`
  font-size: 4vh; 
  color: #FFF; 
  position: absolute; 
  top: 1vh; 
  right: 1vh; 
  cursor: pointer;
`;

const MainButton = styled.button`
  padding: 1.5vh 3vh;
  background-color: white;
  color: #E96D6D;
  border: none;
  border-radius: 5vh;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const MainContent = styled.h2`
  color: #FFF;
  text-align: center;
  font-family: Roboto;
  font-size: 3vh;
  font-style: normal;
  font-weight: 700;
  line-height: 3.2vh; 
`;

const Content = styled.p`
  color: #FFF;
  text-align: center;
  font-family: Roboto;
  font-size: 1.8vh;
  font-style: normal;
  font-weight: 200;
  line-height: 3.2vh;
`;

const Giveup = ({ onClose , betting }) => {

  const [Point, setPoint] = useState(0);
  const navigate = useNavigate();

  const handleMainPage = () => {
    setPoint(prevPoint => prevPoint - betting);
    navigate('/main');
  };

  // WebSocket을 더 공부해봐야 알겠지만 우선 버튼을 눌렀을떄 포인트가 빠져나가는 형식으로 제작


  return ReactDOM.createPortal(
    <Container>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CancleButton onClick={onClose} />
        <PiWarningFill size='70' color='white'/>
        <MainContent>
          정말 기권하시겠습니까?     
        </MainContent>
        <Content>
          배팅한 포인트는 자동으로 상대방에게 넘어갑니다.
        </Content>
        <MainButton onClick={handleMainPage}>기권하고 메인으로 돌아가기</MainButton>
      </Modal>
    </Container>,
    document.body
  );
};

export default Giveup;