import { styled, alpha, useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Button, InputBase, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
        width: 'auto',
        marginLeft: theme.spacing(1),
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '10em',
            '&:focus': {
                width: '20em',
            },
        },
        [theme.breakpoints.down('sm')]: {
            width: '10em',
            '&:focus': {
                width: '15em',
            },
        },
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const SearchButton = styled(Button)(({ theme }) => ({
    color: theme.palette.background.default,
}));

const Search = () => {
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const keyPress = (
        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (e.key === 'Enter') {
            navigate(`/reviews?t=${'fulltext'}&q=${text}`);
            setText('');
        }
    };

    return (
        <SearchBox>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder='Search…'
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => keyPress(e)}
            />
        </SearchBox>
    );
};
export default Search;
