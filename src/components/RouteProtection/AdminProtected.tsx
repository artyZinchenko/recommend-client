import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

interface Props {
    children: ReactNode;
}

const AdminProtected = ({ children }: Props) => {
    const { user } = useAuthContext();

    if (!user || user.role !== 'ADMIN') {
        return <Navigate to='/home' replace />;
    }

    return <>{children}</>;
};

export default AdminProtected;
