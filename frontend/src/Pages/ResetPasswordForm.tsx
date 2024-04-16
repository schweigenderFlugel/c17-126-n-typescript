import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { AuthFormContainer } from '../Components/AuthFormContainer';
import { AuthFormRow } from '../Components/AuthFormRow';
import { ButtonAuthForm } from '../Components/ButtonAuthForm';

type ResetPasswordFormType = {
  password: string;
  confirmPassword: string;
};

const initialValue: ResetPasswordFormType = {
  password: '',
  confirmPassword: '',
};

const sendResetPasswordData = (
  formValues: ResetPasswordFormType,
  token: string | undefined
) => {
  console.log({ formValues, token });
};

export const ResetPasswordForm = () => {
  const [formValues, setFormValues] =
    useState<ResetPasswordFormType>(initialValue);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      sendResetPasswordData(formValues, token);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [name]: value });
  };

  //🔴[TODO]:Reemplazar por el del hook
  const isLoading = false;

  const passwordInputType = showPassword ? 'text' : 'password';
  const confirmPasswordInputType = showConfirmPassword ? 'text' : 'password';

  return (
    <>
      <AuthFormContainer subtitle="Ingresa tu contraseña nueva">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-2">
            <AuthFormRow
              onChange={handleChange}
              value={formValues.password}
              type={passwordInputType}
              label="Contraseña"
              key="password"
              name="password"
              autoComplete="new-password"
              onClickPasswordBtn={() =>
                setShowPassword(showPassword => !showPassword)
              }
              required
              showPassword={showPassword}
            />
            <AuthFormRow
              onChange={handleChange}
              value={formValues.confirmPassword}
              type={confirmPasswordInputType}
              label="Confirmar Contraseña"
              key="confirmPassword"
              name="confirmPassword"
              autoComplete="new-password"
              onClickPasswordBtn={() =>
                setShowConfirmPassword(
                  showConfirmPassword => !showConfirmPassword
                )
              }
              required
              showPassword={showConfirmPassword}
            />
          </div>
          <div className="my-4">
            <ButtonAuthForm
              disabled={
                formValues.password.length < 6 ||
                formValues.password.length < 6 ||
                formValues.confirmPassword !== formValues.password
              }
              isLoading={isLoading}
              label="Restablecer contraseña"
            />
          </div>
        </form>
      </AuthFormContainer>
    </>
  );
};
