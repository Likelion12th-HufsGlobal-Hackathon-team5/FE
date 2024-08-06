import mockPointBoxes from '../../../server/inGame/mockPointBoxes';
import mockDopamineBoxes from '../../../server/inGame/mockDopamineBoxes';
import showError from './showError';

export const loadKakaoMapScript = (callback) => {
  const kakaoAppKey = import.meta.env.VITE_KAKAO_APP_KEY;

  if (!document.getElementById('kakao-map-script')) {
    const script = document.createElement('script');
    script.id = 'kakao-map-script';
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoAppKey}&libraries=services`;
    script.async = true;
    script.onload = callback;
    document.head.appendChild(script);
  } else {
    callback();
  }
};

export const initializeMap = (setMap, setCurrentLocationMarker, setLoading) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 4,
      };
      console.log('지도 초기화 시작');
      const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(newMap);

      console.log('현재 위치 마커 생성');
      const currentMarker = new window.kakao.maps.Marker({
        map: newMap,
        // position: new window.kakao.maps.LatLng(latitude, longitude),
        title: localStorage.getItem('userId'),
      });
      setCurrentLocationMarker(currentMarker);

      // addMarkers(newMap, mockPointBoxes, '/img/pp.png');
      // addMarkers(newMap, mockDopamineBoxes, '/img/dp.png');

      setLoading(false);
      console.log('지도 초기화 완료');
    }, showError, { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 });
  }
};

export const addMarkers = (map, setMarkers, markerData, markerImageSrc) => {
  const markerImage = new window.kakao.maps.MarkerImage(
    markerImageSrc,
    new window.kakao.maps.Size(32.8, 48),
    { offset: new window.kakao.maps.Point(16, 34.5) }
  );

  markerData.forEach(position => {
    const newMarker = new window.kakao.maps.Marker({
      map: map,
      position: position.latlng,
      title: position.title,
      image: markerImage,
    });
    setMarkers(prev => [...prev, newMarker]);
  });
};
