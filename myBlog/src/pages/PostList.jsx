// Importación de hooks, conexión y contexto para inicio de sesión
import { useEffect, useState } from 'react'
import client from '../api/client'
import { useUser } from '../context/UserContext'

// Creación de componente PostList adaptado a versión estilizada
function PostList() {
    // Inicialización del contexto de inicio de sesión con su parámetro de actividad 
    const { user } = useUser();
    // Inicialización de estados para posts, title, content y edición de post
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [editPostId, setEditPostId] = useState(null)

    // Efecto para ejecutar la función de conexión asincrónica en el montaje
    useEffect(() => {
        fetchPosts()
    }, []);

    // Función que trae los post desde el client y los almacena en el estado de posts del más reciente al más antiguo
    // Se inicializa al llamar la página
    const fetchPosts = async () => {
        try{
            const res = await client.get("/posts");
            setPosts(res.data.reverse());
        } catch (error) {
            // Si hay un error en la solicitud, se muestra en consola
            console.error('Error al obtener posts:', error);
        }
    };

    // Función que maneja la creación de un post
    const handleCreate = async () => {
        // Si no hay inputs, no se devuelve nada
        if (!title || !content) return
        try {
            // Se espera a que se envíen los campos del post y se limpian del estado. Después, se traen desde el client con la función fetchPosts
            await client.post("/posts", {
                title,
                content,
                user_id: user._id,
            });
            setTitle('')
            setContent('')
            fetchPosts();
        } catch (error) {
            // Si hay un error en la solicitud, se muestra en consola
            console.error('Error al crear post:', error);
        }
    };

    // Función que maneja la actualización de un post
    const handleUpdate = async (id) => {
        // Se espera a que se editen los campos del post y se actualizan los estados de edición del post, título y contenido a sus versiones iniciales. Después, se traen desde el client con la función fetchPosts
        try {
            await client.put(`/posts/${id}`, {
                title,
                content,
            })
            setEditPostId(null)
            setTitle('')
            setContent('')
            fetchPosts()
        } catch (error) {
            // Si hay un error en la solicitud, se muestra en consola
            console.error('Error al actualizar post:', error)
        }
    };

    // Función que maneja la eliminación de un post
    const handleDelete = async (id) => {
        // Se espera a que se elimine el post y se ejecuta la función fetchPosts para traer los posts restantes
        try {
            await client.delete(`/post/${id}`)
            fetchPosts()
        } catch (error) {
            // Si hay un error en la solicitud, se muestra en consola
            console.error('Error al eliminar post:', error)
        }
    };

    // Función que inicializa la edición de un post
    const startEdit = (post) => {
        // Se cargan los inputs del post en los estados de edición, título y contenido
        setEditPostId(post._id)
        setTitle(post.title)
        setContent(post.content)
    };

    return (
        <div className="container py-4">
            {/* Campo para crear nuevas publicaciones */}
            <h2 className="mb-4">Crear nueva publicación</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="form-control mb-2"
                    placeholder="Contenido"
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                {/* Botón para crear / actualizar el post dependiendo si existe o no su id */}
                {editPostId ? (
                    <button className="btn btn-warning" onClick={() => handleUpdate(editPostId)}>
                        Actualizar publicación
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={handleCreate}>
                        Crear publicación
                    </button>
                )}
            </div>
            
            {/* Línea separadora de secciones */}
            <hr className="my-4" />

            {/* Campo que muestra las publicaciones */}
            <h3 className="mb-3">Publicaciones</h3>
            {posts.map((post) => (
                <div className="card mb-3" key={post._id}>
                    {/* Estructura de la publicación de cada post */}
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.content}</p>
                        <p className="card-text">
                            <small className="text-muted">
                                {new Date(post.created_at).toLocaleString()}
                            </small>
                        </p>
                        
                        {/* Botones de edición y eliminación si el usuario logeado es el creador del post */}
                        {post.user_id === user._id && (
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={() => startEdit(post)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleDelete(post._id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

// Exportación del componente PostList
export default PostList