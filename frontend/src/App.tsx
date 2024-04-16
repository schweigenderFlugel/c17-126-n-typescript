import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './Context/AuthContext';

import { LandingPage } from './Pages/LandingPage';
import { SignUp } from './Pages/SignUp';
import { Login } from './Pages/Login';

import { Layout } from './Components/Layout';
import { RequireLogin } from './Components/ProtectedRoutes';
import { Dashboard } from './Pages/Dashboard';
import { DashboardStart } from './Components/DashboardStart';
import { TransfersList } from './Components/TransfersList';
import { Settings } from './Components/Settings';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<SignUp />} />
            {/* 🔏 RUTAS PRIVADAS 👇*/}
            <Route element={<RequireLogin />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="/dashboard" element={<DashboardStart />} />
                <Route path="/dashboard/transferencias" element={<TransfersList />} />
                <Route path="/dashboard/configuracion" element={<Settings />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
