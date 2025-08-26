import api from '@/api/axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '@/routes/paths';
import { LoadingScreen } from '@/modules/shared';

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const { userSet } = useAuth();


  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Llamamos al endpoint de perfil. 
        // Como la cookie ya está en el navegador, Axios la enviará sola.
        const response = await api.get('/auth/profile');

        // Aquí deberías guardar los datos del usuario en tu Contexto o Zustand
        // setAuthUser(response.data);
        userSet(response.data);


        // Si todo está bien, al Dashboard
        navigate(ROUTES.RESTAURANTS.INDEX, { replace: true });
      } catch (error) {
        console.error('Error al validar sesión con Google', error);
        navigate('/login', { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoadingScreen />
    </div>
  );
};

export default GoogleSuccess;