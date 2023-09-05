import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../../context/AuthContext';
import { getUsers } from '../../services/admin.services/getUsers';
import {
    Dialog,
    DialogTitle,
    List,
    ListItem,
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

interface Props {}
const AdminPanel = (props: Props) => {
    const { user, token } = useAuthContext();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

    const { data, isError, isSuccess } = useQuery({
        queryKey: ['admin'],
        queryFn: async () => {
            const data = await getUsers(token);

            console.log(data);
            return data.users;
        },
    });

    return (
        <div>
            AdminPanel
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Number of reviews</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.map((user) => {
                                return (
                                    <>
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
                                                    {user.role}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                    {user.user_status}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align='right'>
                                                <Typography>
                                                    {user.reviews?.length}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <AdminActions handleClose={handleClose} user={selectedUser} />
            </Menu>
        </div>
    );
};
export default AdminPanel;
