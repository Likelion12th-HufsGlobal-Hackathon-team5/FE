import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import CategoryGymMarker from "../../assets/images/cg.png";
import CategoryGymMarkerOn from "../../assets/images/cgon.png";
import CategoryPilatesMarker from "../../assets/images/cp.png";
import CategoryPilatesMarkerOn from "../../assets/images/cpon.png";

function CategoryMap() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [activeInfoWindow, setActiveInfoWindow] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=0fa1123d0ef6b7d9022c894e92f4852c&libraries=services,clusterer,drawing";
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

    const searchPlaces = (keyword, category, limit) => {
      ps.keywordSearch(
        keyword,
        (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const locations = data.slice(0, limit).map((item) => {
              // 도로명 주소가 없는 경우 일반 주소를 사용
              const address = item.road_address
                ? item.road_address.address_name
                : item.address_name;

              return {
                name: item.place_name,
                lat: item.y,
                lng: item.x,
                id: item.id,
                address: address, // 도로명 주소 또는 일반 주소
                phone: item.phone, // 전화번호
              };
            });

            // 결과를 로컬 스토리지에 저장
            localStorage.setItem(category, JSON.stringify(locations));
          }
        },
        {
          location: new kakao.maps.LatLng(lat, lng),
          radius: radius,
        }
      );
    };

    // 헬스장과 필라테스 검색
    searchPlaces("헬스장", "categoryGym", 10);
    searchPlaces("필라테스", "categoryPilates", 20);
  };

  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      removeMarkers();
      setActiveCategory(null);
    } else {
      removeMarkers();
      setActiveCategory(category);

      if (category === "GYM_CATEGORY_CODE") {
        const gymLocations =
          JSON.parse(localStorage.getItem("categoryGym")) || [];
        if (gymLocations.length > 0) {
          addMarkers(gymLocations, CategoryGymMarker, CategoryGymMarkerOn);
        }
      } else if (category === "PILATES_CATEGORY_CODE") {
        const pilatesLocations =
          JSON.parse(localStorage.getItem("categoryPilates")) || [];
        if (pilatesLocations.length > 0) {
          addMarkers(
            pilatesLocations,
            CategoryPilatesMarker,
            CategoryPilatesMarkerOn
          );
        }
      }
    }
  };

  const addMarkers = (locations, markerImageSrc, activeMarkerImageSrc) => {
    const markerImage = new kakao.maps.MarkerImage(
      markerImageSrc,
      new kakao.maps.Size(23, 31)
    );

    const activeMarkerImage = new kakao.maps.MarkerImage(
      activeMarkerImageSrc,
      new kakao.maps.Size(23, 31)
    );

    let activeMarker = null; // 외부에서 사용하는 활성화된 마커 변수

    const newMarkers = locations.map(({ name, lat, lng }) => {
      const markerPosition = new kakao.maps.LatLng(lat, lng);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        title: name,
        image: markerImage,
      });
      marker.setMap(map);

      kakao.maps.event.addListener(marker, "click", () => {
        // 이전 활성화된 마커가 있다면, 기본 이미지로 복원
        if (activeMarker) {
          activeMarker.setImage(markerImage); // 기본 이미지로 복원
          if (activeInfoWindow) {
            activeInfoWindow.close(); // 이전 정보 창 닫기
          }
        }

        // 현재 클릭한 마커를 활성화
        marker.setImage(activeMarkerImage); // 활성화된 마커 이미지로 변경
        activeMarker = marker; // 활성화된 마커 설정

        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(name, (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const placeDetail = data[0];
            const content = `
                      <div style="display: flex; flex-direction: column; max-width: 300px; white-space: nowrap;">
                        <div style="display: flex; width: 100%; padding: 4.25px; background-color: #217eef; font-weight: 700; color: #ffffff; font-size: 10.2px; box-sizing: border-box;">${
                          placeDetail.place_name
                        }</div>
                        <div style="padding: 4.25px; display: flex; flex-direction: column; gap: 2.55px; width: auto;">
                          <p style="margin: 0; color: #666; white-space: nowrap;">주소: ${
                            placeDetail.road_address
                              ? placeDetail.road_address.address_name
                              : placeDetail.address_name
                          }</p>
                          <p style="margin: 0; color: #666;">전화번호: ${
                            placeDetail.phone || "정보 없음"
                          }</p>
                          <a href="https://map.kakao.com/link/map/${
                            placeDetail.id
                          }" target="_blank" style="color: #217eef; text-decoration: none;">자세히 보기</a>
                        </div>
                      </div>
                    `;

            const newInfoWindow = new kakao.maps.InfoWindow({
              content,
              position: markerPosition,
            });
            newInfoWindow.open(map, marker);
            setActiveInfoWindow(newInfoWindow);
          }
        });
      });

      return marker;
    });

    setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
  };

  const removeMarkers = () => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMarkers([]);

    if (activeInfoWindow) {
      activeInfoWindow.close();
      setActiveInfoWindow(null);
    }

    if (activeMarker) {
      const activeMarkerImage = activeMarker.getImage();
      const previousImage =
        activeMarkerImage && activeMarkerImage.getSrc
          ? activeMarkerImage.getSrc().includes("cgon")
            ? CategoryGymMarker
            : CategoryPilatesMarker
          : CategoryGymMarker; // 기본값 설정

      activeMarker.setImage(
        new kakao.maps.MarkerImage(
          previousImage, // 기본 이미지로 복원
          new kakao.maps.Size(23, 31)
        )
      );
      setActiveMarker(null);
    }
  };

  useEffect(() => {
    return () => {
      if (activeInfoWindow) {
        activeInfoWindow.close();
      }
    };
  }, [activeInfoWindow]);

  return (
    <Container>
      <CategoryContainer>
        <ItemBox
          onClick={() => handleCategoryClick("GYM_CATEGORY_CODE")}
          active={activeCategory === "GYM_CATEGORY_CODE"}
        >
          <CategoryItem src={"/img/cgc.png"} alt="category Gym" />
          <p
            style={{
              fontSize: "10px",
              fontWeight: "700",
              margin: "0px 5.1px",
            }}
          >
            헬스장
          </p>
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
        // style={{ width: "100%", height: "45vh" }}
        style={{ width: "100%", height: "300px" }}
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
  /* border-radius: 2.5vh; */
  border-radius: 18.85px;
  background-color: #ffffff;
  /* gap: 1vh; */
  gap: 8.5px;
  /* padding: 1vh; */
  padding: 8.5px;
  position: absolute;
  align-items: center;
  justify-content: center;
  /* margin: 1vh; */
  margin: 8.5px;
  top: 10px;
  z-index: 10;
  box-shadow: 0 0 5px rgba(86, 86, 86, 0.5);
`;

const ItemBox = styled.div`
  background-color: ${({ active }) => (active ? "#217eef" : "#cde4ff")};
  border: solid 1px ${({ active }) => (active ? "#217eef" : "#cde4ff")};
  /* border-radius: 2vh; */
  border: 17px;
  display: flex;
  flex-direction: column;
  /* gap: 0.5vh; */
  gap: 4.25px;
  align-items: center;
  justify-content: center;
  /* padding: 1vh; */
  padding: 8.5px;
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
