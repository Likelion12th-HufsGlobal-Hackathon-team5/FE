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
      {isToggleVisible &&<MyWalletToggleStyled><MyWalletToggle /></MyWalletToggleStyled> }
    </MyWalletContainer>
  );
};

export default MyWallet;

const MyWalletContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MyWalletBox = styled.div`
  padding: 15px;
  background-color: #217eef;
  color: #ffffff;
  border: #217eef solid 3px;
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 7px;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border 0.3s, box-shadow 0.3s;
  z-index: 1;
  position: relative;

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
    z-index: 2;
  `}
`;

const MyWalletToggleStyled = styled.div`
  position: relative; // position을 absolute로 변경
  top: -15px; // MyWallet과 약 3vh 겹치도록 위로 이동
  z-index: 1;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 900;
  text-align: left;
`;

const Coments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  gap: 3px;
`;

const Line = styled.div`
  font-size: 15px;
  font-weight: 300;
  text-align: left;
`;
