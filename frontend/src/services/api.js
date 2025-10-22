// Importar axios
import axios from 'axios';

// URL base de la API de Django
// Usa la variable de entorno o por defecto localhost:8000
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// FUNCIONES PARA BLOQUES

// Función para obtener todos los bloques
// Debe hacer GET a '/bloques/'
// Retorna la promesa de axios
export const obtenerBloques = () => {
  // Tu código aquí
  // return api.get('...');
};

// Función para obtener un bloque específico por ID
// Debe hacer GET a '/bloques/{id}/'
// Retorna la promesa
export const obtenerBloque = (id) => {
  // Tu código aquí
  // return api.get(`.../${id}/`);
};

// FUNCIONES PARA EJERCICIOS

// Función para generar un ejercicio
// Debe hacer POST a '/ejercicios/generar/'
// Envía en el body: { bloque_id: bloqueId }
// Retorna la promesa
export const generarEjercicio = (bloqueId) => {
  // Tu código aquí
  // return api.post('...', { bloque_id: bloqueId });
};

// Función para enviar respuestas
// Debe hacer POST a '/ejercicios/responder/'
// Envía en el body: { intento_id, respuestas: [...] }
// Retorna la promesa
export const enviarRespuestas = (intentoId, respuestas) => {
  // Tu código aquí
  // return api.post('...', { intento_id: intentoId, respuestas });
};

// Exportar la instancia de axios por si necesitas usarla directamente
export default api;