// Será la conexión con nuestro backend
// Es un archivo js porque no se utlizan etiquetas html
// Importación de axios
import axios from "axios";

// Se crea la conexión
const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Exportación de componente de conexión
export default client;