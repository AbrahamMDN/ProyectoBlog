// Importación de etiquetas bootstrap y contexto para inicio de sesión 
import { Card, Button } from 'react-bootstrap'
import { useUser } from '../context/UserContext'

// Creación de componente PostCard adaptado a versión estilizada
// Recibe como argumentos el contenido del post y las funciones que manejan la edición y eliminación de un post 
const PostCard = ({ post, onEdit, onDelete }) => {
  // Inicialización del contexto de inicio de sesión con su parámetro de actividad 
  const { user } = useUser()
  // Elemento que permite realizar ciertas acciones sobre un post solo si el usuario logueado es el creador del post 
  const isOwner = user && post.user_id === user._id

  return (
    <Card className="mb-3 shadow-sm">
        {/* Estructura del cuerpo de publicación de un Post */}
      <Card.Body>
        {/* Título y Contenido de un Post */}
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
        {/* Fecha de publicación */}
        <small className="text-muted">
          {new Date(post.created_at).toLocaleString()}
        </small>
        {/* Botones de eliminación y edición del post si es visualizado por el creador del post */}
        {isOwner && (
          <div className="mt-3">
            <Button
              variant="outline-primary"
              className="me-2"
              onClick={() => onEdit?.(post)}
            >
              Editar
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => onDelete?.(post._id)}
            >
              Eliminar
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

// Exportación del componente PostCard
export default PostCard