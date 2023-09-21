/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketContextValue {
    socket: Socket | null;
}

const initialData = {
    socket: null,
};

const SocketContext = createContext<SocketContextValue>(initialData);

interface Props {
    children: ReactNode;
}

export function SocketProvider({ children }: Props) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io('https://recommend-server.onrender.com');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}

export function useSocket() {
    return useContext(SocketContext);
}
