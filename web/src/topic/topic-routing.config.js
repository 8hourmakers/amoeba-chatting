function topicRoutingConfig($stateProvider) {
    $stateProvider
        .state('topicHome', {
            url: '/topic/:topicId',
            resolve: {
                auth: ['authService', authService => authService.isAuthorized()],
            },
            template: '<app-topic-home></app-topic-home>',
        })
        .state('favorite', {
            url: '/favorite',
            resolve: {
                auth: ['authService', authService => authService.isAuthorized()],
            },
            template: '<app-favorite-page></app-favorite-page>',
        })
        .state('chatRoom', {
            url: '/chat/:topicId',
            resolve: {
                auth: ['authService', authService => authService.isAuthorized()],
            },
            template: '<app-chat-room></app-chat-room>',
        });
}

topicRoutingConfig.$inject = [
    '$stateProvider',
];

export default topicRoutingConfig;
