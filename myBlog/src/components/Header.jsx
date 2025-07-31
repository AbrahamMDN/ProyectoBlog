// Importación de etiquetas bootstrap, etiquetas de RRD y contexto de inicio de sesión
import { Navbar, Nav, Container, Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

// Creación del componente Header adaptado a versión estilizada
// Recibe como argumento la función que maneja el elemento de búsqueda
const Header = ({ onSearch }) => {
  // Inicialización del contexto de inicio de sesión con sus parámetros de actividad y cierre de sesión
  const { user, logout } = useUser()
  // Inicialización del componente de navegación
  const navigate = useNavigate()

  // Función que maneja el cierre de sesión y redirige al LoginPage
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Función que maneja los eventos de búsqueda y muestra su valor
  const handleSearch = (e) => {
    e.preventDefault()
    const value = e.target.elements.search.value
    onSearch?.(value)
  }

  return (
    <Navbar expand="lg" bg="light" className="shadow-sm mb-4">
      <Container>
        {/* Título del encabezado */}
        <Navbar.Brand as={Link} to="/">
          Mi Blog
        </Navbar.Brand>
        {/* Implementación de Menú Desplegable para adaptación a Diseño Responsivo */}
        <Navbar.Toggle />
         {/* Componentes de Navegación del Menú Desplegable */}
        <Navbar.Collapse>
            {/* Enlace a Posts si hay un inicio de sesión. Si no la hay, enlaces a registro e inicio de sesión */}
          <Nav className="me-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/">Posts</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Registro</Nav.Link>
              </>
            )}
          </Nav>
          {/* Si hay un inicio de sesión, se muestra un buscador y un botón de cierre de sesión */}
          {user && (
            <>
              <Form className="d-flex me-2" onSubmit={handleSearch}>
                <Form.Control
                  type="search"
                  placeholder="Buscar título..."
                  name="search"
                />
              </Form>
              <Button variant="outline-danger" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

// Exportación del componente Header
export default Header