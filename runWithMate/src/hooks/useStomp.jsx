// useStomp.js
import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import axios from 'axios';

const WEBSOCKET_URL = 'ws://api.runwithmate.klr.kr/connect';

const useStomp = () => {
  const [connected, setConnected] = useState(false);
  const [roomNumber, setRoomNumber] = useState(null);
  const [stompClient, setStompClient] = useState(null);

  const createRoom = async () => {
    try {
      const response = await axios.post('http://api.runwithmate.klr.kr/api/games/join');
      const roomNum = response.data.roomNumber;
      setRoomNumber(roomNum);
      connectWebSocket(roomNum);
      console.log('방 요청 POST 성공~!')
    } catch (error) {
      console.error('방 생성 실패:', error);
    }
  };

  const connectWebSocket = (roomNum) => {
    const client = new Client({
      brokerURL: WEBSOCKET_URL,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log('웹소켓 연결됨');
      setConnected(true);

      client.subscribe(`/room/${roomNum}`, (message) => {
        console.log('받은 메시지:', message.body);
      });
    };

    client.onStompError = (frame) => {
      console.error('STOMP 에러:', frame);
    };

    client.onWebSocketClose = () => {
      console.log('웹소켓 연결 끊김');
      setConnected(false);
    };

    client.activate();
    setStompClient(client);
  };

  useEffect(() => {
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [stompClient]);

  return { connected, roomNumber, createRoom };
};

export default useStomp;
