import React, { useState } from "react";
import styled from "@emotion/styled";
import { BsPiggyBank } from "react-icons/bs";
import MyWalletToggle from "./MyWalletToggle";

const MyWallet = () => {
  const [isToggleVisible, setIsToggleVisible] = useState(false);

  const handleMyWalletBoxClick = () => {
    setIsToggleVisible((prev) => !prev);
  };

  const StyledBsPiggyBank = styled(BsPiggyBank)`
    font-size: 110px;
  `;

  return (
    <MyWalletContainer>
      <MyWalletBox isActive={isToggleVisible} onClick={handleMyWalletBoxClick}>
        <Title>나의 포인트 내역</Title>
        <Coments>
          <Line>티끌 모아 태산!</Line>
          <Description>
            <Paragraph>
              <Line>그동안 모은 내 포인트,</Line>
              <Line>얼마나 모였을까?</Line>
            </Paragraph>
            <IconBox>
              <StyledBsPiggyBank />
            </IconBox>
          </Description>
        </Coments>
      </MyWalletBox>
      {isToggleVisible && <MyWalletToggleStyled />}
    </MyWalletContainer>
  );
};

export default MyWallet;

const MyWalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative; // 부모 요소에 상대 위치 설정
`;

const MyWalletBox = styled.div`
  padding: 2vh;
  background-color: #217eef;
  color: #ffffff;
  border: #217eef solid 3px;
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 0.8px;
  border-radius: 2vh;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border 0.3s, box-shadow 0.3s;
  z-index: 2;

  &:hover {
    background-color: #1B63BB;
    color: #ffffff;
    border: #1B63BB solid 3px;
  }

  ${({ isActive }) =>
    isActive &&
    `
    background-color: #ffffff;
    color: #217eef;
    border: #ffffff solid 3px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  `}
`;

const MyWalletToggleStyled = styled(MyWalletToggle)`
top: 50%;
  z-index: 1; // MyWalletBox보다 낮은 z-index 설정
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 900;
  text-align: left;
`;

const Coments = styled.div`
  display: flex;
  flex-direction: column;
`;

const IconBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: end;
`;

const Description = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Paragraph = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Line = styled.div`
  font-size: 15px;
  font-weight: 300;
  text-align: left;
`;
