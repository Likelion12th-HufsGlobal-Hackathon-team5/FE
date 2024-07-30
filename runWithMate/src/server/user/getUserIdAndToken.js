import axiosInstance from "../axiosInstance";

export default async () => {
    try {
        const response = await axiosInstance.get("/myinfo");
        return response.data;
    } catch (error) {
        throw error;
    }
};