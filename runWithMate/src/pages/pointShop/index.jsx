import styled from "@emotion/styled";
import Header from "../../components/Header";
import Categorymap from "../../components/point/CategoryMap";
import MarketBtn from "../../components/point/marketBtn";
import { BsFillCartFill } from "react-icons/bs";

function PointShop() {
  const StyledBsFillCartFill = styled(BsFillCartFill)`
    font-size: 24px;
  `;
  return (
    <>
      <Header />
      <Container>
        <PointShopTitle>
          <StyledBsFillCartFill />
          <p>포인트 사용처</p>
        </PointShopTitle>
        <GotoExercise>
          <Title>
            <Title isColoredBlue fontSize="20px">
              운동
            </Title>
            <Title fontSize="18px">하러 가기!</Title>
          </Title>
          <Description>
            - 구매 가능한 헬스장/필라테스 1회 PT권 조회하기 -
          </Description>
        </GotoExercise>
      </Container>
      <Categorymap />
      <Container>
        <BeHealthy>
          <Title>
            <Title isColoredGreen fontSize="20px">
              건강
            </Title>
            <Title fontSize="18px">하러 가기!</Title>
          </Title>
          <Description>
            - 구매 가능한 건강 기능 식품, 헬스 용품 찾아보기 -
          </Description>
          <MarketBtn />
        </BeHealthy>
      </Container>
    </>
  );
}

export default PointShop;

const Container = styled.div`
  margin: 4vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 3vh;
`;

const PointShopTitle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 1vh;
  padding: 1vh;
  border-bottom: 3px solid #2e2929;
  p {
    font-weight: 900;
    font-size: 2vh;
    line-height: 17px;
    letter-spacing: -1px;
    color: #2e2929;
  }
`;

const GotoExercise = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1vh;
  background-color: #ffffff;
  margin-bottom: -2vh;
`;

const BeHealthy = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1vh;
  margin-bottom: 2vh;
  background-color: #ffffff;
`;

const Title = styled.div`
  font-size: ${(props) => props.fontSize || "18px"};
  font-weight: 900;
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 0.3vh;
  justify-content: center;
  text-align: center;
  color: ${(props) =>
    props.isColoredBlue
      ? "#217EEF"
      : props.isColoredGreen
      ? "#42E19D"
      : "#2e2929"};
`;

const Description = styled.div`
  font-size: 13px;
  font-weight: 400;
`;
