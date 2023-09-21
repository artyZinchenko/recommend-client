import { useState } from 'react';
import Form from './Form';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RootCreateAcc = () => {
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className='flex-column justify-center items-center'>
            {success ? (
                <div className='flex-column items-center align-center pt-2'>
                    <Button onClick={() => navigate('/registration/sign-in')}>
                        {t('registration.sign_in')}
                    </Button>
                </div>
            ) : (
                <Form setSuccess={setSuccess} />
            )}
        </div>
    );
};

export default RootCreateAcc;
