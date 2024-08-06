import axiosInstance from "../axiosInstance";

export default async () => {
    try {
        const response = await axiosInstance.post("/api/users/check");
        
        if (response.status === 302) {
            // 서버에서 제공한 리다이렉트 URL로 이동
            window.location.href = response.headers.location || response.data.redirectUrl;
            return;
        }

        const checkedAttendance = response.data.checkedAttendance; // 응답 데이터에서 출석 체크 여부 확인

        if (!checkedAttendance) {
            return {
                status: "success",
                type: "modal",
                message: "성공적으로 출석체크되었습니다."
            };
        } else if (checkedAttendance) {
            return {
                status: "success",
                type: "modal",
                message: "이미 출석체크가 완료되었습니다."
            };
        }
        
        return response.data;
    } catch (error) {
        alert('postAttendance - error');
        throw error;
    }
};
