import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { signup } from "../Services/user";
import { Modal } from "../Components/Modal";
import { ErrorMessage } from "../Components/ErrorMessage";


export const SignUp = () => {
  const [ fullname, setFullname ] = useState<string>('');
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ confirmPassword, setConfirmPassword ] = useState<string>('');
  const [ showPassword, setShowPassword ] = useState<boolean>(false);
  const [ showConfirmPassword, setShowConfirmPassword ] = useState<boolean>(false);
  const [ openModal, setOpenModal ] = useState<boolean>(false);
  const [ error, setError ] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ email, password });
      navigate('/login', { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
        setOpenModal(true);
      }
    }
  }

  const passwordInputType = showPassword ? "text" : "password";
  const confirmPasswordInputType = showConfirmPassword ? "text" : "password";

  return (
    <>
      <Modal open={openModal}>
        <ErrorMessage>{error}</ErrorMessage>
      </Modal>
      <main className="absolute grid justify-items-center p-12 bg-white dark:bg-black bg-opacity-25 dark:bg-opacity-25 rounded-2xl border border-indigo-500">
        <h1 className="text-[28px] text-black dark:text-white font-bold text-center">Banco nc.</h1>
        <h2 className="text-center dark:text-white mb-4">Nos alegra tenerte por acá</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="fullname" className="text-black dark:text-white">Nombre completo</label>
            <input 
              type="text" 
              id="fullname"
              name="fullname"
              className="w-full h-8 rounded-md px-2 border text-black dark:text-white dark:border-white bg-gray-200 dark:bg-transparent"
              onChange={(e) => setFullname(e.target.value)} 
              value={fullname}
            />
          </div>
          <div className="mb-6">
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
          <div className="mb-6">
            <label htmlFor="confirm-password" className="text-black dark:text-white">Confirmar Contraseña</label>
            <div className="relative flex justify-between items-center">
              <input 
                type={confirmPasswordInputType}
                id="confirm-password" 
                name="confirm-password"
                className="w-full h-8 rounded-md px-2 border text-black dark:text-white dark:border-white bg-gray-200 dark:bg-transparent"
                onChange={(e) => setConfirmPassword(e.target.value)} 
                value={confirmPassword} 
              />
              {showConfirmPassword 
                ? <BsEyeSlash 
                    className="absolute right-3 cursor-pointer text-black dark:text-white hover:text-indigo-500 dark:hover:text-indigo-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                : <BsEye 
                    className="absolute right-3 cursor-pointer text-black dark:text-white hover:text-indigo-500 dark:hover:text-indigo-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
              }
            </div>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full text-white bg-indigo-600 px-2 py-1 cursor-pointer rounded-lg enabled:hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-default"
              disabled={
                fullname === '' ||
                email === '' ||
                password === '' ||
                confirmPassword === ''
              }
            >
              Registrarse
            </button>
          </div>
          <div className="text-center text-black dark:text-white">
            <p>¿Ya tienes cuenta? <Link to={"/login"}>Inicia sesión</Link></p>
          </div>
        </form>
      </main>
    </>
  )
}