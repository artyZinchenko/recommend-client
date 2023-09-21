/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useState, useContext } from 'react';

const initialData = {
    notification: null,
    setNotification: () => {},
};

interface NotificationAction {
    name: string;
    handler: () => void;
}

interface Notification {
    type: 'error' | 'success';
    message: string;
    action?: NotificationAction;
}

interface NotificationContextValues {
    notification: Notification | null;
    setNotification: React.Dispatch<React.SetStateAction<Notification | null>>;
}

const NotificationContext =
    createContext<NotificationContextValues>(initialData);

interface Props {
    children: ReactNode;
}

const NotificationContextProvider = ({ children }: Props) => {
    const [notification, setNotification] = useState<Notification | null>(null);

    return (
        <NotificationContext.Provider
            value={{
                notification,
                setNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = () => useContext(NotificationContext);

export default NotificationContextProvider;
