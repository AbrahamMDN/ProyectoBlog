import './App.css'
import { UserProvider } from './context/UserContext'
import Header from './components/Header'
import Login from './components/Login'
import ContenidoPrivado from './components/ContenidoPrivado'

function App() {

  return (
    <UserProvider>
      <Header/>
      <Login/>
      <ContenidoPrivado/>
    </UserProvider>
  )
}

export default App
