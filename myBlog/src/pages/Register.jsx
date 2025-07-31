// Importación de hooks, etiquetas bootstrap, contexto de inicio de sesión y conexión
import { useForm } from 'react-hook-form';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import client from '../api/client';
import { useUser } from '../context/UserContext';

// Creación de componente Register adaptado a versión estilizada
const Register = () => {
  // Inicialización del contexto de inicio de sesión con su parámetro de logueo
    const { login } = useUser();

  // Definición de acciones y estados del formulario 
    const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
    } = useForm()

    // Definición de función que maneja la conexión del formulario con la API
    const onSubmit = async (data) => {
        try {
          // Se espera la información de registro del usuario
            const res = await client.post('/user/register', data);
            // Se envía la información del usuario registrado directamente a la función login del contexto global 
            login(res.data);
        } catch (err) {
          // Si hay un error general en la conexión, se imprime el error en consola y se envía un mensaje indicando un error en el correo ingresado
          console.error(err)
          setError('root', {
            message: 'No se pudo registrar. ¿Ya existe el correo?',
          })
        }
    };

    return (
      <Container className="mt-5" style={{ maxWidth: '400px' }}>
        {/* Título del Formulario */}
        <h2 className="mb-4 text-center">Registro</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo para email, con manejo de errores */}
          <Form.Group className="mb-3">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo"
              {...register('email', { required: 'El correo es obligatorio' })}
            />
            {errors.email && (
              <Form.Text className="text-danger">{errors.email.message}</Form.Text>
            )}
          </Form.Group>
          {/* Campo para contraseña, con manejo de errores */}
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Tu contraseña"
              {...register('password', { required: 'La contraseña es obligatoria' })}
            />
            {errors.password && (
              <Form.Text className="text-danger">{errors.password.message}</Form.Text>
            )}
          </Form.Group>
          
          {/* Alerta para errores globales */}
          {errors.root && <Alert variant="danger">{errors.root.message}</Alert>}
          
          {/* Botón de registro */}
          <div className="d-grid">
            <Button variant="success" type="submit">
              Registrarse
            </Button>
          </div>
        </Form>
      </Container>
  );
}

// Exportación del componente Register
export default Register