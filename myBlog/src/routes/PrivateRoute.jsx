// Importación de componente Navigate y contexto
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

// Creación de Ruta Privada a través de un contexto global 
const PrivateRoute = ({ children }) => {
  // Inicialización del contexto para inicio de sesión
  const { user } = useUser()
  // Si hay un inicio de sesión, se muestra el contenido privado, sino, se redirige al LoginPage
  return user ? children : <Navigate to="/login" />
}

// Exportación del componente PrivateRoute
export default PrivateRoute