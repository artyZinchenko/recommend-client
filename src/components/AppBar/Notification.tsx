import { Alert, AlertTitle, Button } from '@mui/material';
import { useNotificationContext } from '../../context/NotificationContext';
import { useTranslation } from 'react-i18next';

const Notification = () => {
    const { notification } = useNotificationContext();
    const { t } = useTranslation();

    if (notification) {
        return (
            <div className='flex-row items-center justify-center'>
                <Alert severity={notification?.type} className='width-fit'>
                    <AlertTitle>{t(`${notification?.message}`)}</AlertTitle>
                    {notification?.action && (
                        <Button onClick={notification?.action?.handler}>
                            {t(`${notification?.action?.name}`)}
                        </Button>
                    )}
                </Alert>
            </div>
        );
    }
    return null;
};
export default Notification;
