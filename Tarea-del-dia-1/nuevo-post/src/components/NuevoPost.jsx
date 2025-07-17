// Importaciones de hooks y estilos
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './NuevoPost.css'

// Construcción del componente NuevoPost
export default function NuevoPost() {
  // Definición de estados y acciones del formulario
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [mensaje, setMensaje] = useState('');

  // Definición de función que confirma el envío del formulario en estado y consola y reinicia el input 
  const onSubmit = data => {
    console.log("Datos del post:", data);
    setMensaje('¡Publicación enviada correctamente!');
    reset(); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label="Formulario de nuevo post"> 
        {/* Campo para introducir título: validación de formato y manejo de errores */}
        <label htmlFor="titulo">Título</label>
        <input 
           id='titulo'
           className = {errors.titulo ? 'input-error' : ''}
           placeholder="Título" 
           {...register("titulo", { required: true, minLength: 5})}
        />
        {errors.titulo && <p>El título debe tener al menos 5 caracteres.</p>}

        {/* Campo para introducir contenido: validación de formato y manejo de errores */}
        <label htmlFor="contenido">Contenido</label>
        <textarea
           id="contenido"
           className={errors.contenido ? 'input-error' : ''}
           placeholder="Contenido"
           {...register("contenido", { required: true, minLength: 20 })}
        />
        {errors.contenido && <p>El contenido debe tener al menos 20 caracteres.</p>}

      {/* Campo para introducir correo: validación de formato y manejo de errores */}
        <label htmlFor="email">Correo electrónico (opcional)</label>
        <input
           id="email"
           className={errors.email ? 'input-error' : ''}
           placeholder="Correo electrónico"
           {...register("email", {
            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
           })} 
        /> {/* Empieza con una o más letras, números, guiones o puntos, seguido del símbolo @, uno o más grupos con letras/números seguido de un punto (dominios) y  termina con 2 a 4 letras o números (como .com, .net, .org).*/}
        {errors.email?.type === 'pattern' && <p>Introduce un correo electrónico válido.</p>}

      {/* Botón de envío y mensaje de envío exitoso */}
        <button type="submit">Publicar</button>
        {mensaje && <p className="success-message">{mensaje}</p>}
    </form>
  );
}  