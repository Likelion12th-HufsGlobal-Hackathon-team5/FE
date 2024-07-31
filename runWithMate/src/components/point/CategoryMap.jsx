import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import CategoryGymMarker from "../../assets/images/cg.png";
import CategoryPilatesMarker from "../../assets/images/cp.png";

function CategoryMap() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=70b6406b2ded139d1c5117b59f7d6ab8&libraries=services,clusterer,drawing";
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeMap = () => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 5,
      draggable: true,
    };
    const mapInstance = new kakao.maps.Map(container, options);
    setMap(mapInstance);
  };

  const addGymMarkers = (map) => {
    const locations = [
      { name: "크로스핏 제스트 포레스트", lat: 37.47222558339707, lng: 127.03913996075923, },
      { name: "오프더팻 PT", lat: 37.47069590992369, lng: 127.03976373928046 },
      { name: "아이러브휘트니스", lat: 37.46831520080698, lng: 127.03912944379503, },
      { name: "피트니스온 서울시청점", lat: 37.56734468360655, lng: 126.9795321730682, },
      { name: "시그마스포츠클럽", lat: 37.56844592474795, lng: 126.97826693972671, },
      { name: "피트니스비엠 광화문점", lat: 37.56832622479662, lng: 126.97660303976384, },
      { name: "MCTGYM 헬스&PT 을지로", lat: 37.56705874884706, lng: 126.98030477934876, },
      { name: "무브짐 앤 무브맥스 PT 시청점", lat: 37.563374633967605, lng: 126.97367025826793, },
      { name: "스포애니 서울시청역점", lat: 37.56315196645955, lng: 126.9751898453901, },
    ];

    // 카테고리 정보 로컬 스토리지에 저장
    localStorage.setItem("categoryGym", JSON.stringify(locations));

    const markerImage = new kakao.maps.MarkerImage(
      CategoryGymMarker,
      new kakao.maps.Size(23, 31)
    );

    const newMarkers = locations.map(({ name, lat, lng }) => {
      const markerPosition = new kakao.maps.LatLng(lat, lng);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        title: name,
        image: markerImage,
      });
      marker.setMap(map);
      return marker;
    });

    setMarkers(newMarkers);
    setActiveCategory("GYM_CATEGORY_CODE");
  };

  const addPilatesMarkers = (map) => {
    const locations = [
      { name: "핏티필라테스 광화문점", lat: 37.5700, lng: 126.9760 },
      { name: "올곧필라테스 시청점", lat: 37.5665, lng: 126.9770 },
      { name: "JS웰필라테스", lat: 37.5640, lng: 126.9780 },
      { name: "모던필라테스 서울 시청점", lat: 37.5650, lng: 126.9790 },
      { name: "니즈필라테스", lat: 37.5635, lng: 126.9785 },
      { name: "JS필라테스 을지로 본점", lat: 37.5660, lng: 126.9820 },
      { name: "스포짐 종로점", lat: 37.5705, lng: 126.9930 },
    ];

    // 카테고리 정보 로컬 스토리지에 저장
    localStorage.setItem("categoryPilates", JSON.stringify(locations));

    const markerImage = new kakao.maps.MarkerImage(
      CategoryPilatesMarker,
      new kakao.maps.Size(23, 31)
    );

    const newMarkers = locations.map(({ name, lat, lng }) => {
      const markerPosition = new kakao.maps.LatLng(lat, lng);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        title: name,
        image: markerImage,
      });
      marker.setMap(map);
      return marker;
    });

    setMarkers(newMarkers);
    setActiveCategory("PILATES_CATEGORY_CODE");
  };

  const removeMarkers = () => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMarkers([]);
  };

  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      removeMarkers(); // 마커 제거
      setActiveCategory(null); // 상태를 null로 변경
    } else {
      if (map) {
        removeMarkers(); // 기존 마커 제거
        if (category === "GYM_CATEGORY_CODE") {
          addGymMarkers(map); // 헬스장 마커 추가
        } else if (category === "PILATES_CATEGORY_CODE") {
          addPilatesMarkers(map); // 필라테스 마커 추가
        }
        setActiveCategory(category); // 새로운 카테고리로 설정
      }
    }
    console.log(category);
  };

  return (
    <Container>
      <CategoryContainer>
        <ItemBox
          onClick={() => handleCategoryClick("GYM_CATEGORY_CODE")}
          active={activeCategory === "GYM_CATEGORY_CODE"}
        >
          <CategoryItem src={"/img/cgc.png"} alt="category Gym" />
          <p style={{fontSize: "10px", fontWeight: "700", margin: "0vh 0.624vh"}}>헬스장</p>
        </ItemBox>
        <ItemBox
          onClick={() => handleCategoryClick("PILATES_CATEGORY_CODE")}
          active={activeCategory === "PILATES_CATEGORY_CODE"}
        >
          <CategoryItem src={"/img/cpc.png"} alt="category Pilates" />
          <p style={{ fontSize: "10px", fontWeight: "700" }}>필라테스</p>
        </ItemBox>
      </CategoryContainer>
      <MapContainer
        id="map"
        style={{ width: "100%", height: "45vh" }}
      ></MapContainer>
    </Container>
  );
}

export default CategoryMap;

const Container = styled.div`
  max-width: 393px;
  max-height: 435px;
  position: relative;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: solid 1px #ffffff;
  border-radius: 2.5vh;
  background-color: #ffffff;
  gap: 1vh;
  padding: 1vh;
  position: absolute;
  align-items: center;
  justify-content: center;
  margin: 1vh;
  top: 10px;
  z-index: 10;
  box-shadow: 0 0 5px rgba(86, 86, 86, 0.5);
`;

const ItemBox = styled.div`
  background-color: ${({ active }) => (active ? "#217eef" : "#cde4ff")};
  border: solid 1px ${({ active }) => (active ? "#217eef" : "#cde4ff")};
  border-radius: 2vh;
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
  align-items: center;
  justify-content: center;
  padding: 1vh;
  color: ${({ active }) => (active ? "#ffffff" : "#2e2929")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #1b63bb;
    color: #ffffff;
    border: solid 1px #1b63bb;
  }

  &:active {
    background-color: #217eef;
    color: #ffffff;
    border: solid 1px #217eef;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
`;

const CategoryItem = styled.img`
  cursor: pointer;
  width: 30px;
  height: auto;
`;
