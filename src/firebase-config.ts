import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyDSQ9W6FTO0tvgSSR20dSXpdKDcVGwrRDM',
    authDomain: 'recommend-client.firebaseapp.com',
    projectId: 'recommend-client',
    storageBucket: 'recommend-client.appspot.com',
    messagingSenderId: '565091331514',
    appId: '1:565091331514:web:afa17cf7e5342591e64183',
};

export const app = initializeApp(firebaseConfig);
