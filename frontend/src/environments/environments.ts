import {comment} from 'postcss';

export const environment = {
  production: false,

  backend: {
    protocol: 'http',
    host: 'localhost',
    port: 8080,

    endpoints: {
      user: {
        base: '/user',
        info: '/user',
        update: (id: string) => `/user/${id}`,
        picture: (id: string) => `/user/picture/${id}`,
      },
      posts: {
        base: '/posts',
        add: '/posts',
        myPosts: '/posts',
        friends: '/posts/friends',
        update: (id: string) => `/posts/${id}`,
        delete: (id: string) => `/posts/${id}`,
        comments: {
          list: (postId: string) => `/posts/${postId}/comments`,
          add: (postId: string) => `/posts/${postId}/comments`,
          delete: (postId: string,commentId :string) => `/posts/${postId}/comments/${commentId}`,
        },
      },
      upload: '/upload',
    },
  },

  defaultImageProfile:
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
};
