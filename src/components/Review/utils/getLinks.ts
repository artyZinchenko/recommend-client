import { storage } from '../../../firebase-config';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

export const getLinks = async (imageFiles: ImageFile[]): Promise<string[]> => {
    if (!imageFiles) return [];

    const links = [];

    for (const item of imageFiles) {
        const storageRef = ref(storage, `files/${item.name}`);

        const i = await uploadBytes(storageRef, item);
        const url = await getDownloadURL(i.ref);
        links.push(url);
    }

    return links;
};
