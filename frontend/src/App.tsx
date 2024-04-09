import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import { SignUp } from './Pages/SignUp'
import './index.css'
import { Login } from './Pages/Login'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* NAVBAR DE PRUEBA */}
        <div className="flex space-x-5 p-5">
          <Link to="/">Landing Page</Link>
          <Link to="/login">Login</Link>
          <Link to="/registro">Registro</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/transferencias">Transferencias</Link>
          <Link to="/inversiones">Inversiones</Link>
        </div>
        <Routes>
          <Route path="/" element={<h1>Landing Page</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<SignUp />} />
          {/* 🔏 RUTAS PRIVADAS 👇*/}
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/transferencias" element={<h1>Transferencias</h1>} />
          <Route path="/inversiones" element={<h1>Inversiones</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
