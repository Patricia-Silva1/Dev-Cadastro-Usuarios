// src/services/api.js
import axios from "axios";

// Cria instância do Axios com a baseURL do backend no Render
const api = axios.create({
  baseURL: "https://cadastro-api-dr5y.onrender.com",
  timeout: 5000, // tempo limite de 5s para requisições
});

export default api;
