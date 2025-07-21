// Importación de hooks y estilos
import React, { useEffect, useState} from "react";
import './ArticulosBlog.css'

// Creación del componente que contiene los artículos
export default function ArticulosBlog(){
    // Inicialización de estados para articulos, carga y errores
    const [articulos, setArticulos] = useState([]); // Set aticulos me permite guardar mi info. Para traerla es get
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Creación del efecto que trae los artículos desde una API y actualiza los estados
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
            .then((res) => {
                if (!res.ok) throw new Error('Error al obtener los articulos');return res.json();
            })
            .then((data) => setArticulos(data))
            .catch((err) => setError(err))
            .finally(() => setIsLoading(false));
    }, []); // Funcion anónima porque no tiene nombre

    // Si existen errores o la carga está activa se muestran mensajes que lo señalan 
    if (isLoading) return <h1>Cargando articulos ...</h1>;
    if (error) return <h1> Error: {error.message} </h1>;

    // Mi return solo puede devolver una etiqueta. En este caso es el div externo. Dos o mas me generan un error
    return(
        <div className="articulos">
            {/* Estructura del listado de artículos: Si no hay ninguno, se señala; si los hay, se muestran en listado */}
            <h2>Articulos de mi Blog</h2>
            {articulos.length === 0 ? (
                <p>No hay artículos disponibles.</p>
            ) : (
                articulos.map((articulo) => (
                    <div className="card" key={articulo.id}>
                        <h3>{articulo.title}</h3>
                        <p>{articulo.body}</p>
                    </div>
                ))
            )}
        </div>        
    );
};