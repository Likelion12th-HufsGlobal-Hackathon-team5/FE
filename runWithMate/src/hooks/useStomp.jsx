import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import axios from 'axios';

const WEBSOCKET_URL = 'wss://api.runwithmate.klr.kr/connect'; // WebSocket 서버 URL

const UseStomp = () => {
  const [connected, setConnected] = useState(false);
  const [roomNumber, setRoomNumber] = useState(null);

  useEffect(() => {
    // 방 생성 요청을 보내고 방 번호를 받아옴
    const createRoom = async () => {
      try {
        const response = await axios.post('https://api.runwithmate.klr.kr/createroom'); // 백엔드의 방 생성 엔드포인트
        setRoomNumber(response.data.roomNumber); // 응답에서 방 번호 설정
      } catch (error) {
        console.error('방 생성 실패:', error);
      }
    };

    createRoom();
  }, []);

  useEffect(() => {
    if (!roomNumber) return;

    // STOMP 클라이언트 생성
    const stompClient = new Client({
      brokerURL: WEBSOCKET_URL,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // STOMP 연결 성공 시 호출되는 함수
    stompClient.onConnect = () => {
      console.log('웹소켓 연결됨');
      setConnected(true);

      // 특정 주제(채팅 방)를 구독
      stompClient.subscribe('/room/${roomNumber}', (message) => {
        console.log('받은 메시지:', message.body);
      });
    };

    // STOMP 에러 발생 시 호출되는 함수
    stompClient.onStompError = (frame) => {
      console.error('STOMP 에러:', frame);
    };

    // WebSocket 연결 종료 시 호출되는 함수
    stompClient.onWebSocketClose = () => {
      console.log('웹소켓 연결 끊김');
      setConnected(false);
    };

    // STOMP 클라이언트 활성화
    stompClient.activate();

    // 컴포넌트 언마운트 시 STOMP 클라이언트 비활성화
    return () => {
      stompClient.deactivate();
    };
  }, [roomNumber]); // roomNumber가 설정된 후에만 WebSocket 연결 시도

  return (
    <div>
      <h1>웹소켓 상태: {connected ? '연결됨' : '연결 안 됨'}</h1>
      <h2>방 번호: {roomNumber}</h2>
    </div>
  );
};

export default UseStomp;
