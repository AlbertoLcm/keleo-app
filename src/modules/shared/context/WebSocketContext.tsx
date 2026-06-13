import { useAuth } from '@/modules/auth/hooks/useAuth';
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { sileo } from 'sileo';
import { ChefHat, Users, ShoppingBag, Armchair } from 'lucide-react';
import { sendWebNotification } from '@/utils/notifications';

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

    const backendUrl = 'https://api.keleo.app';
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

    socketInstance.on('kitchenUpdated', (data: any) => {
      const title = "Actualización de Cocina";
      const body = data?.message || "Hay cambios en las comandas en preparación.";
      sileo.info({
        title,
        description: body,
        position: "top-center",
        duration: 4000,
        icon: <ChefHat className="text-blue-500" size={18} />,
      });
      sendWebNotification(title, { body });
    });

    socketInstance.on('employeeStatusChanged', (data: { employeeId: string; isOnline: boolean; employeeName?: string }) => {
      const name = data?.employeeName || "Un miembro del equipo";
      const statusText = data?.isOnline ? "conectado (En Turno)" : "desconectado";
      const title = "Estado de Personal";
      const body = `${name} se ha ${statusText}.`;
      sileo.show({
        title,
        description: body,
        type: data?.isOnline ? "success" : "warning",
        duration: 3500,
        position: "top-center",
        icon: <Users className={data?.isOnline ? "text-green-500" : "text-amber-500"} size={18} />,
      });
      sendWebNotification(title, { body });
    });

    socketInstance.on('orderUpdated', (data: any) => {
      const title = "Pedido Actualizado";
      const body = data?.message || "Se ha modificado el estado o contenido de un pedido.";
      sileo.success({
        title,
        description: body,
        position: "top-center",
        duration: 4000,
        icon: <ShoppingBag className="text-emerald-500" size={18} />,
      });
      sendWebNotification(title, { body });
    });

    socketInstance.on('tableUpdated', (data: any) => {
      const title = "Mesa Actualizada";
      const body = data?.message || "El estado o los detalles de una mesa han cambiado.";
      sileo.info({
        title,
        description: body,
        position: "top-center",
        duration: 3500,
        icon: <Armchair className="text-indigo-500" size={18} />,
      });
      sendWebNotification(title, { body });
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [restaurantId, user?.id]);

  return (
    <WebSocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};

