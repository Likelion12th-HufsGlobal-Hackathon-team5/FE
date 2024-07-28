import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import CategoryGym from "../../assets/images/cg.png";
import CategoryPilates from "../../assets/images/cp.png";

function CategoryMap() {
  const [map, setMap] = useState(null); // 카카오 맵 인스턴스를 저장하는 상태
  const [placeOverlay, setPlaceOverlay] = useState(null); // 장소 정보를 표시할 오버레이를 저장하는 상태
  const [markers, setMarkers] = useState([]); // 마커를 저장하는 상태
  const [currCategory, setCurrCategory] = useState(""); // 현재 선택된 카테고리를 저장하는 상태
  const [ps, setPs] = useState(null); // 장소 검색 서비스 인스턴스를 저장하는 상태

  useEffect(() => {
    // 카카오 맵 스크립트를 동적으로 추가하여 맵 초기화
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=70b6406b2ded139d1c5117b59f7d6ab8&libraries=services,clusterer,drawing";
    script.async = true;
    script.onload = initializeMap; // 스크립트 로드 후 initializeMap 함수 호출
    document.head.appendChild(script);
  }, []);

  function initializeMap() {
    // 맵 초기화 함수
    const container = document.getElementById("map"); // 맵을 표시할 DOM 요소
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 맵의 중심 좌표
      level: 5, // 맵 확대 레벨
    };
    const map = new kakao.maps.Map(container, options); // 카카오 맵 인스턴스 생성
    setMap(map); // 상태 업데이트

    const ps = new kakao.maps.services.Places(map); // 장소 검색 서비스 인스턴스 생성
    setPs(ps); // 상태 업데이트

    const overlay = new kakao.maps.CustomOverlay({ zIndex: 1 }); // 커스텀 오버레이 생성
    const contentNode = document.createElement("div"); // 오버레이에 들어갈 내용 노드 생성
    contentNode.className = "placeinfo_wrap"; // 클래스 이름 설정
    overlay.setContent(contentNode); // 오버레이에 내용 설정
    setPlaceOverlay(overlay); // 상태 업데이트

    kakao.maps.event.addListener(map, "idle", () =>
      searchPlaces(ps, overlay, map, currCategory)
    ); // 맵이 idle 상태일 때 장소 검색
  }

  function searchPlaces(ps, overlay, map, category) {
    // 장소 검색 함수
    if (!category) return; // 카테고리가 없으면 종료
    overlay.setMap(null); // 오버레이 제거
    removeMarker(); // 기존 마커 제거
    ps.categorySearch(
      category,
      (data, status) => {
        // 카테고리로 장소 검색
        if (status === kakao.maps.services.Status.OK) {
          displayPlaces(data, overlay, map); // 검색 결과 표시
        }
      },
      { useMapBounds: true }
    ); // 맵의 경계 내에서만 검색
  }

  function displayPlaces(places, overlay, map) {
    // 검색된 장소를 맵에 표시하는 함수
    const newMarkers = places.map((place, index) => {
      const marker = addMarker(
        new kakao.maps.LatLng(place.y, place.x),
        index,
        map
      ); // 마커 추가
      kakao.maps.event.addListener(marker, "click", () =>
        displayPlaceInfo(place, overlay)
      ); // 마커 클릭 시 장소 정보 표시
      return marker; // 생성된 마커 반환
    });
    setMarkers(newMarkers); // 상태 업데이트
  }

  function addMarker(position, order, map) {
    // 마커를 추가하는 함수
    const imageSrc = <CategoryGym />; // 마커 이미지 소스
    const imageSize = new kakao.maps.Size(27, 28); // 마커 이미지 크기
    const imgOptions = {
      spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지 크기
      spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트에서 마커의 시작 위치
      offset: new kakao.maps.Point(11, 28), // 마커의 오프셋
    };
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions
    ); // 마커 이미지 생성
    const marker = new kakao.maps.Marker({
      position, // 마커 위치
      image: markerImage, // 마커 이미지
    });
    marker.setMap(map); // 맵에 마커 추가
    return marker; // 생성된 마커 반환
  }

  function removeMarker() {
    // 마커를 제거하는 함수
    markers.forEach((marker) => marker.setMap(null)); // 모든 마커를 맵에서 제거
    setMarkers([]); // 상태 업데이트
  }

  function displayPlaceInfo(place, overlay) {
    // 장소 정보를 오버레이에 표시하는 함수
    const contentNode = overlay.getContent(); // 오버레이의 콘텐츠 노드 가져오기
    let content = `<div class="placeinfo">
    <a class="title" href="${place.place_url}" target="_blank" title="${place.place_name}">${place.place_name}</a>`; // 장소 제목

    if (place.road_address_name) {
      content += `<span title="${place.road_address_name}">${place.road_address_name}</span>
      <span class="jibun" title="${place.address_name}">(지번 : ${place.address_name})</span>`;
    } else {
      content += `<span title="${place.address_name}">${place.address_name}</span>`;
    }

    content += `<span class="tel">${place.phone}</span></div><div class="after"></div>`; // 전화번호 추가
    contentNode.innerHTML = content; // 콘텐츠 노드에 내용 설정
    overlay.setPosition(new kakao.maps.LatLng(place.y, place.x)); // 오버레이 위치 설정
    overlay.setMap(map); // 맵에 오버레이 추가
  }

  function handleCategoryClick(category) {
    // 카테고리 클릭 핸들러
    if (category === currCategory) {
      setCurrCategory(""); // 같은 카테고리 클릭 시 선택 해제
      removeMarker(); // 마커 제거
      placeOverlay.setMap(null); // 오버레이 제거
    } else {
      setCurrCategory(category); // 선택된 카테고리 업데이트
      searchPlaces(ps, placeOverlay, map, category); // 선택된 카테고리로 장소 검색
    }
  }

  return (
    <Container>
      <CategoryContainer>
        <ItemBox>
          <CategoryItem
          src={CategoryGym}
          alt="category Gym"
          onClick={() => handleCategoryClick("GYM_CATEGORY_CODE")}
        />
        <p style={{ fontSize: "10px", fontWeight: "700", margin: "0vh 0.624vh"}}>헬스장</p>
        </ItemBox>
        <ItemBox>
          <CategoryItem
          src={CategoryPilates}
          alt="category Pilates"
          onClick={() => handleCategoryClick("PILATES_CATEGORY_CODE")}
        />
        <p style={{ fontSize: "10px", fontWeight: "700"}}>필라테스</p>
        </ItemBox>
        
      </CategoryContainer>
      <MapContainer
        id="map"
        style={{ width: "100%", height: "40vh" }}
      ></MapContainer>
    </Container>
  );
}

export default CategoryMap;

const Container = styled.div`
  /* width: 100%; */
  /* height: 100%; */
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
  border-radius: 20%;
  background-color: #ffffff;
  gap: 1vh;
  padding: 1vh;
  position: absolute;
  align-items: center;
  justify-content: center;
  margin: 1vh;
  top: 10px;
  z-index: 10;

  img {
  }
`;

const ItemBox = styled.div`
  background-color: #CDE4FF;
  border: solid 1px #CDE4FF;
  border-radius: 20%;
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
  align-items: center;
  justify-content: center;
  padding: 1vh;
  color: #2e2929;
  cursor: pointer;
  
  &:hover {
    background-color: #1B63BB;
    color: #ffffff;
    border: solid 1px #1B63BB;
  }

  &:active {
    background-color: #217EEF;
    color: #ffffff;
    border: solid 1px #217EEF;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
`

const CategoryItem = styled.img`
  cursor: pointer;
  width: 30px;
  height: auto;
  
`;
