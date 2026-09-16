import axios from "axios";

const apiBaseUrl =
    import.meta.env.VITE_API_URL ||
    `http://${window.location.hostname || "localhost"}:8000`;

const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;