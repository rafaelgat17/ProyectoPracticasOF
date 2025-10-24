import axios from 'axios'; // libreria para hacer peticiones HTTP como fetch()

const API_URL = import.meta.env.VITE_API_URL; // la variable de entorno

// crea una instancia de axios con configuracion predeterminada 
const api = axios.create({
  baseURL: API_URL, // todas las peticiones empazaran con esta URL
  headers: {
    'Content-Type': 'application/json', // envia datos en formato JSON
  },
});



/**
 * Obtener todos los bloques
 * 
 * ¿Qué hace?
 * - Hace una petición GET a http://localhost:8000/api/bloques/
 * - Django busca todos los bloques en la BD
 * - Devuelve un array de bloques
 * 
 * ¿Cuándo se usa?
 * - En la página Home para mostrar la lista de bloques
 * 
 * @returns {Promise} Promesa que resuelve con los datos de Django
 */

export const obtenerBloques = () => {
  // api.get() hace una peticion GET
  // ya se configuro baseURL, solo ponemos la ruta relativa
  return api.get('/bloques');

  // Esto es equivalente a:
  // return axios.get('http://localhost:8000/api/bloques/');
};



/**
 * Obtener un bloque específico por su ID
 * 
 * ¿Qué hace?
 * - Hace GET a http://localhost:8000/api/bloques/5/ (si id = 5)
 * - Django busca el bloque con ese ID
 * - Devuelve los datos de ese bloque
 * 
 * ¿Cuándo se usa?
 * - En la página BloqueDetalle cuando quieres ver un bloque específico
 * 
 * @param {number} id - El ID del bloque a obtener
 * @returns {Promise} Promesa con los datos del bloque
 */

export const obtenerBloque = (id) => {
  // Template literal (backticks) para insertar el ID en la URL
  return api.get(`/bloques/${id}/`);
};



/**
 * Generar un nuevo ejercicio
 * 
 * ¿Qué hace?
 * - Hace POST a http://localhost:8000/api/ejercicios/generar/
 * - Envía el ID del bloque en el body
 * - Django genera un circuito aleatorio
 * - Devuelve el circuito con sus preguntas
 * 
 * ¿Cuándo se usa?
 * - Cuando el usuario hace click en "Generar Ejercicio"
 * 
 * @param {number} bloqueId - ID del bloque del que generar el ejercicio
 * @returns {Promise} Promesa con el circuito generado
 */

export const generarEjercicio = (bloqueId) => {
  // api.post(url, datos) hace una petición POST
  // El segundo parámetro es el "body" (los datos que enviamos)
  return api.post('/ejercicios/generar', { bloque_id: bloqueId });
};


/**
 * Enviar las respuestas de un intento
 * 
 * ¿Qué hace?
 * - Hace POST a http://localhost:8000/api/ejercicios/responder/
 * - Envía el ID del intento y las respuestas del usuario
 * - Django evalúa si son correctas
 * - Devuelve el resultado (cuántas correctas, puntuación, etc.)
 * 
 * ¿Cuándo se usa?
 * - Cuando el usuario termina de responder y hace click en "Enviar"
 * 
 * @param {number} intentoId - ID del intento
 * @param {Array} respuestas - Array de objetos con las respuestas
 * @returns {Promise} Promesa con el resultado de la evaluación
 */

export const enviarRespuestas = (intentoId, respuestas) => {
  return api.post('/ejercicios/responder', { intento_id: intentoId, respuestas });
};

export default api;