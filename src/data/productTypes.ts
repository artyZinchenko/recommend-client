export interface ProductType {
    type: string;
    name: string;
}

export const productTypes: ProductType[] = [
    { type: 'Book', name: 'Book' },
    { type: 'Movie', name: 'Movie' },
    { type: 'TV_Series', name: 'TV Series' },
    { type: 'Computer_Game', name: 'Computer Game' },
    { type: 'Music_Album', name: 'Music Album' },
    { type: 'Board_Game', name: 'Board Game' },
    { type: 'Mobile_App', name: 'Mobile App' },
];
