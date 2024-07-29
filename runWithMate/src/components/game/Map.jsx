import React, { useEffect, useState, useCallback } from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import useWebSocket from '../../hooks/useWebSocket';
import useStomp from '../../hooks/useStomp';

import PointMarkerImg from '../../assets/images/pointMarker.png';
import DopamineMarkerImg from '../../assets/images/dopamineMarker.png';

import ClipLoader from 'react-spinners/ClipLoader';


const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
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

const globalStyles = css`
  body {
    margin: 0;
  }
`;

const WEBSOCKET_URL = 'ws://api.runwithmate.klr.kr/connect';

function Map() {
  const [currentPosition, setCurrentPosition] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(true);
  // const { sendMessage } = useWebSocket(WEBSOCKET_URL);
  const { connected, stompClientRef, roomNumber } = useStomp();
  const location = useLocation();

  const updatePosition = useCallback(() => {
    if (location.pathname === '/game') {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
        // sendMessage({ lat: latitude, lng: longitude });
        // console.log(`latitude : ${latitude} longitude : ${longitude}`);
      
        if(connected){
          //stomp를 통해 메세지를 송신
          const stompClient=useStomp().stompClientRef.current;
          if(stompClient){
            stompClient.publish({destination:`/room/${roomNumber}`,body:JSON.stringify({lat:latitude,lng:longitude})});
          
            // 현재 위치와 마커들의 거리 비교
            findNearestMarker(latitude,longitude);
          }
        }

        console.log(`메세지 송신 - latitude : ${latitude} longitude : ${longitude}`)
      }, showError, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    }
  }, [location.pathname, connected, roomNumber, stompClientRef]);

  useEffect(() => {
    const loadKakaoMapScript = () => {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=70b6406b2ded139d1c5117b59f7d6ab8&libraries=services`;
      script.async = true;
      script.onload = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });
            displayMap(latitude, longitude);
          }, showError, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        } else {
          alert("위치 기능이 허용되지 않았거나, 현재 브라우저에서는 위치 기능을 제공하지 않습니다. ");
        }
      };
      document.head.appendChild(script);
    };

    loadKakaoMapScript();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updatePosition, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [updatePosition]);

  const displayMap = (lat, lng) => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);

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

    const pointMarkerImage = new window.kakao.maps.MarkerImage(
      PointMarkerImg,
      new window.kakao.maps.Size(32, 40.61),
      { offset: new window.kakao.maps.Point(16, 34.5) }
    );

    PointPositions.forEach(position => {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: position.latlng,
        title: position.title,
        image: pointMarkerImage
      });
      marker.setMap(map);
    });

    const dopaminMarkerImage = new window.kakao.maps.MarkerImage(
      DopamineMarkerImg,
      new window.kakao.maps.Size(32, 40.61),
      { offset: new window.kakao.maps.Point(16, 34.5) }
    );

    DopaminePositions.forEach(position => {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: position.latlng,
        title: position.title,
        image: dopaminMarkerImage
      });
      marker.setMap(map);
    });

    setLoading(false); // 맵이 로딩된 후 로딩 상태를 false로 변경
  };

  const findNearestMarker=(lat,lng)=>{
    console.log(`findNearestMarker 함수의 현재 위치 - latitude : ${lat} longitude:${lng}`)
    const Markers=[
      {
        title: '7팀 해커톤 장소~!',
        lat: 37.5351,
        lng: 126.9026
      },
      {
        title: '한국외국어대학교 글로벌캠퍼스 정문',
        lat: 37.3357,
        lng: 127.2558
      },
      {
        title: '한국외대 글캠 기숙사',
        lat: 37.3353,
        lng: 127.2626
      },
      {
        title: '한국외대 백년관',
        lat: 37.3376,
        lng: 127.2658
      },
      {
        title: '한국외대 공학관',
        lat: 37.3376,
        lng: 127.2678
      },
      {
        title: '한국외대 학생회관',
        lat: 37.3372,
        lng: 127.2698
      },
      {
        title: '도파민01',
        lat: 37.3355,
        lng: 127.2578
      },
      {
        title: '도파민02',
        lat: 37.3365,
        lng: 127.2644
      },
      {
        title: '도파민03',
        lat: 37.3368,
        lng: 127.267
      },
      {
        title: '도파민04',
        lat: 37.3377,
        lng: 127.2685
      }
    ];

    let nearestMarker=null;
    let minDistance=Infinity;

    Markers.forEach((marker)=>{
      const distance=getDistance(lat,lng,marker.lat,marker.lng);
      console.log(`거리 계산 : ${marker.title}까지의 거리 ${distance}`);
      if (distance<minDistance){
        minDistance=distance;
        nearestMarker=marker;
      }
    });

    if(nearestMarker){
      console.log(`가장 가까운 마커: ${nearestMarker.title}`);
    }
  };

  const getDistance = (lat1, lng1, lat2, lng2)=>{
    const toRadians = angle => angle * (Math.PI / 180);
    const dLat=toRadians(lat2-lat1);
    const dLng=toRadians(lng2-lng1);

    const a = Math.sin(dLat/2)**2+
      Math.cos(toRadians(lat1))*Math.cos(toRadians(lat2))*
      Math.sin(dLng/2)**2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const R = 6371

    return R*c;
  }

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("사용자가 위치 정보 요청을 거부했습니다.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("위치 정보를 사용할 수 없습니다.");
        break;
      case error.TIMEOUT:
        alert("사용자 위치를 가져오는 요청이 시간 초과되었습니다.");
        break;
      case error.UNKNOWN_ERROR:
        alert("알 수 없는 오류가 발생했습니다.");
        break;
      default:
        alert("알 수 없는 오류가 발생했습니다.");
        break;
    }
  };

  return (
    <>
      {loading && (
        <LoadingContainer>
          {/* <img src={"https://i.makeagif.com/media/5-04-2016/NFBED7.gif"} alt="Loading" style={{ marginBottom: '20px' }} /> */}
          <ClipLoader color={"#217EEF"} loading={true}/>
          로딩중입니다...
        </LoadingContainer>
      )}
      <MapContainer id="map">
        {currentPosition.lat && currentPosition.lng && (
          <div>
            <p>Latitude: {currentPosition.lat}</p>
            <p>Longitude: {currentPosition.lng}</p>
          </div>
        )}
      </MapContainer>
    </>
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