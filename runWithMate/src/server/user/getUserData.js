import axiosInstance from "../axiosInstance";

export default async () => {
    try {
        const response = await axiosInstance.get("/user");
        return response.data;
    } catch (error) {
        console.error("getUserData : Error fetching user data:", error);
        throw error;
    }
}