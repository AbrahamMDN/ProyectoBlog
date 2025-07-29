// Importación de hook, conexión y estilos
import { useForm } from 'react-hook-form';
import client from '../api/client';
import './Login.css';

// Creación de componente Login para conexión con back
export default function Login() {
  // Definición de acciones y estados del formulario 
    const { register, handleSubmit, formState: {errors}} = useForm();

    // Definición de función que maneja la conexión del formulario con la API
    // Debe ser asincrónica para esperar una respuesta del client
    const onSubmit = async (data) => {
        try {
          // Se espera la información de inicio de sesión de usuario
            const res = await client.post('/user/login', data);
            // Se guarda información del id de usuario en memoria local y se informa si fue exitosa la acción
            localStorage.setItem('_id', res.data._id);
            alert ('Login exitoso');
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
          // Si ocurre un error en el inicio de sesión, se informa en una alerta
          // No se informa en consola porque sería exponer vulnerabilidades del código al usuario 
            alert('Error en Login');
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
      {/* Botón de inicio de sesión */}
      <button type="submit">Login</button>
    </form>
  );
}