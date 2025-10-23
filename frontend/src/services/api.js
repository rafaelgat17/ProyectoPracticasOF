import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // la variable de entorno

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const obtenerBloques = () => {
  return api.get('/bloques');
};

export const obtenerBloque = (id) => {
  return api.get(`/bloques/${id}/`);
};

export const generarEjercicio = (bloqueId) => {
  return api.post('/ejercicios/generar', { bloque_id: bloqueId });
};

export const enviarRespuestas = (intentoId, respuestas) => {
  return api.post('/ejercicios/responder', { intento_id: intentoId, respuestas });
};

export default api;