import { useState } from 'react';
import Form from './Form';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
    setNotification: React.Dispatch<React.SetStateAction<string>>;
}

const RootCreateAcc = ({ setNotification }: Props) => {
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    return (
        <div className='flex-column justify-center items-center'>
            {success ? (
                <div className='flex-column items-center align-center pt-2'>
                    <Button onClick={() => navigate('/registration/sign-in')}>
                        Sign in
                    </Button>
                </div>
            ) : (
                <Form
                    setNotification={setNotification}
                    setSuccess={setSuccess}
                />
            )}
        </div>
    );
};

export default RootCreateAcc;
