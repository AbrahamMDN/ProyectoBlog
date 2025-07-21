// Importación de hooks, contexto y estilos
import { useUser } from "../context/UserContext";
import { useForm } from "react-hook-form";
import './Login.css';

// Se crea el componente que maneja la lógica del inicio de sesión
export default function Login(){
    // Se aplica el contexto global y se ingresan acciones y estados del formulario
    const { user, login } = useUser();
    const { register, handleSubmit, formState: {errors}} = useForm();

    // No se ejecuta si ya hay un inicio de sesión
    if (user) return null;

    // Se crea una función que pasa los inputs de inicio de sesión a la propiedad login
    const onSubmit = (data) => {
        login(data.nombre, data.password)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} aria-label="Formulario de login">
            {/* Campo para nombre, con manejo de errores */}
            <input
                type="text"
                placeholder="Nombre"
                {...register("nombre", {required: true})}
                className={errors.nombre? 'input-error': ''}
            />
            {errors.nombre && <p>El nombre es obligatorio</p>}

            {/* Campo para contraseña, con manejo de errores */}
            <input
                type="password"
                placeholder="Contraseña"
                {...register("password", {required: true})}
                className={errors.password? 'input-error': ''}
            />
            {errors.password && <p>La contraseña es obligatoria</p>}

            {/* Botón de inicio de sesión */}
            <button className="login" type="submit">Iniciar Sesión</button>
        </form>
    ) 
}