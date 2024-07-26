import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import PointImg from "../../assets/images/profile.png";

function MyPointBox() {
  const [UserData, setUserData] = useState(null);

  useEffect(() => {
    // 목 데이터 생성
    const mockUserData = {
      id: "user123",
      nickname: "김런메",
      profile_image: PointImg, // 이미지 경로를 사용하여 프로필 이미지 표시
      point: "1200",
      last_check: "2024-07-26 10:00:00",
    };

    // 목 데이터를 상태에 즉시 설정
    setUserData(mockUserData);
  }, []);

  // gameData가 null인지 확인
  if (!UserData) {
    return null; // 또는 다른 대체 UI를 반환할 수 있습니다.
  }

  return (
    <>
      <MyBox>
        <TitleBox>
          <p>{UserData.nickname}님의 포인트 페이지</p>
        </TitleBox>
        <hr
          style={{ height: "3px", backgroundColor: "#2E2929", border: "none" }}
        />
        <ContentsBox>
          <ProfileImgBox style={{ backgroundImage: `url(${UserData.profile_image})` }}></ProfileImgBox>
          <MyPoint>
            <Line>
              <MyPointCurrunt isBold>{UserData.nickname}</MyPointCurrunt>
              <MyPointCurrunt>님은</MyPointCurrunt>
            </Line>
            <Line>
              <MyPointCurrunt isBold>{UserData.point}</MyPointCurrunt>
              <MyPointCurrunt isBold style={{ fontSize: "16px" }}>
                point
              </MyPointCurrunt>
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

  p {
    font-weight: 900;
    font-size: 20px;
    line-height: 17px;
    letter-spacing: -1px;
    color: #2e2929;
  }
`;

const ContentsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center; // 수평 방향 가운데 정렬
  align-items: center; // 수직 방향 가운데 정렬
  gap: 1vh;
  text-align: center;
  margin-top: 4vh;
`;

const ProfileImgBox = styled.div`
  background-size: cover;
  background-position: center;
  padding: 7vh;
  border-radius: 50%;
  width: 80px; // 이미지 박스 크기 설정
  height: 80px; // 이미지 박스 크기 설정
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
