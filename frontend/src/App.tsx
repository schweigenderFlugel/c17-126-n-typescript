import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './Context/AuthContext';

import { LandingPage } from './Pages/LandingPage';
import { SignUp } from './Pages/SignUp';
import { Login } from './Pages/Login';

import { Layout } from './Components/Layout';
import { RequireLogin } from './Components/ProtectedRoutes';
import { Dashboard } from './Pages/Dashboard';

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
            <Route element={<RequireLogin />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
