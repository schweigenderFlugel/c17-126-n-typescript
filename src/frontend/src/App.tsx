import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { SignUp } from './Pages/SignUp';
import "./index.css";
import { Login } from './Pages/Login';
import { Navbar } from './Components/Navbar';
import { Layout } from './Components/Layout';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Layout>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Landing Page</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<SignUp/>} />
          {/* 🔏 RUTAS PRIVADAS 👇*/}
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/transferencias" element={<h1>Transferencias</h1>} />
          <Route path="/inversiones" element={<h1>Inversiones</h1>} />
        </Routes> 
      </Layout>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
