import { useCallback } from "react";
import UseStomp from "./useStomp";

// 인자로 받은 setReceivedData를 사용하여 수신된 데이터를 저장하는 커스텀 훅입니당~
export default function useWsInstance(setReceivedData) {
  // 수신 함수
  const onMessageReceived = (message) => {
    setReceivedData(JSON.parse(message.body));
  };

  const { connected, send, disconnect }=UseStomp(onMessageReceived);

  // 송신 함수
  const wsInstance = useCallback((wsMethod, data) => {
    if (connected) {
      send(`/send/${wsMethod}/${localStorage.getItem('roomId')}`, {}, JSON.stringify(data));
    }
  }, [connected, send]);
  return { wsInstance, connected, disconnect };
}