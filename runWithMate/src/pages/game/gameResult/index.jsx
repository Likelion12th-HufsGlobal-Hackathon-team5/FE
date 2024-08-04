import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Header from "../../../components/Header";
import GameResultBox from "../../../components/game/gameResult/gameResult";
import { BsArrowCounterclockwise } from "react-icons/bs";
import GameStopBtn from "../../../components/game/gameResult/GameStop";
import GameAgainBtn from "../../../components/game/gameResult/GameAgain";

function GameResult() {
  return (
    <>
      <Container>
        <Header />
        <GameResultBox />
        <p className="text">
          지난 경기 결과는
          <br />
          마이페이지에서 볼 수 있습니다.
        </p>
        <GameStopBtn />
        <GameAgainBtn />
      </Container>
    </>
  );
}

export default GameResult;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
