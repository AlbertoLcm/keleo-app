// pages/VerifyEmailPage.tsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '@/routes/paths';


const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { verifyEmail } = useAuth();
  const [message, setMessage] = useState('Verificando tu correo electrónico...');

  // 1. Obtener el token de la URL
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setMessage('Error: No se encontró el token de verificación.');
      return;
    }

    // 2. Enviar el token al backend de NestJS
    const verifyAccount = async () => {
      try {
        await verifyEmail(token);
        
        // 3. Éxito: Mostrar mensaje y redirigir
        setMessage('✅ ¡Correo verificado con éxito! Ingresando espera...');
        setTimeout(() => {
          navigate(ROUTES.INDEX);
        }, 3000);

      } catch (error) {
        const errorMessage = axios.isAxiosError(error) 
          ? error.response?.data?.message || 'Error al verificar. El token puede ser inválido o haber expirado.'
          : 'Ocurrió un error desconocido.';
          
        setMessage(`❌ Error de verificación: ${errorMessage}`);
      }
    };

    verifyAccount();
  }, [token, navigate]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Verificación de Cuenta</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmailPage;