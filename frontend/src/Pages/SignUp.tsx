import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { signup } from '../Services/user'
import { Modal } from '../Components/Modal'
import { ErrorMessage } from '../Components/ErrorMessage'

export const SignUp = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await signup({ email, password })
      navigate('/login', { replace: true })
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message)
        setOpenModal(true)
      }
    }
  }

  return (
    <>
      <Modal open={openModal}>
        <ErrorMessage>{error}</ErrorMessage>
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
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div>
            <label htmlFor="confirm-password">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              onChange={e => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-green-700 px-2 py-1 cursor-pointer rounded-lg disabled:opacity-50 disabled:cursor-default"
            disabled={email === '' && password === '' && confirmPassword === ''}
          >
            Registrar
          </button>
        </form>
      </main>
    </>
  )
}
