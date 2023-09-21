import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../../context/AuthContext';
import { getUsers } from '../../services/admin.services/getUsers';
import {
    Menu,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import AdminActions from './AdminActions';
import { useTranslation } from 'react-i18next';
import './Admin.scss';
import { useHandleIsLoading } from '../../hooks/useHandleIsLoading';
import { useIsLoading } from '../../context/IsLoadingProvider';

const AdminPanel = () => {
    const { token } = useAuthContext();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { t } = useTranslation();
    const { setIsLoading } = useIsLoading();

    const open = Boolean(anchorEl);
    const handleClick = (
        event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
        user: User
    ) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };

    const { data, isError, isSuccess, isLoading, isFetching } = useQuery({
        queryKey: ['admin'],
        queryFn: async () => {
            const data = await getUsers(token);

            console.log(data);
            return data.users;
        },
    });

    useHandleIsLoading(setIsLoading, isLoading, isSuccess, isError, isFetching);
    return (
        <>
            {t('admin.panel')}
            <TableContainer component={Paper} className='admin'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('general.email')}</TableCell>
                            <TableCell>{t('general.name')}</TableCell>
                            <TableCell>{t('admin.role')}</TableCell>
                            <TableCell>{t('admin.status')}</TableCell>
                            <TableCell>{t('admin.numReviews')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.map((user) => {
                                return (
                                    <TableRow
                                        key={user.id_user}
                                        className='pointer'
                                        onClick={(event) =>
                                            handleClick(event, user)
                                        }
                                    >
                                        <TableCell>
                                            <Typography>
                                                {user.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                {user.user_name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                {t(`admin.${user.role}`)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                {t(`admin.${user.user_status}`)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <Typography>
                                                {user.reviews?.length}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <AdminActions handleClose={handleClose} user={selectedUser} />
            </Menu>
        </>
    );
};
export default AdminPanel;
