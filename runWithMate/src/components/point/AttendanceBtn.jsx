import React, { useState } from "react";
import styled from "@emotion/styled";
import { BsCheckCircleFill } from "react-icons/bs";

function AttendanceBtn() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = async () => {
    // 이미 클릭된 상태라면 반복 클릭 방지
    if (isClicked) return;

    setIsClicked(true);

    // API 호출
    const response = await fakeApiCall();

    // 상태에 따라 알림 메시지 표시
    alert(response.message);

    setIsClicked(false); // 알림 후 상태 초기화
  };

  // 쿠키에 출석 체크 상태를 저장하고 확인하는 함수
  const fakeApiCall = () => {
    return new Promise((resolve) => {
      const alreadyChecked = document.cookie.split('; ').find(row => row.startsWith('attendanceChecked='));
  
      if (alreadyChecked) {
        // 쿠키가 존재하면 실패 응답
        resolve({
          status: "fail",
          type: "modal",
          message: "이미 금일 출석체크가 완료되었습니다.",
        });
      } else {
        // 쿠키가 없으면 성공 응답
        const now = new Date();
        const expirationTime = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 현재 시간 + 24시간
        document.cookie = `attendanceChecked=true; path=/; expires=${expirationTime.toUTCString()}`; // 쿠키 저장
        resolve({
          status: "success",
          type: "modal",
          message: "성공적으로 출석체크되었습니다.",
        });
      }
    });
  };

  return (
    <AttendanceButton onClick={handleClick}>
      <BsCheckCircleFill />
      출석하고 포인트 적립하기!
    </AttendanceButton>
  );
}

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
