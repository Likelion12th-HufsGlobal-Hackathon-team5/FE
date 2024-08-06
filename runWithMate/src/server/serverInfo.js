// 로컬 개발이면 false, 서버 배포시 true 로 설정해주세요!
const isProduction = true;

// 하단 수정 금지
const defaultAddress = isProduction ? "api.runwithmate.klr.kr" : "localhost:8080";
export const serverIp = (isProduction ? "https" : "http") +`://${defaultAddress}`;
export const wsIp = (isProduction ? "wss" : "ws") + `://${defaultAddress}`;
