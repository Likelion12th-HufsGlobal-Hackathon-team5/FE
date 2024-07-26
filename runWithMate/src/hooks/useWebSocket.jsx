import { useEffect, useRef } from 'react';

const useWebSocket = (url) => {
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.current.onclose = (e) => {
            console.log('WebSocket connection closed', e);
        };

        ws.current.onerror = (e) => {
            console.error('WebSocket error', e);
        };

        return () => {
            ws.current.close();
        };
    }, [url]);

    const sendMessage = (message) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(message));
        }
    };

    const closeWebSocket = () => {
        if (ws.current){
            ws.current.close();
        }
    };

    return { sendMessage,closeWebSocket };
};

export default useWebSocket;
