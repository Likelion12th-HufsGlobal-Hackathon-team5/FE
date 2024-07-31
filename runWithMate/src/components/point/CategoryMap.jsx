import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import CategoryGymMarker from "../../assets/images/cg.png";
import CategoryPilatesMarker from "../../assets/images/cp.png";

function CategoryMap() {
  const [activeCategory, setActiveCategory] = useState(null); // 초기값을 null로 설정
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // 지도 초기화 및 마커 로드 로직
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
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const container = document.getElementById("map");

        const options = {
          center: new kakao.maps.LatLng(lat, lng),
          level: 5,
          draggable: true,
        };
        const mapInstance = new kakao.maps.Map(container, options);
        setMap(mapInstance);

        // 헬스장과 필라테스 시설 검색
        searchNearbyLocations(lat, lng);
      },
      (error) => {
        console.error("위치 정보를 가져올 수 없습니다.", error);
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.59758314452587, 127.05783587045535),
          level: 5,
          draggable: true,
        };
        const mapInstance = new kakao.maps.Map(container, options);
        setMap(mapInstance);
      }
    );
  };

  const searchNearbyLocations = (lat, lng) => {
    const ps = new kakao.maps.services.Places();
    const radius = 10000;

    // 헬스장 검색
    ps.keywordSearch("헬스장", (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const gymLocations = data.map(item => ({
          name: item.place_name,
          lat: item.y,
          lng: item.x
        })).slice(0, 10);
        localStorage.setItem("categoryGym", JSON.stringify(gymLocations));
      }
    }, {
      location: new kakao.maps.LatLng(lat, lng),
      radius: radius
    });

    // 필라테스 검색
    ps.keywordSearch("필라테스", (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const pilatesLocations = data.map(item => ({
          name: item.place_name,
          lat: item.y,
          lng: item.x
        })).slice(0, 10);
        localStorage.setItem("categoryPilates", JSON.stringify(pilatesLocations));
      }
    }, {
      location: new kakao.maps.LatLng(lat, lng),
      radius: radius
    });
  };

  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      removeMarkers();
      setActiveCategory(null);
    } else {
      removeMarkers();
      setActiveCategory(category);
      
      // 선택한 카테고리에 따라 마커 로드
      if (category === "GYM_CATEGORY_CODE") {
        const gymLocations = JSON.parse(localStorage.getItem("categoryGym")) || [];
        if (gymLocations.length > 0) {
          addMarkers(gymLocations, CategoryGymMarker);
        }
      } else if (category === "PILATES_CATEGORY_CODE") {
        const pilatesLocations = JSON.parse(localStorage.getItem("categoryPilates")) || [];
        if (pilatesLocations.length > 0) {
          addMarkers(pilatesLocations, CategoryPilatesMarker);
        }
      }
    }
  };

  const addMarkers = (locations, markerImageSrc) => {
    const markerImage = new kakao.maps.MarkerImage(
      markerImageSrc,
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

    setMarkers(prevMarkers => [...prevMarkers, ...newMarkers]);
  };

  const removeMarkers = () => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMarkers([]);
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
