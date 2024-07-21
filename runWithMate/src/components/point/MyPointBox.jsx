import styled from "@emotion/styled";
import PointImg from "../../assets/images/profile.png";

function MyPointBox() {
  return (
    <>
      <MyBox>
        <TitleBox>
          <p>김런메님의 포인트 페이지</p>
        </TitleBox>
        <hr
          style={{ height: "3px", backgroundColor: "#2E2929", border: "none" }}
        />
        <ContentsBox>
          <ProfileImgBox></ProfileImgBox>
          <MyPoint>
            <Line>
              <MyPointCurrunt isBold>김런메</MyPointCurrunt>
              <MyPointCurrunt >님은</MyPointCurrunt>
            </Line>
            <Line>
              <MyPointCurrunt isBold>1200</MyPointCurrunt>
              <MyPointCurrunt isBold style={{fontSize: "16px"}}>point</MyPointCurrunt>
            </Line>
            <Line>
              <MyPointCurrunt>사용하실 수 있습니다.</MyPointCurrunt>
            </Line>
          </MyPoint>
        </ContentsBox>
      </MyBox>
    </>
  );
}

export default MyPointBox;

const MyBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const TitleBox = styled.div`
  text-align: left;
  justify-content: center;
  margin-bottom: 1vh;
  p{
  font-weight: 900;
  font-size: 20px;
  line-height: 17px;
  /* identical to box height, or 85% */
  letter-spacing: -1px;
  /* 메인_블랙 */
  color: #2e2929;}
`;

const ContentsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center; // 수평 방향 가운데 정렬
  align-items: center; // 수직 방향 가운데 정렬
  gap: 0.8vh;
  text-align: center;
  margin-top: 4vh;
`;
const ProfileImgBox = styled.div`
  background-image: url(${PointImg});
  background-size: cover;
  background-position: center;
  padding: 7vh;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


const MyPointCurrunt = styled.div`
  text-align: left;
  font-family: "Roboto";
  font-style: normal;
  font-weight: ${(props) => (props.isBold ? 700 : 500)};
  font-size: ${(props) => (props.isBold ? "20px" : "16px")};
  line-height: 24px;
  letter-spacing: 0.15px;
  color: #000000;
`;

const MyPoint = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  gap: 0.5vh;
`;

const Line = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0.5vh;
`;
