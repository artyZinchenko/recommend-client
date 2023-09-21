interface ConfigObject {
    apiBaseUrl?: string;
}

let config: ConfigObject = {
    apiBaseUrl: 'https://recommend-server.onrender.com/api',
};

// if (process.env.NODE_ENV === 'development') {
//     config = {
//         apiBaseUrl: 'https://recommend-server.onrender.com',
//     };
// } else if (process.env.NODE_ENV === 'production') {
//     config = {
//         apiBaseUrl: 'https://recommend-server.onrender.com',
//     };
// }

export default config;
