import { useState, useEffect } from 'react';

import { obtenerBloques } from '../services/api';

// Importar Link de react-router (lo instalaremos después)
// import { Link } from 'react-router-dom';

function Home() {
  const [bloques, setBloques] = useState([]);
  
  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const cargarBloques = async () => {
      try {
        setLoading(true);
        
        const response = await obtenerBloques();
        
        setBloques(response.data);
        
        setError(null);
      } catch (err) {
        console.error('Error al cargar bloques:', err);
        setError('No se pudieron cargar los bloques');
      } finally {
        setLoading(false);
      }
    };
    
    cargarBloques();
  }, []); 
  
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