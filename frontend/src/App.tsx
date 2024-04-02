import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
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
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/registro" element={<h1>Registro</h1>} />
        {/* 🔏 RUTAS PRIVADAS 👇*/}
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/transferencias" element={<h1>Transferencias</h1>} />
        <Route path="/inversiones" element={<h1>Inversiones</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
