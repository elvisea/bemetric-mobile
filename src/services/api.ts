import axios from "axios";

const api = axios.create({
  baseURL: "https://bemetricsappdev.b2ktech.com.br:8000/api",
});

export default api;
