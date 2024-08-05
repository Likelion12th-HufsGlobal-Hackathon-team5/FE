import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ClipLoader from 'react-spinners/ClipLoader';
import showError from './map/showError';
import { loadKakaoMapScript, initializeMap, addMarkers } from './map/mapUtils';
import useWsInstance from '../../hooks/useWsInstance';

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

export default function Map () {
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState(null);
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
  const [receivedData, setReceivedData] = useState(null);

  const { wsInstance, connected, disconnect } = useWsInstance(setReceivedData);

  useEffect(() => {
    loadKakaoMapScript(() => {
      initializeMap(setMap, setCurrentLocationMarker, setLoading);
    });
  }, []);

  useEffect(() => {
    if (!map || !currentLocationMarker){
      return;
    }
    const intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const newPosition = new window.kakao.maps.LatLng(latitude, longitude);

        currentLocationMarker.setPosition(newPosition);
        map.setCenter(newPosition);
      }, showError, { enableHighAccuracy: true, timeout: 1000, maximumAge: 0 });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [map, currentLocationMarker]);


  return (
    <>
      {loading && (
        <LoadingContainer>
          <ClipLoader color={"#217EEF"} loading={true} />
          로딩중입니다...
        </LoadingContainer>
      )}
      <MapContainer id="map"/>
    </>
  );
}