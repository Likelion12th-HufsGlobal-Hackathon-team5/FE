import React, { useEffect } from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

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

      const markerPosition = new window.kakao.maps.LatLng(lat, lng);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
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
  /* border: 2px solid red;  */
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
