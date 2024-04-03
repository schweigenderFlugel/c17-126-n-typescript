import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../Hooks/useLogin";
import { Modal } from "../Components/Modal";
import { ErrorMessage } from "../Components/ErrorMessage";
import { AxiosError } from "axios";

export const Login = () => {
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('')
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

  const { setLogin, trust, setTrust } = useLogin({ 
    onSuccess: () => navigate('/', { replace: true }),
    onReject: (error) => onLoginError(error),
  })
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin({ email, password })
  }

  return (
    <>
      <Modal open={openModal}>
        <ErrorMessage>
          {error}
        </ErrorMessage>
      </Modal>
      <main className="grid justify-center items-center">
        <header className="text-[18px] font-bold">Registro</header>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              id="email" 
              name="email" 
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
            />
          </div>
          <div>
            <input type="checkbox" checked={trust} onChange={() => setTrust(!trust)}/>
            <label htmlFor="trust">Confío en este dispositivo</label>
          </div>
          <button
            type="submit"
            className="text-white bg-green-700 px-2 py-1 cursor-pointer rounded-lg disabled:opacity-50 disabled:cursor-default"
            disabled={
              email === '' && 
              password === ''
            }
          >
            Ingresar
          </button>
        </form>
      </main>
    </>
  )
}