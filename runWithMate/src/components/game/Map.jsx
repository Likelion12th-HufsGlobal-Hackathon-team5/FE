import React, { useEffect } from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import PointMarkerImg from '../../assets/images/pointMarker.png';

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

function Map() {
  useEffect(() => {
    const loadKakaoMapScript = () => {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=70b6406b2ded139d1c5117b59f7d6ab8&libraries=services`;
      script.async = true;
      script.onload = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(displayMap, showError);
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      };
      document.head.appendChild(script);
    };

    const displayMap = (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      const imageSrc = PointMarkerImg;  
      const imageSize = new window.kakao.maps.Size(64/2, 69/2); 
      // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) }; 

      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      const markerPosition = new window.kakao.maps.LatLng(lat, lng);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 마커이미지 설정 
      });
      marker.setMap(map);
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
  }, []);

  return <MapContainer id="map" />;
}

const StyledMap = styled(Map)`
  /* border: 2px solid red; */
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
