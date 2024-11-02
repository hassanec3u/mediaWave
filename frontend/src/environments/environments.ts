export const environment = {
    production: false,
    backend: {
        protocol: 'http',
        host: 'localhost',
        port: '3000',
        endpoints: {
            userInfo: `/user/`,
            updateUserInfo: `/user/`,
            uploadPicture: '/upload',
            updateProfilePicture: '/user/picture/'
        },
    },
};