import React, { useState } from "react";
import styled from "@emotion/styled";
import { BsCaretDownFill } from "react-icons/bs";
import ToggleItems from "./ToggleItems";

function MyWalletToggle() {
  const [visibleItems, setVisibleItems] = useState([false, false, false, false]);

  const handleItemBoxClick = (index) => {
    setVisibleItems((prev) => {
      const newVisibleItems = [...prev];
      newVisibleItems[index] = !newVisibleItems[index];
      return newVisibleItems;
    });
  };

  const StyledBsCaretDownFill = styled(BsCaretDownFill)`
    font-size: 25px;
    transform: ${({ isActive }) =>
      isActive ? "rotate(180deg)" : "rotate(0deg)"}; // active 상태에 따라 회전
  `;

  return (
    <ToggleContainer>
      {["2024.07.17", "2024.07.02", "2024.07.09", "2024.07.09"].map(
        (date, index) => (
          <React.Fragment key={index}>
            <HeaderWrap>
              <ItemBox
                onClick={() => handleItemBoxClick(index)}
                isActive={visibleItems[index]} // active 상태를 props로 전달
              >
                <DateBox>{date}</DateBox>
                <IconBox>
                  <StyledBsCaretDownFill isActive={visibleItems[index]} />{" "}
                  {/* 아이콘에 active 상태 전달 */}
                </IconBox>
              </ItemBox>
              {visibleItems[index] && (
                <ToggleItemsStyled>
                  <ToggleItems />
                </ToggleItemsStyled>
              )}
            </HeaderWrap>
          </React.Fragment>
        )
      )}
    </ToggleContainer>
  );
}

export default MyWalletToggle;

const ToggleContainer = styled.div`
  padding: 5vh 2vh 3vh 2vh;
  background-color: #cde4ff;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1.5vh;
  border-radius: 2vh;
`;

const ItemBox = styled.div`
  padding: 2vh;
  background-color: ${({ isActive }) =>
    isActive ? "#1b63bb" : "#ffffff"}; // active 상태에 따라 배경색 변경
  color: ${({ isActive }) =>
    isActive ? "#ffffff" : "#1b63bb"}; // active 상태에 따라 글자색 변경
  border: ${({ isActive }) => (isActive ? "#1b63bb" : "#ffffff")} solid 3px; // active 상태에 따라 테두리색 변경
  display: flex;
  justify-content: space-between;
  align-items: center; // 수직 가운데 정렬
  border-radius: 3vh;
  cursor: pointer;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.5);
  z-index: 2; // ItemBox의 z-index를 높임
`;

const HeaderWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0vh;
  position: relative; // HeaderWrap에 상대 위치 설정
`;

const DateBox = styled.div`
  font-weight: 600;
  font-size: 18px;
`;

const IconBox = styled.div`
  justify-content: center;
  align-items: center;
`;

const ToggleItemsStyled = styled.div`
  position: absolute; // ToggleItems를 절대 위치로 설정
  top: 100%; // ItemBox의 아래에 위치
  z-index: 1; // ToggleItems의 z-index를 낮춤
  width: 100%; // ToggleItems의 너비를 ItemBox와 동일하게 설정
  box-sizing: border-box; // 패딩과 테두리를 포함하여 크기 계산
`;
