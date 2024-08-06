import axiosInstance from "../axiosInstance";

export default async () => {
    const response = await axiosInstance.get('/api/users/point');
    return response.data;
}