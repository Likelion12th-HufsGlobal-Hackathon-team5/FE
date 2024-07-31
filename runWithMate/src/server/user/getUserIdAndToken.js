import axiosInstance from "../axiosInstance";

export default async () => {
    try {
        const response = await axiosInstance.get("/myinfo");
        return response.data;
    } catch (error) {
        throw error;
    }
};

// 현재 cookie를 통해 서버에서 사용자 정보 추출중임
// 나중에 Header 추출 방식 생성하면 로직 고민 필요
// 그 때는 Header에서 먼저 값을 빼오려고 할 텐데, 이 로직은 cookie에서 Header에 넣을 값을 추출하기 때문.