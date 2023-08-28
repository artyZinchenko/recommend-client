import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Home from './components/Home/Home';
import Registration from './components/Registration/Registration';
import { Container } from '@mui/material';
import './styles/main.scss';
import Page from './components/Registration/CreateAccount/RootCreateAcc';
import SignIn from './components/Registration/SignIn/Form';
import { AuthContextProvider } from './components/Registration/AuthContext';
import RootSignIn from './components/Registration/SignIn/RootSignIn';
import RootCreateAcc from './components/Registration/CreateAccount/RootCreateAcc';
import CreateReview from './components/Review/ReviewForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AccountPage from './components/Account/AccountPage';
import ReviewList from './components/ReviewDisplay/ReviewList/ReviewList';

function App() {
    const queryClient = new QueryClient();

    return (
        <div className='App'>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <AuthContextProvider>
                        <AppBar />
                        <Container>
                            <Routes>
                                <Route
                                    path='*'
                                    element={<Navigate to='/home' replace />}
                                />
                                <Route path='/home' element={<Home />} />
                                <Route
                                    path='/registration/*'
                                    element={<Registration />}
                                />
                                <Route
                                    path='/registration/create-account'
                                    element={<RootCreateAcc />}
                                />
                                <Route
                                    path='/registration/sign-in'
                                    element={<RootSignIn />}
                                />
                                <Route
                                    path='/reviews/create'
                                    element={<CreateReview />}
                                />
                                <Route
                                    path='account/:userId/*'
                                    element={<AccountPage />}
                                />
                            </Routes>
                        </Container>
                    </AuthContextProvider>
                </BrowserRouter>
            </QueryClientProvider>
        </div>
    );
}

export default App;
