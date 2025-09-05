export const environment = {
  production: false,

  backend: {
    protocol: 'http',
    host: 'localhost',
    port: 8080,

    endpoints: {
      auth: {
        login: '/auth/login',
        register: '/auth/register',
      },
      user: {
        base: '/user',
        info: '/user',
        update: (id: string) => `/user/${id}`,
        picture: (id: string) => `/user/picture/${id}`,
        friends: {
          list: '/user/friend',
          search: '/user/friend/search',
          pending: '/user/friend/pending',
          add: (friendId: string) => `/user/friend/${friendId}`,
          remove: (friendId: string) => `/user/friend/${friendId}`,
          accept: (friendId: string) => `/user/friend/${friendId}/accept`,
          refuse: (friendId: string) => `/user/friend/${friendId}/refuse`,
        },
      },
      posts: {
        base: '/post',
        add: '/post',
        myPosts: '/post',
        update: '/post',
        friendPost : '/post/friendPost',
        delete: (id: string) => `/post/${id}`,
        comments: {
          list: (postId: string) => `/post/${postId}/comment`,
          add: (postId: string) => `/post/${postId}/comment`,
          delete: (postId: string, commentId: string) =>
            `/post/${postId}/comment/${commentId}`,
        },
        likes: {
          like: (postId: string) => `/post/${postId}/like`,
          unlike: (postId: string) => `/post/${postId}/like`,
          count: (postId: string) => `/post/${postId}/like/count`,
          hasLiked: (postId: string) => `/post/${postId}/like/has-liked`,
        },
      },
      upload: '/upload',
    },
  },

  defaultImageProfile:
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
};
