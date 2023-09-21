import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Label } from '@primer/react';
import { SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    setScore: React.Dispatch<React.SetStateAction<number>>;
    score: number;
}

const Score = ({ score, setScore }: Props) => {
    const { t } = useTranslation();

    const handleSliderChange = (
        event: Event | SyntheticEvent<Element, Event>,
        newValue: number | number[]
    ) => {
        if (Array.isArray(newValue)) return;

        setScore(newValue);
    };

    return (
        <Box className='flex items-center'>
            <Typography variant='body1'>{t('create.rate')}</Typography>
            <Slider
                aria-label='Score'
                value={score}
                onChange={handleSliderChange}
                valueLabelDisplay='auto'
                step={1}
                min={1}
                max={10}
            />
        </Box>
    );
};

export default Score;
