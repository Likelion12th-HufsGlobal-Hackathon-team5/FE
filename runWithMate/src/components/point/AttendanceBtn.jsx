import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { BsCheckCircleFill } from "react-icons/bs";

function AttendanceBtn() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    alert("출석 완료! 200point 적립되었습니다.");
    setIsClicked(false); // 알림창 닫으면 isClicked 상태 초기화
  };

  return (
    <AttendanceButton onClick={handleClick}>
      <BsCheckCircleFill />
      출석하고 포인트 적립하기!
    </AttendanceButton>
  );
};

export default AttendanceBtn;

const AttendanceButton = styled.button`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: medium;
  gap: 1vh;
  color: #ffffff;
  background-color: #2e2929;
  border: #2e2929 solid 3px;
  padding: 1.5vh;
  border-radius: 2vh;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border 0.3s, box-shadow 0.3s;
  &:hover {
    background-color: #2dee9b;
    color: #2e2929;
    border: #2dee9b solid 3px;
  }
  &:active {
    background-color: #ffffff;
    color: #23dc8c;
    border: #ffffff solid 3px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
`;
