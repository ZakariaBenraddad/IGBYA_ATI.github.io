import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (email, password) => {
    return axios.post("/api/admin/login", { email, password });
};

export const logout = () => {
    return axios.post("/api/admin/logout");
};

// Add other API methods here
