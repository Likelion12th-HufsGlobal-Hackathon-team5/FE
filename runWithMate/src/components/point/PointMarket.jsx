import React from "react";
import styled from "@emotion/styled";
import { BsCart4 } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; // useNavigate import

function PointMarket() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const StyledBsCart4 = styled(BsCart4)`
    font-size: 110px;
  `;

  const handleClick = () => {
    navigate("/pointshop"); // 버튼 클릭 시 경로 이동
  };

  return (
    <>
      <PointMarketBox onClick={handleClick}> {/* Box 클릭 시 이동 */}
        <Title>포인트 사용처</Title>
        <Coments>
          <Line>내가 차곡 차곡 모은 포인트들,</Line>
          <Description>
            <Line>어디에 쓸까?</Line>
            <IconBox>
              <StyledBsCart4 />
            </IconBox>
          </Description>
        </Coments>
      </PointMarketBox>
    </>
  );
}

export default PointMarket;

const PointMarketBox = styled.div`
  padding: 2vh;
  background-color: #217eef;
  color: #ffffff;
  border: #217eef solid 3px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: left;
  gap: 1vh;
  border-radius: 2vh;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #1b63bb;
    border: #1b63bb solid 3px;
  }

  &:active {
    background-color: #ffffff;
    color: #217eef;
    border: #ffffff solid 3px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 900;
  text-align: left;
`;
const Coments = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0.5vh;
`;

const IconBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: end;
`;

const Description = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

const Line = styled.div`
  font-size: 15px;
  font-weight: 300;
  text-align: left;
`;
