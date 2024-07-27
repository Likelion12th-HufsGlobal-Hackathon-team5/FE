import React, { useEffect, useState } from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import useWebSocket from '../../hooks/useWebSocket';

import PointMarkerImg from '../../assets/images/pointMarker.png';
import DopamineMarkerImg from '../../assets/images/dopamineMarker.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const globalStyles = css`
  body {
    margin: 0;
  }
`;

const WEBSOCKET_URL = 'ws://your-websocket-url'; // Replace with your actual WebSocket URL

function Map() {
  const [currentPosition, setCurrentPosition] = useState({ lat: null, lng: null });
  const { sendMessage } = useWebSocket(WEBSOCKET_URL);
  const location = useLocation(); // 현재 경로를 감지

  useEffect(() => {
    let intervalId;

    const loadKakaoMapScript = () => {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=70b6406b2ded139d1c5117b59f7d6ab8&libraries=services`;
      script.async = true;
      script.onload = () => {
        if (navigator.geolocation) {
          const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });
            displayMap(latitude, longitude);
          }, showError, options);

          // 위치 정보를 주기적으로 업데이트
          intervalId = setInterval(() => {
            if (location.pathname === '/game') {
              navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({ lat: latitude, lng: longitude });
                sendMessage({ lat: latitude, lng: longitude });
                console.log(`latitude : ${latitude} longitude : ${longitude}`);
              }, showError, options);
            } else {
              // 위치 정보 출력이 필요 없는 경우도 포함
              console.log(`Current path is not /game. Location info not displayed.`);
            }
          }, 1000); // 1초마다 업데이트
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      };
      document.head.appendChild(script);
    };

    const displayMap = (lat, lng) => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      // 현재 위치 마커 추가
      const currentLocationMarker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(lat, lng),
        title: '현재 위치'
      });
      currentLocationMarker.setMap(map);

      const PointPositions = [
        {
          title: '한국외국어대학교 글로벌캠퍼스 정문',
          latlng: new window.kakao.maps.LatLng(37.3357, 127.2558)
        },
        {
          title: '한국외대 글캠 기숙사',
          latlng: new window.kakao.maps.LatLng(37.3353, 127.2626)
        },
        {
          title: '한국외대 백년관',
          latlng: new window.kakao.maps.LatLng(37.3376, 127.2658)
        },
        {
          title: '한국외대 공학관',
          latlng: new window.kakao.maps.LatLng(37.3376, 127.2678)
        },
        {
          title: '한국외대 학생회관',
          latlng: new window.kakao.maps.LatLng(37.3372, 127.2698)
        }
      ];

      const DopaminePositions = [
        {
          title: '도파민01',
          latlng: new window.kakao.maps.LatLng(37.3355, 127.2578)
        },
        {
          title: '도파민02',
          latlng: new window.kakao.maps.LatLng(37.3365, 127.2644)
        },
        {
          title: '도파민03',
          latlng: new window.kakao.maps.LatLng(37.3368, 127.267)
        },
        {
          title: '도파민04',
          latlng: new window.kakao.maps.LatLng(37.3377, 127.2685)
        }
      ];

      const pointImageSrc = PointMarkerImg;
      const pointImageSize = new window.kakao.maps.Size(32, 40.61);
      const pointImageOption = { offset: new window.kakao.maps.Point(16, 34.5) };

      const pointMarkerImage = new window.kakao.maps.MarkerImage(pointImageSrc, pointImageSize, pointImageOption);

      for (let i = 0; i < PointPositions.length; i++) {
        const pointMarker = new window.kakao.maps.Marker({
          map: map,
          position: PointPositions[i].latlng,
          title: PointPositions[i].title,
          image: pointMarkerImage
        });
        pointMarker.setMap(map);
      }

      const dopaminImageSrc = DopamineMarkerImg;
      const dopaminImageSize = new window.kakao.maps.Size(32, 40.61);
      const dopaminImageOption = { offset: new window.kakao.maps.Point(16, 34.5) };

      const dopaminMarkerImage = new window.kakao.maps.MarkerImage(dopaminImageSrc, dopaminImageSize, dopaminImageOption);

      for (let i = 0; i < DopaminePositions.length; i++) {
        const dopaminMarker = new window.kakao.maps.Marker({
          map: map,
          position: DopaminePositions[i].latlng,
          title: DopaminePositions[i].title,
          image: dopaminMarkerImage
        });
        dopaminMarker.setMap(map);
      }
    };

    const showError = (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
        default:
          alert("An unknown error occurred.");
          break;
      }
    };

    loadKakaoMapScript();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [sendMessage, location.pathname]); // location.pathname을 의존성 배열에 추가

  return (
    <MapContainer id="map">
      {currentPosition.lat && currentPosition.lng && (
        <div>
          <p>Latitude: {currentPosition.lat}</p>
          <p>Longitude: {currentPosition.lng}</p>
        </div>
      )}
    </MapContainer>
  );
}

const StyledMap = styled(Map)`
  height: 50%;
`;

function App() {
  return (
    <Container>
      <Global styles={globalStyles} />
      <StyledMap />
    </Container>
  );
}

export default App;
