import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './Context/AuthContext';

import { LandingPage } from './Pages/LandingPage';
import { SignUp } from './Pages/SignUp';
import { Login } from './Pages/Login';

import { Layout } from './Components/Layout';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<SignUp />} />
            {/* 🔏 RUTAS PRIVADAS 👇*/}
            <Route path="/dashboard" element={<h1>Dashboard</h1>} />
            <Route path="/transferencias" element={<h1>Transferencias</h1>} />
            <Route path="/inversiones" element={<h1>Inversiones</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
