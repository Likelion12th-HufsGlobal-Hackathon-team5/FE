import { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'

const Container=styled.div``;

function Game(){
    // const [position, setPosition]=useState([]);
    // const mapRef=useRef(null);
    // const map=useRef(null);

    // useEffect(()=>{
    //     //websocket 초기화
    //     const ws = new Websocket('ws URL')

    //     ws.onmessage=(message)=>{
    //         const data=JSON.parse(message.data);
    //         setPosition((prevPosition)=>[...prevPositions,{ lat:data.lat, lng: data.lng}]);
    //     };

    //     //websocket종료시
    //     return () => {
    //         ws.close();
    //     };
    // },[]);

    // useEffect(()=>{
    //     //kakao map 초기화
    //     if (mapRef.current){
    //         map.current=new window.kakao.maps.Map(mapRef.current,{
    //             center : new window.kakao.maps.LatLng(33.450701, 126.570667),
    //             level:3,
    //         });
    //     }
    // },[]);

    // useEffect(()=>{
    //     if (map.current){
    //         position.forEach((position)=>{
    //             const marker = new window.kakao.maps.Marker({
    //                 position:new window.kakao.maps.LatLng(position.lat,position.lng),
    //                 map:map.current,
    //             });
    //         });
    //     }
    // },[positions]);

    return(
        <>
            <Container>
                game 페이지
                {/* <div ref={mapRef} style={{width:'100%', height:"100vh"}} /> */}
            </Container>
        </>
    )
}

export default Game;