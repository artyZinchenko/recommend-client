/* eslint-disable @typescript-eslint/no-empty-function */
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import {
    createContext,
    ReactNode,
    useState,
    useContext,
    useMemo,
    useEffect,
} from 'react';

const initialData = {
    colorMode: 'light',
    toggleColorMode: () => {},
};

interface ColorModeContextValues {
    colorMode: string;
    toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextValues>(initialData);

interface Props {
    children: ReactNode;
}

const ColorModeContextProvider = ({ children }: Props) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        window.localStorage.setItem(
            'mode-recommend',
            mode === 'light' ? 'dark' : 'light'
        );
    };

    useEffect(() => {
        if (window.localStorage.getItem('mode-recommend') === 'dark') {
            setMode('dark');
        } else {
            setMode(prefersDarkMode ? 'dark' : 'light');
        }
    }, []);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: mode,
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider
            value={{
                colorMode: mode,
                toggleColorMode,
            }}
        >
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export const useColorModeContext = () => useContext(ColorModeContext);

export default ColorModeContextProvider;
