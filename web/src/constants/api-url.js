import template from 'lodash/template';

const apiUrl = {
    users: '/amoeba_chatting/api/users/',
    userAuth: '/amoeba_chatting/api/users/auth/',
    userAuthToken: '/amoeba_chatting/api/users/auth/token/',
    topics: '/amoeba_chatting/api/topics/',
    topic: template('/amoeba_chatting/api/topics/<%= topicId %>/'),
    topicSearch: '/amoeba_chatting/api/topics/search/',
    topicFavorites: '/amoeba_chatting/api/favorites/',
    chats: template('/amoeba_chatting/api/chats/<%= topicId %>/'),
    favorites: '/amoeba_chatting/api/favorites/',
    image: '/amoeba_chatting/api/images/',
};

export default apiUrl;
