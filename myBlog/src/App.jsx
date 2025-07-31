// Importación de etiquetas de envoltura, páginas y contexto
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from './context/UserContext'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import PostList from './pages/PostList'
import PrivateRoute from './routes/PrivateRoute'

/* Creación de la función principal */
function App() {
  // Inicialización del contexto para el inicio de sesión de un usuario
  const { user, isLoading } = useUser()

  // Aparición de mensaje mientras se inicia sesión
  if (isLoading) {
    return <div className="text-center mt-5">Cargando sesión...</div>
  }

  return (
    <Router>
      {/* Encabezado */}
      <Header />
      {/* Rutas */}
      <Routes>
        {/* Ruta a HomePage (PostList) desde endpoint / para sesión iniciada. Si no la hay, redirección a LoginPage */}
        <Route
          path="/"
          element={
            user ? <PostList /> : <Navigate to="/login" />
          }
        />
        {/* Ruta a HomePage desde endpoint /login para sesión iniciada. Si no la hay, redirección a LoginPage */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
         {/* Ruta a HomePage desde endpoint /register para sesión iniciada. Si no la hay, redirección a RegisterPage */}
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
         {/* Ruta a HomePage desde endpoint inexistente */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
};

// Exportación de la App
export default App
