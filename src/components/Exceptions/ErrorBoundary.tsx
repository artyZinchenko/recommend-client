import { Button, Typography } from '@mui/material';
import React, { Component, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    handleHomeButtonClick = () => {
        const navigate = useNavigate();
        navigate('/');
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className='flex-column p-10 justify-center items-center gap-3'>
                    <Typography variant='h5'>Whoops!</Typography>
                    <Typography variant='h6'>Something went wrong</Typography>
                    <Button
                        onClick={() => {
                            window.location.reload();
                        }}
                    >
                        Reload
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}
