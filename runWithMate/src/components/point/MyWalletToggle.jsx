import React, { useState } from "react";
import styled from "@emotion/styled";
import { BsCaretDownFill } from "react-icons/bs";

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
      isActive ? "rotate(180deg)" : "rotate(0deg)"};
  `;

  return (
    <ToggleContainer>
      {["2024.08.06", "2024.08.05", "2024.08.04", "2024.08.03"].map((date, index) => (
        <React.Fragment key={index}>
          <HeaderWrap>
            <ItemBox
              onClick={() => handleItemBoxClick(index)}
              isActive={visibleItems[index]}
            >
              <DateBox>{date}</DateBox>
              <IconBox>
                <StyledBsCaretDownFill isActive={visibleItems[index]} />
              </IconBox>
            </ItemBox>
            {visibleItems[index] && (
              <ToggleItemsStyled>
                <ToggleItemsContainer>
                  <ContentsBox>
                    <ReasonBox>출석 체크 포인트</ReasonBox>
                    <PointAddedMinus reason="출석">+ 50</PointAddedMinus>
                  </ContentsBox>
                  <ContentsBox>
                    <ReasonBox>김런메님과의 게임 승리 보상</ReasonBox>
                    <PointAddedMinus reason="게임">+ 300</PointAddedMinus>
                  </ContentsBox>
                  <ContentsBox>
                    <ReasonBox>룩굿미님과의 게임 결과 획득</ReasonBox>
                    <PointAddedMinus reason="게임">+ 200</PointAddedMinus>
                  </ContentsBox>
                </ToggleItemsContainer>
              </ToggleItemsStyled>
            )}
          </HeaderWrap>
        </React.Fragment>
      ))}
    </ToggleContainer>
  );
}


export default MyWalletToggle;

const ToggleContainer = styled.div`
  /* padding: 5vh 2vh 3vh 2vh; */
  padding: 40px 20px 30px 20px;
  background-color: #cde4ff;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 12px;
  /* border-radius: 0vh 0vh 2vh 2vh; */
  border-radius: 0px 0px 20px 20px;
`;

const ItemBox = styled.div`
 padding: 16px;
  background-color: ${({ isActive }) =>
    isActive ? "#1b63bb" : "#ffffff"}; // active 상태에 따라 배경색 변경
  color: ${({ isActive }) =>
    isActive ? "#ffffff" : "#1b63bb"}; // active 상태에 따라 글자색 변경
  border: ${({ isActive }) => (isActive ? "#1b63bb" : "#ffffff")} solid 3px; // active 상태에 따라 테두리색 변경
  display: flex;
  justify-content: space-between;
  align-items: center; // 수직 가운데 정렬
  border-radius: 25px;
  cursor: pointer;
  position: relative; // position 속성 추가
  z-index: ${({ isActive }) => (isActive ? "2" : "1")};
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);
`;

const HeaderWrap = styled.div`
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
  z-index: 1;
  position: relative; // position 속성 추가
  /* top: -3vh;  */
  top: -24px;
  // width를 100%로 설정하여 ItemBox 아래에 위치하도록 함
`;

const ToggleItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 16px;
  padding: 40px 15px 20px 15px;
  background-color: #ffffff;
  border-radius: 0px 0px 20px 20px;
  margin: 0px 0px -16px 0px;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const ReasonBox = styled.div`
  font-weight: 400;
  font-size: 14px;
  align-items: center;
`;

const PointAddedMinus = styled.div`
  font-weight: 600;
  font-size: 16px;
  align-items: center;
  color: ${(props) =>
    props.reason === "출석"
      ? "#2DEE9B"
      : props.reason === "게임"
      ? "#1B63BB"
      : "inherit"};
`;
