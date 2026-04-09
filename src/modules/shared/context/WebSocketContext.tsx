import { useAuth } from '@/modules/auth/hooks/useAuth';
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface WebSocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  isConnected: false,
});

export const useWebSocket = () => useContext(WebSocketContext);

interface WebSocketProviderProps {
  children: ReactNode;
  restaurantId: string | undefined;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children, restaurantId }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!restaurantId) return;

    // Conectar al backend WebSocket (usamos la misma URL base que la API)
    const backendUrl = import.meta.env.VITE_API_URL || 'https://api.keleo.app';
    const socketInstance = io(backendUrl, {
      path: '/socket.io', // ruta por defecto de NestJS websockets
    });

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('🔗 Conectado a WebSocket con ID:', socketInstance.id);
      
      // Emitimos el join a la sala del restaurante
      socketInstance.emit('joinRestaurantRoom', { restaurantId, userId: user?.id });
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('❌ Desconectado del WebSocket');
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [restaurantId]);

  return (
    <WebSocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};
