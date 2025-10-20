// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // Certifique-se de que o backend está rodando nessa porta
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
