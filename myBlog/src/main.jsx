// Importación de React, estilos, etiquetas de envoltura, contexto y App
import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserProvider } from './context/UserContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'

// Estructura de la AppFront
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
