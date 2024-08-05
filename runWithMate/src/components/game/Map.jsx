import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ClipLoader from 'react-spinners/ClipLoader';
import showError from './map/showError';
import { loadKakaoMapScript, initializeMap, addMarkers } from './map/mapUtils';

const MapContainer = styled.div`
  width: 100%;
  height: 50%;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 24px;
  font-weight: bold;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export default function Map ({wsInstance, receivedData, handleBetPoint}) {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [map, setMap] = useState(null);
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
  const [pointBoxes, setPointBoxes] = useState([]);
  const [dopamineBoxes, setDopamineBoxes] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    loadKakaoMapScript(() => {
      initializeMap(setMap, setCurrentLocationMarker, pointBoxes, dopamineBoxes);
    });
  }, []);

  // 게임 시작여부 판단
  useEffect(() => {
    if (receivedData.type !== "start_check" || !map) return;
    if (receivedData.started) {
      const pointBoxesTransformed = transformBoxData(receivedData.point_boxes);
      const dopamineBoxesTransformed = transformBoxData(receivedData.dopamine_boxes);
      
      setPointBoxes(pointBoxesTransformed);
      setDopamineBoxes(dopamineBoxesTransformed);
      setIsGameStarted(receivedData.started);
      handleBetPoint(receivedData.bet_point);

      // 내 위치 1초마다 전송 -> 혹시 몰라서 intervalId 저장했음
      const intervalId = setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          wsInstance("update_position", { lat: latitude, lng: longitude });
        }, showError, { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
      }, 3000);
    }
  }, [receivedData, map]);

  useEffect(() => {
    if (map && isGameStarted) {
      addMarkers(map, pointBoxes, '/img/pp.png');
      addMarkers(map, dopamineBoxes, '/img/dp.png');
    }
  }, [map, isGameStarted, pointBoxes, dopamineBoxes]);

  // 위치 정보 받을때마다 내 위치 갱신
  useEffect(() => {
    if (receivedData.type !== "position_updated" || !isGameStarted) return;
    if (receivedData.user_id === userId){
      const newPosition = new window.kakao.maps.LatLng(receivedData.position.lat, receivedData.position.lng);
      currentLocationMarker.setPosition(newPosition);
      map.setCenter(newPosition);
    } else{
      // 다른 플레이어 마커 이동시켜야함!
    }
  }, [receivedData]);

  const transformBoxData = (boxes) => {
    return boxes.map(box => ({
      latlng: new window.kakao.maps.LatLng(box.lat, box.lng),
      title: box.title
    }));
  };

  return (
    <>
      {!isGameStarted && (
        <LoadingContainer>
          <ClipLoader color={"#217EEF"} loading={!isGameStarted} />
          로딩중입니다...
        </LoadingContainer>
      )}
      <MapContainer id="map"/>
    </>
  );
}