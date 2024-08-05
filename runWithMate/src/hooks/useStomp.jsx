import { useEffect, useState, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import { wsIp } from '../server/serverInfo';

const WEBSOCKET_URL = `${wsIp}/connect`; // WebSocket 서버 URL

const UseStomp = (onMessageReceived) => {
  const [connected, setConnected] = useState(false);
  const stompClientRef = useRef(null);

  useEffect(() => {
    const roomId = localStorage.getItem('roomId');
    const accessToken = localStorage.getItem('accessToken');
    if (!roomId || !accessToken) return;

    // STOMP 클라이언트 생성
    const stompClient = new Client({
      brokerURL: WEBSOCKET_URL,
      connectHeaders: {
        Authorization: accessToken,
      },
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      // heartbeatIncoming: 4000,
      // heartbeatOutgoing: 4000,
    });

    // STOMP 연결 성공 시 호출되는 함수
    stompClient.onConnect = () => {
      console.log('웹소켓 연결됨!!!');
      setConnected(true);

      // 특정 주제(채팅 방)를 구독
      stompClient.subscribe(`/room/${roomId}`, (message) => {
        console.log('받은 메시지:', message.body);
        const getMessage=message.body;
        // localStorage.setItem('getMessage',JSON.parse(message.body));
        // localStorage.setItem('useStomp-getMessage',JSON.stringify(message.body));
        localStorage.setItem('useStomp-getMessage',JSON.parse(message.body));
        // if (onMessageReceived) onMessageReceived(message);
        if (onMessageReceived) onMessageReceived(getMessage);
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
  }, []);

  const send = useCallback((destination, headers = {}, body = '') => {
    if (stompClientRef.current && connected) {
      stompClientRef.current.publish({ destination, headers, body });
    }
  }, [connected]);


  const disconnect = useCallback(() => {
    if (stompClientRef.current) {
      console.log('웹소켓 안녕~잘가~');
      stompClientRef.current.deactivate();
      setConnected(false);
    }
  }, []);

  return { connected, send, disconnect };
};

export default UseStomp;
