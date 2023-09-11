import { Routes, Route } from 'react-router-dom';
import { useReviews } from '../../hooks/useReviews';
import DetailedReview from '../ReviewDisplay/DetailedReview/DetailedReview';
import ReviewList from '../ReviewDisplay/ReviewList/ReviewList';
import { useAuthContext } from '../../context/AuthContext';
import TagCloud from './components/TagCloud';
import { memo, useState } from 'react';
import BestReviews from './components/BestReviews';
import LatestReviews from './components/LatestReviews';
import { Button, Paper, Theme, styled, useTheme } from '@mui/material';
import './Home.scss';
import { Trans, useTranslation } from 'react-i18next';

interface Props {}

interface StyledProps {
    selected: boolean;
}

const StyledButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'selected',
})<StyledProps>(({ theme, selected }) => ({
    color: selected ? theme.palette.primary.dark : theme.palette.primary.light,
}));

const Home = (props: Props) => {
    const [bestSelected, setBestSelected] = useState(true);
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <div className='flex-column gap-2 items-center'>
            <TagCloud />
            <div className='home-reviews-container'>
                <div className='flex-row justify-between'>
                    <StyledButton
                        variant='text'
                        selected={bestSelected ? true : false}
                        onClick={() => setBestSelected(true)}
                    >
                        {t('home.best')}
                    </StyledButton>
                    <StyledButton
                        variant='text'
                        selected={bestSelected ? false : true}
                        onClick={() => setBestSelected(false)}
                    >
                        Last reviews
                    </StyledButton>
                </div>
                {bestSelected ? <BestReviews /> : <LatestReviews />}
            </div>
        </div>
    );
};

export default Home;
