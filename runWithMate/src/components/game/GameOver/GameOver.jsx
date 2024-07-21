import React from "react";
import styled from "@emotion/styled";
import GameOverImg from "../../../assets/images/GoodJob.png"; // 이미지 경로 확인

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

const Popup = styled.div`
  background-color: #2e2929;
  padding: 4vh 2vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1vh;
  border: #2e2929 solid 3px;
  border-radius: 5vh;
`;

const ImgBox = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;

const DescriptionBox = styled.div`
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 2vh;
  color: #ffffff;
`;

const TitleBox = styled.div`
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0vh;
`;

const Title = styled.div`
  font-size: 60px;
  font-weight: 900;
`;

const ComentsBox = styled.div`
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0.5vh;
  margin-bottom: 2vh;
`;

const Coments = styled.div`
  align-items: center;
  text-align: center;
  font-size: medium;
  font-weight: 400;
`;

const GameOver = () => {
  return (
    <Container>
      <Popup>
        <ImgBox>
          <img src={GameOverImg} alt="Game Over" style={{ maxWidth: '80%', height: 'auto' }} />
        </ImgBox>
        <DescriptionBox>
          <TitleBox>
            <Title>Game</Title>
            <Title>Over</Title>
          </TitleBox>
          <ComentsBox>
            <Coments>게임이 종료되었습니다.</Coments>
            <Coments>운동하시느라 수고하셨습니다.</Coments>
          </ComentsBox>
        </DescriptionBox>
      </Popup>
    </Container>
  );
};

export default GameOver;
