import axios from "axios";

// Substitua esta URL pela URL pública do seu backend hospedado
const api = axios.create({
  baseURL: "https://seu-backend-hospedado.com", // Exemplo: https://cadastro-api.onrender.com
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
