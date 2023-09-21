import { Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className='flex-column p-10 justify-center items-center gap-3'>
            <Typography variant='h6'>{t('error.whoops')}</Typography>
            <Typography variant='h5'>{t('error.notfound')}</Typography>
            <Button variant='contained' onClick={() => navigate('/home')}>
                {t('general.home')}
            </Button>
        </div>
    );
};

export default NotFound;
