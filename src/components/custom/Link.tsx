import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

interface Props {
    children: ReactNode;
    to: string;
}

const Link = ({ children, to }: Props) => {
    return (
        <RouterLink to={to} style={{ textDecoration: 'none' }}>
            <MuiLink variant='body2'>{children}</MuiLink>
        </RouterLink>
    );
};

export default Link;
