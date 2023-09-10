import { TagCloud as MyTagCloud } from 'react-tagcloud';
import { Typography } from '@mui/material';
import { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
interface Props {
    data: any[] | undefined;
}

const Tags = ({ data }: Props) => {
    const navigate = useNavigate();
    if (!data) return null;

    const customRenderer = (tag: any, size: any, color: any) => {
        return (
            <span key={tag.value} style={{ color }} className={`tag-${size}`}>
                <Typography
                    sx={{ fontSize: `${size}px` }}
                    onClick={() =>
                        navigate(`/reviews?t=${'tag'}&q=${tag.value.slice(1)}`)
                    }
                    className='pointer'
                >
                    {tag.value}
                </Typography>
            </span>
        );
    };

    return (
        <MyTagCloud
            minSize={30}
            maxSize={50}
            tags={data}
            colorOptions={{ luminosity: 'light', hue: 'blue' }}
            renderer={customRenderer}
        />
    );
};

export default React.memo(Tags);
