import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Header from "../../../components/Header";
import GameResultBox from "../../../components/game/gameResult/gameResult";
import { BiHome } from "react-icons/bi";
import { BsArrowCounterclockwise } from "react-icons/bs";

function GameResult() {
  const StyledBiHome = styled(BiHome)`
    font-size: 16px;
  `;
  const StyledBsArrowCounterclockwise = styled(BsArrowCounterclockwise)`
    font-size: 16px;
  `;
  
  return (
    <>
      <Container>
        <Header />
        <GameResultBox/>
        <p className="text">
          지난 경기 결과는
          <br />
          마이페이지에서 볼 수있습니다
        </p>
        <StyledLink to="/point">
          <GotoMain>
            <StyledBiHome className="homeIcon" />
            획득한 포인트 FLEX하러가기
          </GotoMain>
        </StyledLink>
        <StyledLink to="/settingGame">
          <AgainGame>
            <StyledBsArrowCounterclockwise className="again" />
            오늘 잠 못자!! 다시하기
          </AgainGame>
        </StyledLink>
      </Container>
    </>
  );
}

export default GameResult;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  gap: 3vh;
  box-sizing: border-box;
  .text {
    text-align: center;
    color: #aeaeb2;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.4;
    margin-bottom: -2vh;
  }
`;
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
  gap: 2vh;

  width: 70%;

  padding: 3.5% 4%;
  color: white;
  background-color: #217eef;

  border: none;
  border-radius: 10px;

  font-size: 14px;
  font-weight: 700;
  margin-bottom: -1vh;

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
const AgainGame = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;

  flex-wrap: wrap;
  gap: 2vh;

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
    /* background-color: black; */

    box-sizing: border-box;
    /* border-color:#232E3B; */
    /* border: 3px solid #232E3B; */
  }
  .again {
    margin: 0;
    width: 26px;
    height: 26px;
  }
`;
