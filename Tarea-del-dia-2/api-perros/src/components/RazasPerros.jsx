// Importación de estados y estilos
import React, { useEffect, useState } from "react"; 
import './RazasPerros.css'

// Definición del Componente RazasPerros, que simula la llamada a una API 
export default function RazasPerros(){
    // Definición de estados para los campos de perro, estado de carga y existencia de errores
    const [perros, setPerros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Definición del efecto que simula la llamada a la API
    useEffect(() => {
        fetch('https://dog.ceo/api/breed/akita/images/random/20')
            .then(res => {
                if (!res.ok) throw new Error('Error al obtener las imágenes');return res.json();
            })
            .then(data => setPerros(data.message))
            .catch(err => setError(err))
            .finally(() => setIsLoading(false));
    }, []); 

    // Impresión de mensajes para carga y errores
    if (isLoading) return <h1>Cargando imágenes ...</h1>;
    if (error) return <h1> Error: {error} </h1>;

    return(
        <div className="imagenes">
            {/* Desglose de imágenes solicitadas a la API */}
            <h2>Imágenes de Akitas</h2>
            {perros.map(dog => ( 
                <div className="card">
                    <img src={dog} alt="Akita"/>
                </div>
            ))}
        </div> 
        
    );
};