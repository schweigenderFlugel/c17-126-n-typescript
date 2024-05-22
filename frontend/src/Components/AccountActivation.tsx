import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import { ActivationRow } from "../Components/ActivationRow";
import { ICodeBlocks, ISign } from "../Interfaces/auth.interface";
import { activate } from "../Services/user";
import { useAuth } from "../Hooks/useAuth";
import { ButtonAuthForm } from "../Components/ButtonAuthForm";
import { NormalContainer } from "../Components/ActivationFormContainer";
import { ERROR_MESSAGES } from "../data/enums";
import { ServerErrorResponse } from "../Interfaces/error.interface";

export const ActivationForm = ({ email }: { email: ISign['email']}) => {
  const { setLoadingUser, setUpdateData, setAccessToken } = useAuth()
  const [showCode, setShowCode] = useState<boolean>(false);
  const [inputError, setInputError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialValue: ICodeBlocks = {
    first: '',
    second: '',
    third: '',
    fourth: ''
  }

  const codeInputType = showCode ? 'text' : 'password';

  const [formValues, setFormValues] = useState<ICodeBlocks>(initialValue);
  const [activationCode, setActivationCode] = useState<ISign['activationCode'] | null>(null)

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    setActivationCode(
      `${formValues.first}-${formValues.second}-${formValues.third}-${formValues.fourth}`
    );
  }, [formValues])

  useEffect(() => {
    if(
      formValues.first.length < 4 || 
      formValues.second.length < 4 ||
      formValues.third.length < 4 ||
      formValues.fourth.length < 4
    ) {
      setInputError(true)
    } else {
      setInputError(false)
    }
  }, [formValues])

  const handleReset = () => {
    setFormValues(initialValue);
    setActivationCode(null);
  }

  const onActivationError = async (serverError: AxiosError<ServerErrorResponse>) => {
    if (
      serverError.response?.status === 403 &&
      serverError.response.data.error.message === ERROR_MESSAGES.INVALID_CODE
    ) {
      const error = 'Código inválido';
      toast.error(error);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    activationCode === activationCode?.toUpperCase()
    try {
      const { accessToken } = await activate(email, activationCode);
      setIsLoading(true);
      setLoadingUser(true);
      setAccessToken(accessToken);
      setUpdateData(true);
      setActivationCode(null);
      setFormValues(initialValue);
    } catch (error) {
      onActivationError(error as AxiosError<ServerErrorResponse>)
    } finally {
      setLoadingUser(false);
      setIsLoading(false);
    }
  }

  return(
    <NormalContainer subtitle="Debemos validar que eres tú. Te hemos enviado un código a tu correo, el cual deberás ingresar aquí">
      <form onSubmit={handleSubmit}>
        <div className="inline-flex items-center">
          <ActivationRow
            onChange={handleChange}
            type={codeInputType}
            value={formValues.first}
            key="first"
            name="first"
            showCode={showCode}
            error={inputError}
          />
          <p className="text-black dark:text-white font-bold ml-2 mr-2">-</p>
          <ActivationRow
            onChange={handleChange}
            type={codeInputType}
            value={formValues.second}
            key="second"
            name="second"
            showCode={showCode}
            error={inputError}
          />
          <p className="text-black dark:text-white font-bold ml-2 mr-2">-</p>
          <ActivationRow
            onChange={handleChange}
            type={codeInputType}
            value={formValues.third}
            key="third"
            name="third"
            showCode={showCode}
            error={inputError}
          />
          <p className="text-black dark:text-white font-bold ml-2 mr-2">-</p>
          <ActivationRow
            onChange={handleChange}
            type={codeInputType}
            value={formValues.fourth}
            key="fourth"
            name="fourth"
            showCode={showCode}
            error={inputError}
          />
          <button
            type="button"
            onClick={() => setShowCode(!showCode)}
            className="ml-3 text-black hover:text-indigo-500 dark:hover:text-indigo-500 dark:text-white cursor-pointer"
          >
            {showCode ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
          </button>
        </div>
        <div className="my-4">
          <ButtonAuthForm
            label="Activar"
            disabled={
              formValues.first.length < 4 ||
              formValues.second.length < 4 || 
              formValues.third.length < 4 ||
              formValues.fourth.length < 4
            }
            isLoading={isLoading}
          />
          <button
            className="border-indigo-500 dark:border-white hover:bg-indigo-200/50 dark:hover:bg-indigo-500/20 disabled:bg-inherit dark:disabled:bg-inherit mr-3 px-4 max-sm:px-2 py-3 border rounded-lg disabled:text-gray-400 dark:text-white transition disabled:cursor-not-allowed"
            type="button"
            onClick={handleReset}
            disabled={isLoading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </NormalContainer>
  )
}