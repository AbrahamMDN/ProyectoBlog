import { useUser } from "../context/UserContext";
import ArticulosBlog from "./ArticulosBlog";

export default function ContenidoPrivado(){
    const { user } = useUser();

    if (!user) return <h1>🔐 Debes de iniciar sesión para ver el contenido 🔐</h1>;
    
    return (
        <div>
            <h2>Welcome {user.name}</h2>
            <ArticulosBlog/>
        </div>
    )
}