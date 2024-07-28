import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import CategoryGym from '../../assets/images/cg.png';
import CategoryPilates from '../../assets/images/cp.png';

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
  justify-content: space-around;
  position: absolute;
  top: 10px;
  width: 100%;
  z-index: 10;

  img{
    
  }
`;

const CategoryItem = styled.img`
  cursor: pointer;
  width: 30px;
    height: auto;
`;

function CategoryMap() {
  const [map, setMap] = useState(null);
  const [placeOverlay, setPlaceOverlay] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [currCategory, setCurrCategory] = useState('');
  const [ps, setPs] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=70b6406b2ded139d1c5117b59f7d6ab8&libraries=services,clusterer,drawing';
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);
  }, []);

  function initializeMap() {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);
    setMap(map);

    const ps = new kakao.maps.services.Places(map);
    setPs(ps);

    const overlay = new kakao.maps.CustomOverlay({ zIndex: 1 });
    const contentNode = document.createElement('div');
    contentNode.className = 'placeinfo_wrap';
    overlay.setContent(contentNode);
    setPlaceOverlay(overlay);

    kakao.maps.event.addListener(map, 'idle', () => searchPlaces(ps, overlay, map, currCategory));
  }

  function searchPlaces(ps, overlay, map, category) {
    if (!category) return;
    overlay.setMap(null);
    removeMarker();
    ps.categorySearch(category, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        displayPlaces(data, overlay, map);
      }
    }, { useMapBounds: true });
  }

  function displayPlaces(places, overlay, map) {
    const newMarkers = places.map((place, index) => {
      const marker = addMarker(new kakao.maps.LatLng(place.y, place.x), index, map);
      kakao.maps.event.addListener(marker, 'click', () => displayPlaceInfo(place, overlay));
      return marker;
    });
    setMarkers(newMarkers);
  }

  function addMarker(position, order, map) {
    // const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png';
    // const imageSrc = `${CategoryGym}`;
    const imageSrc = <CategoryGym />;
    const imageSize = new kakao.maps.Size(27, 28);
    const imgOptions = {
      spriteSize: new kakao.maps.Size(72, 208),
      spriteOrigin: new kakao.maps.Point(46, order * 36),
      offset: new kakao.maps.Point(11, 28),
    };
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
    const marker = new kakao.maps.Marker({
      position,
      image: markerImage,
    });
    marker.setMap(map);
    return marker;
  }

  function removeMarker() {
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
  }

  function displayPlaceInfo(place, overlay) {
    const contentNode = overlay.getContent();
    let content = `<div class="placeinfo">
      <a class="title" href="${place.place_url}" target="_blank" title="${place.place_name}">${place.place_name}</a>`;

    if (place.road_address_name) {
      content += `<span title="${place.road_address_name}">${place.road_address_name}</span>
        <span class="jibun" title="${place.address_name}">(지번 : ${place.address_name})</span>`;
    } else {
      content += `<span title="${place.address_name}">${place.address_name}</span>`;
    }
    
    content += `<span class="tel">${place.phone}</span></div><div class="after"></div>`;
    contentNode.innerHTML = content;
    overlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
    overlay.setMap(map);
  }

  function handleCategoryClick(category) {
    if (category === currCategory) {
      setCurrCategory('');
      removeMarker();
      placeOverlay.setMap(null);
    } else {
      setCurrCategory(category);
      searchPlaces(ps, placeOverlay, map, category);
    }
  }

  return (
    <Container>
      <CategoryContainer>
        <CategoryItem src={CategoryGym} alt="category Gym" onClick={() => handleCategoryClick('GYM_CATEGORY_CODE')} />
        <CategoryItem src={CategoryPilates} alt="category Pilates" onClick={() => handleCategoryClick('PILATES_CATEGORY_CODE')} />
      </CategoryContainer>
      <MapContainer id="map"></MapContainer>
    </Container>
  );
}

export default CategoryMap;
