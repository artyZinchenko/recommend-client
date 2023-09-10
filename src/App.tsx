import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Home from './components/Home/Home';
import Registration from './components/Registration/Registration';
import {
    Container,
    ThemeProvider,
    createTheme,
    useMediaQuery,
} from '@mui/material';
import './styles/main.scss';
import { AuthContextProvider, useAuthContext } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AccountPage from './components/Account/AccountPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SocketProvider } from './context/SocketProvider';
import AdminProtected from './components/RouteProtection/AdminProtected';
import AdminPanel from './components/AdminPanel/AdminPanel';
import RootRegistration from './components/Registration/RootRegistration';
import SignedInProtected from './components/RouteProtection/SignedInProtected';
import RootReview from './components/Review/RootReview';
import { IsLoadingProvider } from './context/IsLoadingProvider';
import DetailedReview from './components/ReviewDisplay/DetailedReview/DetailedReview';
import QueryPage from './components/QueryPage/QueryPage';
import './index.scss';
import { useMemo } from 'react';

function App() {
    const queryClient = new QueryClient();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode]
    );

    return (
        <div className='App'>
            <SocketProvider>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <BrowserRouter>
                            <AuthContextProvider>
                                <IsLoadingProvider>
                                    <AppBar />
                                    <div className='container'>
                                        <Routes>
                                            <Route
                                                path='*'
                                                element={
                                                    <Navigate
                                                        to='/home'
                                                        replace
                                                    />
                                                }
                                            />
                                            <Route
                                                path='/home'
                                                element={<Home />}
                                            />
                                            <Route
                                                path='/reviews'
                                                element={<QueryPage />}
                                            />
                                            <Route
                                                path='/review/:reviewId'
                                                element={<DetailedReview />}
                                            />
                                            <Route
                                                path='/registration/*'
                                                element={
                                                    <SignedInProtected>
                                                        <RootRegistration />
                                                    </SignedInProtected>
                                                }
                                            />
                                            <Route
                                                path='/create-review'
                                                element={<RootReview />}
                                            />
                                            <Route
                                                path='account/:userId/*'
                                                element={<AccountPage />}
                                            />
                                            <Route
                                                path='/admin-panel'
                                                element={
                                                    <AdminProtected>
                                                        <AdminPanel />
                                                    </AdminProtected>
                                                }
                                            />
                                        </Routes>
                                    </div>
                                </IsLoadingProvider>
                            </AuthContextProvider>
                        </BrowserRouter>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </ThemeProvider>
                </QueryClientProvider>
            </SocketProvider>
        </div>
    );
}

export default App;
