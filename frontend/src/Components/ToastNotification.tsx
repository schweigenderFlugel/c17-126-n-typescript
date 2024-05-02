import { Toaster } from 'react-hot-toast';
import { useAuth } from '../Hooks/useAuth';

export const ToastNotification = () => {
  const { darkMode } = useAuth();

  const backgroundColor = darkMode ? '#1e1b4b' : '#e0e7ff';
  const color = darkMode ? '#fff' : 'rgb(0, 0, 0, 0.8)';
  const border = darkMode
    ? '2px solid rgb(79, 70, 229)'
    : '1px solid rgb(165, 180, 252)';

  return (
    <Toaster
      position="bottom-center"
      containerStyle={{ margin: '8px' }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: '16px',
          marginBottom: '24px',
          marginLeft: '24px',
          maxWidth: '500px',
          padding: '16px 24px',
          backgroundColor,
          color,
          border,
        },
      }}
    />
  );
};
