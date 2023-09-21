import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Home from './components/Home/Home';
import { Box, CssBaseline } from '@mui/material';
import './styles/main.scss';
import { AuthContextProvider } from './context/AuthContext';
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
import DrawerContextProvider from './context/DrawerContext';
import Drawer from './components/Drawer/Drawer';
import ColorModeContextProvider from './context/ColorModeContext';
import NotificationContextProvider from './context/NotificationContext';
import ErrorBoundary from './components/Exceptions/ErrorBoundary';
import NotFound from './components/Exceptions/NotFound';

function App() {
    const queryClient = new QueryClient();

    return (
        <Box className='App'>
            <QueryClientProvider client={queryClient}>
                <SocketProvider>
                    <ColorModeContextProvider>
                        <CssBaseline />
                        <BrowserRouter>
                            <AuthContextProvider>
                                <IsLoadingProvider>
                                    <NotificationContextProvider>
                                        <DrawerContextProvider>
                                            <ErrorBoundary>
                                                <AppBar />
                                                <Drawer />
                                                <div className='container'>
                                                    <Routes>
                                                        <Route
                                                            path='/'
                                                            element={
                                                                <Navigate to='/home' />
                                                            }
                                                        />
                                                        <Route
                                                            path='*'
                                                            element={
                                                                <NotFound />
                                                            }
                                                        />
                                                        <Route
                                                            path='/home'
                                                            element={<Home />}
                                                        />
                                                        <Route
                                                            path='/reviews'
                                                            element={
                                                                <QueryPage />
                                                            }
                                                        />
                                                        <Route
                                                            path='/review/:reviewId'
                                                            element={
                                                                <DetailedReview />
                                                            }
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
                                                            element={
                                                                <RootReview />
                                                            }
                                                        />
                                                        <Route
                                                            path='account/:userId/*'
                                                            element={
                                                                <AccountPage />
                                                            }
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
                                            </ErrorBoundary>
                                        </DrawerContextProvider>
                                    </NotificationContextProvider>
                                </IsLoadingProvider>
                            </AuthContextProvider>
                        </BrowserRouter>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </ColorModeContextProvider>
                </SocketProvider>
            </QueryClientProvider>
        </Box>
    );
}

export default App;
