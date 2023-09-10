import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

interface Props {
    children: ReactNode;
}

const SignedInProtected = ({ children }: Props) => {
    const { user } = useAuthContext();

    if (user) {
        return <Navigate to='/home' replace />;
    }

    return <>{children}</>;
};

export default SignedInProtected;
