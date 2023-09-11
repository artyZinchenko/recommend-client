/* eslint-disable @typescript-eslint/no-empty-function */
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
    useContext,
} from 'react';

const initialData = {
    drawerOpen: false,
    setDrawerOpen: () => {},
};

interface DrawerContextValues {
    drawerOpen: boolean;
    setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

const DrawerContext = createContext<DrawerContextValues>(initialData);

interface Props {
    children: ReactNode;
}

const DrawerContextProvider = ({ children }: Props) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <DrawerContext.Provider
            value={{
                drawerOpen,
                setDrawerOpen,
            }}
        >
            {children}
        </DrawerContext.Provider>
    );
};

export const useDrawerContext = () => useContext(DrawerContext);

export default DrawerContextProvider;
