// Importación de hook y conexión
import { useForm } from 'react-hook-form';
import client from '../api/client';

// Creación de componente CreatePost para conexión con back
export default function CreatePost(){
    // Definición de acciones del formulario
    const { register, handleSubmit } = useForm();

    // Definición de función que maneja la conexión del formulario con la API
    const onSubmit = async (data) => {
        try {
        // Se espera la información de creación de un post y se informa en una alerta si fue exitoso
            await client.post('/posts', data);
            alert ('Post creado');
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
        // Si ocurre un error en la creación del post, se informa en una alerta
            alert('Error al guardar Post');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Campo para título del post */}
            <input {...register("title")} placeholder="Título" />
            {/* Campo para contenido del post */}
            <textarea {...register("content")} placeholder="Contenido" />
            {/* También podría implementarse el id del usuario*/}
            {/* Botón para creación de post */}
            <button type="submit">Crear</button>
        </form>
    );
}