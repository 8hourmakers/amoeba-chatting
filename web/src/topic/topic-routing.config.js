function topicRoutingConfig($stateProvider) {
    $stateProvider
        .state('topicHome', {
            url: '/topic/:topicId',
            params: {
                previousState: true,
            },
            template: '<app-topic-home></app-topic-home>',
        })
        .state('chatRoom', {
            url: '/chat/:topicId',
            params: {
                previousState: true,
            },
            template: '<app-chat-room></app-chat-room>',
        });
}

topicRoutingConfig.$inject = [
    '$stateProvider',
];

export default topicRoutingConfig;
