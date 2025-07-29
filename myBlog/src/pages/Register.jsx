// Importación de hooks y conexión
import { useForm } from 'react-hook-form';
import client from '../api/client';
import { useNavigate } from 'react-router-dom';

// Creación de componente Register para conexión con back
export default function Register() {
  // Definición de acciones y estado del formulario
    const { register, handleSubmit, formState: {errors}} = useForm();
  // Inicialización de navigate
    const navigate = useNavigate();

    // Definición de función que maneja la conexión del formulario con la API
    const onSubmit = async (data) => {
        try {
          // Se espera la información del registro del usuario y se informa en una alerta si fue exitoso
          // eslint-disable-next-line no-unused-vars
            const res = await client.post('/user/register', data);
            alert ('Registro exitoso');
            // Si el registro fue exitoso, se redirige al usuario al homepage 
            navigate('/')
          // eslint-disable-next-line no-unused-vars
        } catch (err) {
          // Si ocurre un error en el registro del usuario, se informa en una alerta
            alert('Error al registrarse');
        }
    };

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campo para email, con manejo de errores */}
      <input 
        {...register("email", {required: true})} 
        className={errors.email ? 'input-error':''} 
        placeholder="Email"
        />
      {/* Campo para contraseña, con manejo de errores */}
      <input 
        {...register("password", {required: true})} 
        className={errors.password ? 'input-error':''} 
        type="password" 
        placeholder="Password" />
      {/* Botón para registro de usuario */}
      <button type="submit">Registrarse</button>
    </form>
  );
}