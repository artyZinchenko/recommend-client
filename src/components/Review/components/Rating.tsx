import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Label } from '@primer/react';
import { SyntheticEvent, useState } from 'react';

function valuetext(value: number) {
    return `${value}°C`;
}

interface Props {
    setRating: React.Dispatch<React.SetStateAction<number>>;
    rating: number;
}

const Rating = ({ rating, setRating }: Props) => {
    const handleSliderChange = (
        event: Event | SyntheticEvent<Element, Event>,
        newValue: number | number[]
    ) => {
        if (Array.isArray(newValue)) return;

        setRating(newValue);
    };

    return (
        <Box className='flex items-center'>
            <Typography>Rate product</Typography>
            <Slider
                aria-label='Rating'
                value={rating}
                onChange={handleSliderChange}
                getAriaValueText={valuetext}
                valueLabelDisplay='auto'
                step={1}
                min={1}
                max={10}
            />
        </Box>
    );
};

export default Rating;
