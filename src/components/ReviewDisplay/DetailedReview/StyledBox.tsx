import { Box, styled } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const MyBox = styled(Box)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? `rgba(255, 255, 255, 0.05)`
            : '#d7d5d55a',
    color: theme.palette.text.primary,
    transition: `box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
    borderRadius: `4px`,
    padding: '0.7em 1.3em',
}));

const StyledBox = ({ children }: Props) => {
    return <MyBox>{children}</MyBox>;
};
export default StyledBox;
