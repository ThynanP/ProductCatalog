// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5287/api', // Ajuste a porta se necessário
});
// Interceptor de Requisição
api.interceptors.request.use(config => {
    // Pega o token do localStorage
    const token = localStorage.getItem('authToken');

    // Se o token existir, adiciona ao cabeçalho de autorização
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});
export default api;