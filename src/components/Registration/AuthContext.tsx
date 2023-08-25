/* eslint-disable @typescript-eslint/no-empty-function */
import {
    useContext,
    createContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import {
    getAuth,
    getRedirectResult,
    onAuthStateChanged,
    signInWithRedirect,
    signOut,
} from 'firebase/auth';
import { app } from '../../firebase-config';

interface AuthContextValue {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logOut: () => void;
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    // resolvingUser: boolean;
    // setResolvingUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextValue>({
    user: null,
    setUser: () => {},
    logOut: () => {},
    token: '',
    setToken: () => {},
    // resolvingUser: false,
    // setResolvingUser: () => {},
});

interface Props {
    children: ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState('');
    // const [resolvingUser, setResolvingUser] = useState(true);

    // const queryClient = useQueryClient();
    // const navigate = useNavigate();
    // const { setSignInModalOpen } = useModalContext();

    // const googleSignIn = async () => {
    //     const provider = new GoogleAuthProvider();
    //     const auth = getAuth(app);
    //     setResolvingUser(true);
    //     signInWithRedirect(auth, provider);
    // };

    const logOut = async () => {
        const auth = getAuth(app);

        try {
            await signOut(auth);
            setUser(null);
            setToken('');
            // queryClient.removeQueries({ queryKey: ['user-data'], exact: true });
            // navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     const auth = getAuth(app);

    //     const unsubscribe = onAuthStateChanged(
    //         auth,
    //         async (user: User | null) => {
    //             if (user) {
    //                 setUser(user);
    //                 try {
    //                     const token = await user.getIdToken();
    //                     setToken(token);
    //                 } catch (e) {
    //                     console.log(e);
    //                 }
    //                 setResolvingUser(false);
    //             }
    //         }
    //     );
    //     return () => {
    //         unsubscribe();
    //     };
    // });

    // useEffect(() => {
    //     const auth = getAuth(app);

    //     getRedirectResult(auth)
    //         .then((result) => {
    //             setResolvingUser(false);
    //             result?.user && setUser(result.user);
    //             // setSignInModalOpen(false);
    //             console.log('redirect result: ', result?.user.displayName);
    //         })
    //         .catch((error) => {
    //             const errorMessage = error.message;
    //             console.log(errorMessage);
    //             console.log('redirect error');
    //         });
    // }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logOut,
                token,
                setToken,
                // resolvingUser,
                // setResolvingUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
