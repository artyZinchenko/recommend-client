import TagCloud from './components/TagCloud';
import { useState } from 'react';
import BestReviews from './components/BestReviews';
import LatestReviews from './components/LatestReviews';
import { Button, styled } from '@mui/material';
import './Home.scss';
import { useTranslation } from 'react-i18next';

interface StyledProps {
    selected: boolean;
}

const StyledButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'selected',
})<StyledProps>(({ theme, selected }) => ({
    color: selected ? theme.palette.primary.dark : theme.palette.primary.light,
}));

const Home = () => {
    const [bestSelected, setBestSelected] = useState(true);
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
                        {t('home.last')}
                    </StyledButton>
                </div>
                {bestSelected ? <BestReviews /> : <LatestReviews />}
            </div>
        </div>
    );
};

export default Home;
