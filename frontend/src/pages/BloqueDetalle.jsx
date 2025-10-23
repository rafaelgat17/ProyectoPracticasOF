import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerBloque, generarEjercicio } from '../services/api';

function BloqueDetalle() {
  const { id } = useParams();

  const [bloque, setBloque] = useState(null);
  const [circuito, setCircuito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generando, setGenerando] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const cargarBloque = async () => {
      try {
        const response = await obtenerBloque(id);
        setBloque(response.data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar bloque:', err);
        setError('No se pudo cargar el bloque');
      } finally {
        setLoading(false);
      }
    };
    
    cargarBloque();
  }, [id]);
  
  const handleGenerarEjercicio = async () => {
    try {
      setGenerando(true);
      
      const response = await generarEjercicio(id);
      
      setCircuito(response.data);
      
      console.log('Circuito generado:', response.data);
      
    } catch (err) {
      console.error('Error al generar ejercicio:', err);
      alert('Error al generar el ejercicio');
    } finally {
      setGenerando(false);
    }
  };
  
  if (loading) return <div>Cargando bloque...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!bloque) return <div>Bloque no encontrado</div>;
  
  return (
    <div className="bloque-detalle">
      <h1>{bloque.titulo}</h1>
      
      {/* Sección de teoría */}
      <div className="teoria">
        <h2>Teoría</h2>
        {/* Renderizar el contenido HTML o Markdown */}
        <div dangerouslySetInnerHTML={{ __html: bloque.contenido_teoria }} />
      </div>
      
      {/* Botón para generar ejercicio */}
      <div className="ejercicio-seccion">
        <button 
          onClick={handleGenerarEjercicio}
          disabled={generando}
        >
          {generando ? 'Generando...' : 'Generar Ejercicio'}
        </button>
        
        {/* Mostrar el circuito si existe */}
        {circuito && (
          <div className="circuito-container">
            <h2>Circuito Generado</h2>
            <p>Dimensiones: {circuito.filas}x{circuito.columnas}</p>
            
            {/* Por ahora solo mostramos los datos en texto */}
            <pre>{JSON.stringify(circuito, null, 2)}</pre>
            
            {/* Aquí irá el componente visual del circuito */}
          </div>
        )}
      </div>
    </div>
  );
}

export default BloqueDetalle;