import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { BiHome } from "react-icons/bi";
import { BsArrowCounterclockwise } from "react-icons/bs";

function GameAgainBtn() {
  const StyledBsArrowCounterclockwise = styled(BsArrowCounterclockwise)`
    font-size: 16px;
  `;

  return (
    <StyledLink to="/settingGame">
      <AgainGame>
        <StyledBsArrowCounterclockwise className="again" />
        오늘 잠 못자!! 다시하기
      </AgainGame>
    </StyledLink>
  );
}

export default GameAgainBtn;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  width: 100%;
  text-decoration: none;
`;

const AgainGame = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  /* gap: 2vh; */
  gap: 17px;
  width: 70%;
  box-sizing: border-box;
  padding: 3.5% 4.5%;
  color: white;
  background-color: #2e2929;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;

  &:hover,
  :active {
    transition: all 0.2s;
    background-color: #414b57;
  }
  .again {
    margin: 0;
    width: 26px;
    height: 26px;
  }
`;
