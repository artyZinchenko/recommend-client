import { Alert, AlertTitle, Typography } from '@mui/material';

interface Props {
    error?: unknown;
}

const ErrorComponent = ({ error }: Props) => {
    if (error instanceof Error)
        return (
            <div className='flex-row items-center justify-center'>
                <Alert severity='error' className='width-fit'>
                    <AlertTitle>
                        {error?.name ? error.name : 'Error'}
                    </AlertTitle>
                    Something went wrong!
                    {error?.message && <Typography>{error.message}</Typography>}
                </Alert>
            </div>
        );

    return (
        <div className='width-fit'>
            <Alert severity='error'>
                <AlertTitle>'Error'</AlertTitle>
                Something went wrong!
            </Alert>
        </div>
    );
};
export default ErrorComponent;
