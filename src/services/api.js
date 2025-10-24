// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://cadastro-api-dr5y.onrender.com/usuarios", // Backend hospedado no Render
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
