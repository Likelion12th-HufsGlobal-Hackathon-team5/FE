import React, { useEffect } from 'react';
import styled from '@emotion/styled';

import GameMarker from '../assets/images/gameMarker.png';
import PointMarker from '../assets/images/pointMarker.png';

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
        // 카카오 맵 스크립트가 로드되어야 합니다.
        if (window.kakao && window.kakao.maps) {
            const mapContainer = document.getElementById('map');
            const mapOption = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
                // draggable:true,
                // scrrollwheel:true,
                // disabledoubleClick:false,
                // disableDoubleClickZoom:false,
            };
            // new window.kakao.maps.Map(mapContainer, mapOption);
            var map = new kakao.maps.Map(mapContainer, mapOption);

            var imageSrc={PointMarker},
                imageSize=new kakao.maps.Size(64,69),
                imageOption={offset:new kakao.maps.Point(27,69)}
            
            var markerImage=new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
                markerPosition = new kakao.maps.LatLng(33.450701, 126.570667)

            // 마커가 표시될 위치
            var markerPosition=new kakao.maps.LatLng(33.450701, 126.570667);

            var marker=new kakao.maps.Marker({
                position:markerPosition,
                image:markerImage
            });

            // 마커가 지도 위에 표시되도록 설정합니다.
            marker.setMap(map);
        }else {
            console.error('카카오 맵 API가 로드되지 않았습니다.');
        }
    }, []);

    return (
        <Container>
            <MapContainer id="map" />
        </Container>
    );
}

export default Test;
