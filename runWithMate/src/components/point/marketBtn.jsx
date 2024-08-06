import React from "react";
import styled from "@emotion/styled";
import { BsCapsulePill } from "react-icons/bs";
import { CgGym } from "react-icons/cg";

function MarketBtn() {
  const StyledBsCapsulePill = styled(BsCapsulePill)`
    font-size: 30px;
  `;
  const StyledCgGym = styled(CgGym)`
    font-size: 40px;
    /* margin: -0.52vh -0.3vh; */
    margin: -4px -3px;
  `;
  return (
    <Container>
      <ButtonBox>
        <StyledBsCapsulePill />
        <StyledParagraph fontWeight="700" fontSize="16px">
          건강 기능 식품
        </StyledParagraph>{" "}
        구매하러 가기
      </ButtonBox>
      <ButtonBox>
        <StyledCgGym />
        <StyledParagraph fontWeight="700" fontSize="16px">
          헬스 용품
        </StyledParagraph>{" "}
        구매하러 가기
      </ButtonBox>
    </Container>
  );
}

export default MarketBtn;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  /* gap: 1vh; */
  gap: 8.5px;
  justify-content: center;
`;

const ButtonBox = styled.button`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: baseline;
  align-items: center;
  font-weight: 300;
  font-size: 16px;
  /* gap: 1vh; */
  gap: 8.5px;
  color: #ffffff;
  background-color: #42e19d;
  border: #42e19d solid 3px;
  /* padding: 2vh; */
  padding: 17px;
  /* border-radius: 2vh; */
  border-radius: 17px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #1dcf82;
    color: #ffffff;
    border: #1dcf82 solid 3px;
  }

  &:active {
    background-color: #ffffff;
    color: #23dc8c;
    border: #ffffff solid 3px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
`;

const StyledParagraph = styled.p`
  font-weight: ${(props) => props.fontWeight || "normal"};
  font-size: ${(props) => props.fontSize || "16px"};
  margin: 0; // 기본 p 태그의 마진을 제거
`;
