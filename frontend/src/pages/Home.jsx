// Importar hooks de React
import { useState, useEffect } from 'react';

// Importar la función para obtener bloques
import { obtenerBloques } from '../services/api';

// Importar Link de react-router (lo instalaremos después)
// import { Link } from 'react-router-dom';

function Home() {
  // Estado para guardar los bloques
  // Usa useState, inicializa como array vacío
  const [bloques, setBloques] = useState(/* ¿Qué va aquí? */);
  
  // Estado para loading
  const [loading, setLoading] = useState(/* ¿true o false? */);
  
  // Estado para errores
  const [error, setError] = useState(null);
  
  // useEffect para cargar los bloques al montar el componente
  useEffect(() => {
    // Función asíncrona para cargar datos
    const cargarBloques = async () => {
      try {
        setLoading(true);
        
        // Llamar a la API
        const response = await obtenerBloques();
        
        // Guardar los bloques en el estado
        // Los datos vienen en response.data
        setBloques(/* ¿Qué poner? */);
        
        setError(null);
      } catch (err) {
        console.error('Error al cargar bloques:', err);
        setError('No se pudieron cargar los bloques');
      } finally {
        setLoading(false);
      }
    };
    
    cargarBloques();
  }, []); // Array vacío = solo se ejecuta al montar
  
  // Renderizado condicional
  if (loading) {
    return <div>Cargando bloques...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div className="home">
      <h1>Bloques de Circuitos</h1>
      
      <div className="bloques-lista">
        {/* Mapear los bloques y mostrarlos */}
        {bloques.map((bloque) => (
          <div key={bloque.id} className="bloque-card">
            <h2>{bloque.titulo}</h2>
            <p>{bloque.descripcion}</p>
            <p>Dimensiones: {bloque.filas_circuito}x{bloque.columnas_circuito}</p>
            
            {/* Por ahora un enlace simple, luego será <Link> */}
            <a href={`/bloque/${bloque.id}`}>Ver Bloque</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;