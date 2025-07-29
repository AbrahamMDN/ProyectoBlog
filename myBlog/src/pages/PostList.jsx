// Importación de hooks y conexión
import React, { useEffect, useState } from "react";
import client from '../api/client';

// Creación de componente PostList para conexión con back
export default function PostList(){
    // Definición de estado para posts. S einicializa como una lista vacía
    const [posts, setPosts] = useState([]);

    // Efecto para traer los post desde el client y almacenarlos en la lista de posts del estado de posts
    // Se inicializa al llamar la página
    useEffect(() => {
        client.get('/posts').then((res) => setPosts(res.data));
    }, []);

    return (
        <div>
            {/* Contenedor para listado de posts */}
            <h2>Posts</h2>
            <ul>
                {posts.map(post => (
                    <div>
                        <li key={post._id}>{post.title}</li>
                        <li key={post._id}>{post.content}</li>
                    </div>
                ))}
            </ul>
        </div>
    );
}