import { Button, Typography } from '@mui/material';
import Form from './Form';
import { useState } from 'react';

interface Props {
    setNotification: React.Dispatch<React.SetStateAction<string>>;
}

const RootSignIn = ({ setNotification }: Props) => {
    return (
        <div className='flex-column justify-center items-center'>
            <Form setNotification={setNotification} />
        </div>
    );
};
export default RootSignIn;
