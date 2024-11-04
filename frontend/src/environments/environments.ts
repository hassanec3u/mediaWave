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
            updateProfilePicture: '/user/picture/',
            addPost: '/posts/',
            updatePost: '/posts/',
            deletePost: '/posts/',
            friendsPosts: '/friends/posts'
        },
    },
    defaultImageProfile: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
};