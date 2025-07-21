// Importación de contexto y estilos
import { useUser } from "../context/UserContext";
import './Header.css';

// Se crea el componente encargado de manejar la estructura del encabezado
export default function Header(){
    // Se proporciona el contexto global
    const { user, logout} = useUser();

    return(
        <header>
            {/* Si hay un inicio de sesión aparece un encabezado; sino, un mensaje para indicar que se debe iniciar sesión */}
            {user? (
                <>
                    <p>Hola, {user.name}</p>
                    <button onClick={logout}>Cerrar Sesión</button>
                </>
            ):(
                <p>No has iniciado sesión</p>
            )}
        </header>
    );
}