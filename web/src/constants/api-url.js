import template from 'lodash/template';

const apiUrl = {
    users: '/users',
    userAuth: '/users/auth',
    userAuthToken: '/users/auth/token',
    topics: '/topics',
    topic: template('/topics/<%= topicId %>'),
    topicSearch: '/topics/search',
    chats: template('/chats/<%= topicId %>'),
    favorites: '/favorites',
};

export default apiUrl;
