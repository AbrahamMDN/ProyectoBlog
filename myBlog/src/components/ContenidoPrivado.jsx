// Importación de contexto y componente que carga los artículos
import { useUser } from "../context/UserContext";
import ArticulosBlog from "./ArticulosBlog";

// Se crea el componente que contendrá el contenido privado solo para usuarios con inicio de sesión activo
export default function ContenidoPrivado(){
    // Se aplica el contexto global
    const { user } = useUser();

    // Si no hay un inicio de sesión, se le hace saber al usuario y no se muestra el contenido 
    if (!user) return <h1>🔐 Debes de iniciar sesión para ver el contenido 🔐</h1>;
    
    return (
        <div>
            {/* Estructura del contenido privado: Mensaje de bienvenida y artículos */}
            <h2>Welcome {user.name}</h2>
            <ArticulosBlog/>
        </div>
    )
}