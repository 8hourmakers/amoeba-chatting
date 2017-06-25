function topicRoutingConfig($stateProvider) {
    $stateProvider
        .state('topicHome', {
            url: '/topic/:topicId',
            resolve: {
                auth: ['authService', authService => authService.isAuthorized()],
            },
            template: '<app-topic-home></app-topic-home>',
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
