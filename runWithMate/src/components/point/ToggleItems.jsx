import React from "react";
import styled from "@emotion/styled";

function ToggleItems() {
  return (
    <>
      <ToggleItemsContainer>
        <ItemBox>
          <ReasonBox>출석 체크 포인트</ReasonBox>
          <PointAddedMinus reason="출석">
            + 50
          </PointAddedMinus>
        </ItemBox>
        <ItemBox>
          <ReasonBox>홍수지님과의 게임 승리 보상</ReasonBox>
          <PointAddedMinus reason="게임">
            + 300
          </PointAddedMinus>
        </ItemBox>
        <ItemBox>
          <ReasonBox>유지희님과의 게임 승리 보상</ReasonBox>
          <PointAddedMinus reason="게임">
            + 200
          </PointAddedMinus>
        </ItemBox>
      </ToggleItemsContainer>
    </>
  );
}

export default ToggleItems;

const ToggleItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 2vh;
  padding: 5vh 2vh 2vh 2vh;
  background-color: #ffffff;
  border-radius: 2vh;
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ReasonBox = styled.div`
  font-weight: 400;
  font-size: 14px;
`;

const PointAddedMinus = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: ${(props) => (props.reason === "출석" ? "#2DEE9B" : props.reason === "게임" ? "#1B63BB" : "inherit")};
`;
