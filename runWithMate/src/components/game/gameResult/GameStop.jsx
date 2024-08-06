import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { BiHome } from "react-icons/bi";


function GameStopBtn() {

    const StyledBiHome = styled(BiHome)`
    font-size: 16px;
  `;

  return (
    <StyledLink to="/point">
      <GotoMain>
        <StyledBiHome className="homeIcon" />
        획득한 포인트 FLEX하러가기
      </GotoMain>
    </StyledLink>
  );
}

export default GameStopBtn;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  width: 100%;
  text-decoration: none;
`;

const GotoMain = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  /* gap: 2vh; */
  gap: 17px;
  width: 70%;
  padding: 3.5% 4%;
  color: white;
  background-color: #217eef;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  /* margin-bottom: -1vh; */
  margin-bottom: -8.5px;
  
  &:hover,
  :active {
    transition: all 0.2s;
    background-color: #1b63bb;
  }
  .homeIcon {
    margin: 0;
    width: 26px;
    height: 26px;
  }
`;