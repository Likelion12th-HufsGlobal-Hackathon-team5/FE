import { useEffect, useState, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import axios from 'axios';

const WEBSOCKET_URL = 'ws://api.runwithmate.klr.kr/connect'; // WebSocket 서버 URL

const UseStomp = () => {
  const [connected, setConnected] = useState(false);
  const [roomNumber, setRoomNumber] = useState(null);

  const stompClientRef = useRef(null);

  const createRoom = useCallback(async () => {
    try {
      const response = await axios.post('http://api.runwithmate.klr.kr/createroom'); // 백엔드의 방 생성 엔드포인트
      setRoomNumber(response.data.roomNumber); // 응답에서 방 번호 설정
    } catch (error) {
      console.error('useStomp.jsx - 방 생성 실패:', error);
    }
  }, []); // useCallback에 빈 배열을 넣어주어 함수의 의존성을 관리

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
      console.log('웹소켓 연결됨!!!');
      setConnected(true);

      // 특정 주제(채팅 방)를 구독
      stompClient.subscribe(`/room/${roomNumber}`, (message) => {
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

    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [roomNumber]);

  const disconnect = useCallback(() => {
    if (stompClientRef.current) {
      console.log('웹소켓 안녕~잘가~');
      stompClientRef.current.deactivate();
      setConnected(false);
    }
  }, []);

  return { connected, roomNumber, disconnect, createRoom };
};

export default UseStomp;
