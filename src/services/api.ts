import axios from "axios";

const api = axios.create({
  baseURL: "https://bemetricsappdev.b2ktech.com.br/api/",
});

export default api;
