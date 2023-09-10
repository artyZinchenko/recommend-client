/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface IsLoadingValue {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialData = {
    isLoading: false,
    setIsLoading: () => {},
};

const IsLoadingContext = createContext<IsLoadingValue>(initialData);

interface Props {
    children: ReactNode;
}

export function IsLoadingProvider({ children }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </IsLoadingContext.Provider>
    );
}

export function useIsLoading() {
    return useContext(IsLoadingContext);
}
