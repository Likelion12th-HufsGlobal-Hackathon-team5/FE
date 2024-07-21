import React, { useEffect } from 'react';
import styled from '@emotion/styled';

// import GameMarker from '../assets/images/gameMarker.png';
// import PointMarker from '../assets/images/pointMarker.png';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;  // 예를 들어, 높이를 설정합니다.
`;

const MapContainer = styled.div`
    width: 100%;
    height: 100vh;  // 적절한 높이를 설정합니다.

    position: relative;
`;

function Test() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=70b6406b2ded139d1c5117b59f7d6ab8&autoload=false`;
        script.async = true;
        document.head.appendChild(script);
    
        script.onload = () => {
          window.kakao.maps.load(() => {
            const mapContainer = document.getElementById('map');
            
            if (!mapContainer) {
                console.error('Map container not found');
                return;
            }
            
            const mapCenter = new window.kakao.maps.LatLng(33.450701, 126.570667);
            const mapOption = {
              center: mapCenter,
              level: 3,
            };
            const map = new window.kakao.maps.Map(mapContainer, mapOption);
          
            // 지도 크기 변경 후 다시 렌더링
            window.addEventListener('resize',()=>{
                map.relayout();
                console.log('rerendering')
            });

            // 지도가 보이지 않다가 보이게 될 떄 relayout 호출
            const observer=new MutationObserver(()=>{
                map.relayout();
            });
            observer.observe(mapContainer, {
                attributes:true, 
                // childList:true, 
                // subtree:true
            });
        });
        };
    
        return () => {
        //   document.head.removeChild(script);
          console.log('잉')
        };
      }, []);

    return (
        <Container>
            <MapContainer id="map" />
        </Container>
    );
}

export default Test;
