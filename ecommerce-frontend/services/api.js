import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Cambia esto a la URL de tu backend
});

export default api;
