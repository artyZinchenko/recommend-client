import { TagCloud as MyTagCloud } from 'react-tagcloud';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import '../Home.scss';

interface Props {
    data: any[] | undefined;
}

const Tags = ({ data }: Props) => {
    const navigate = useNavigate();
    if (!data) return null;

    const customRenderer = (tag: any, size: any, color: any) => {
        return (
            <span
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    overflowBlock: 'visible',
                    margin: '0',
                    padding: '0',
                }}
            >
                <Typography
                    key={tag.value}
                    style={{ color }}
                    sx={{
                        height: `${size * 2.2}px`,
                        fontSize: `${size * 2}px`,
                        whiteSpace: 'nowrap',
                        overflow: 'visible',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        navigate(`/reviews?t=${'tag'}&q=${tag.value.slice(1)}`);
                    }}
                >
                    {tag.value}
                </Typography>
            </span>
        );
    };

    return (
        <MyTagCloud
            minSize={10}
            maxSize={35}
            tags={data}
            colorOptions={{ luminosity: 'light', hue: 'blue' }}
            renderer={customRenderer}
        />
    );
};

export default React.memo(Tags);
