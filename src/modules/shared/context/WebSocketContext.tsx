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

    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const socketInstance = io(backendUrl, {
      path: '/socket.io',
    });

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      setIsConnected(true);
      socketInstance.emit('joinRestaurantRoom', { restaurantId, userId: user?.id });
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
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
