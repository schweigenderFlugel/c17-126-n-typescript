import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../Hooks/useLogin'
import { Modal } from '../Components/Modal'
import { ErrorMessage } from '../Components/ErrorMessage'
import { AxiosError } from 'axios'
import { Layout } from '../Components/Layout'

export const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const onLoginError = (error: AxiosError) => {
    if (error.response?.status === 401) {
      setError('Datos inválidos')
      setOpenModal(true)
    } else if (error.response?.status === 404) {
      setError('Usuario no encontrado')
      setOpenModal(true)
    } else {
      setError('Error desconocido')
      setOpenModal(true)
    }
  }

  const { setLogin, remember, setRemember } = useLogin({
    onSuccess: () => navigate('/', { replace: true }),
    onReject: error => onLoginError(error),
  })

  const handleSubmit = e => {
    e.preventDefault()
    setLogin({ email, password })
  }

  return (
    <>
      <Modal open={openModal}>
        <ErrorMessage>{error}</ErrorMessage>
      </Modal>
      <Layout>
        <main className="grid justify-items-center p-12 bg-white bg-opacity-25 rounded-2xl">
          <h1 className="text-[28px] font-bold">Banco nc.</h1>
          <h2>Nos alegra tenerte de vuelta</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                className="w-full h-8 rounded-xl px-2"
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full h-8 rounded-xl px-2"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="inline-flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Recordarme
                </span>
              </label>
              <p className="text-sm font-medium">Olvidaste la contraseña</p>
            </div>
            <div>
              <button
                type="submit"
                className="w-full text-white bg-indigo-600 px-2 py-1 cursor-pointer rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-default"
                disabled={email === '' && password === ''}
              >
                Ingresar
              </button>
            </div>
            <div className="text-center">
              <p>
                ¿No tenés cuenta?<Link to={'/registro'}>Registrate ahora</Link>
              </p>
            </div>
          </form>
        </main>
      </Layout>
    </>
  )
}
