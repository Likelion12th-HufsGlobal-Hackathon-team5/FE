import axiosInstance from "../axiosInstance";

export default async () => {
    try {
        const response = await axiosInstance.post("/api/games/join");
        return response.data;
    } catch (error) {
        throw error;
    }
};