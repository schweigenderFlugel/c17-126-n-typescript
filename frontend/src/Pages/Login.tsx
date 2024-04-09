import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useLogin } from "../Hooks/useLogin";
import { Modal } from "../Components/Modal";
import { ErrorMessage } from "../Components/ErrorMessage";
import { AxiosError } from "axios";

export const Login = () => {
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('')
  const [ showPassword, setShowPassword ] = useState<boolean>(false);
  const [ openModal, setOpenModal ] = useState<boolean>(false);
  const [ error, setError ] = useState<string>('');
  const navigate = useNavigate();

  const onLoginError = (error: AxiosError) => {
    if (error.response?.status === 401) {
      setError('Datos inválidos');
      setOpenModal(true);
    } else if (error.response?.status === 404) {
      setError('Usuario no encontrado');
      setOpenModal(true);
    } else {
      setError('Error desconocido');
      setOpenModal(true);
    }
  }

  const { setLogin, remember, setRemember } = useLogin({ 
    onSuccess: () => navigate('/', { replace: true }),
    onReject: (error) => onLoginError(error),
  })
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin({ email, password })
  }

  const passwordInputType = showPassword ? "text" : "password";

  return (
    <>
      <Modal open={openModal}>
        <ErrorMessage>
          {error}
        </ErrorMessage>
      </Modal>
        <main className="grid justify-items-center p-12 bg-white dark:bg-black bg-opacity-25 dark:bg-opacity-25 rounded-2xl border border-indigo-500">
          <h1 className="text-[28px] dark:text-white font-bold text-center">Banco nc.</h1>
          <h2 className="text-center dark:text-white mb-4">Nos alegra tenerte de vuelta</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="text-black dark:text-white">Email</label>
              <input 
                type="text" 
                id="email" 
                name="email" 
                className="w-full h-8 rounded-md px-2 border text-black dark:text-white dark:border-white bg-gray-200 dark:bg-transparent"
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="text-black dark:text-white">Contraseña</label>
              <div className="relative flex justify-between items-center">
                <input 
                  type={passwordInputType} 
                  id="password" 
                  name="password"
                  className="w-full h-8 rounded-md px-2 border text-black dark:text-white dark:border-white bg-gray-200 dark:bg-transparent"
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password} 
                />
                {showPassword 
                  ? <BsEyeSlash 
                      className="absolute right-3 cursor-pointer text-black dark:text-white hover:text-indigo-500 dark:hover:text-indigo-500"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  : <BsEye 
                      className="absolute right-3 cursor-pointer text-black dark:text-white hover:text-indigo-500 dark:hover:text-indigo-500"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                }
              </div>
            </div>
            <div className="inline-flex items-center mb-4">
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={remember} onChange={() => setRemember(!remember)} />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-black dark:text-white">Recordarme</span>
              </label>
              <p className="text-sm font-medium text-black dark:text-white">
                Olvidaste la contraseña
              </p>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full text-white bg-indigo-600 px-2 py-1 cursor-pointer rounded-lg enabled:hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-default"
                disabled={
                  email === '' || 
                  password === ''
                }
              >
                Ingresar
              </button>
            </div>
            <div className="text-center text-black dark:text-white">
              <p>¿No tenés cuenta? <Link to={"/registro"}>Registrate ahora</Link></p>
            </div>
          </form>
      </main>
    </>
  )
}