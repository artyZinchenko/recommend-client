/* eslint-disable @typescript-eslint/no-empty-function */
import {
    useContext,
    createContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import { refresh } from '../services/user.services/refresh';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { LoginResponse } from '../services/user.services/login';

interface AuthContextValue {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logOut: () => void;
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    setUserData: (data: LoginResponse) => void;
}

const AuthContext = createContext<AuthContextValue>({
    user: null,
    setUser: () => {},
    logOut: () => {},
    token: '',
    setToken: () => {},
    setUserData: () => {},
});

interface Props {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState('');
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token-recommend');
        if (!storedToken) return;

        async function refreshUser(token: string) {
            const data = await refresh(token);

            if (data.user) {
                setUser(data.user);
                setToken(token);
            }
        }

        if (!user || !token) {
            refreshUser(storedToken);
        }
    }, []);

    const setUserData = (data: LoginResponse) => {
        setUser(data.user);
        setToken(data.token);
        window.localStorage.setItem('token-recommend', data.token);
    };

    const logOut = async () => {
        setUser(null);
        setToken('');
        window.localStorage.removeItem('token-recommend');
        queryClient.removeQueries({ queryKey: [user?.id_user] });
        navigate('/home');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logOut,
                token,
                setToken,
                setUserData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
