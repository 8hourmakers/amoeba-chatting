function topicRoutingConfig($stateProvider) {
    $stateProvider
        .state('app.topicHome', {
            url: '/topic/:topicId',
            template: '<app-topic-home></app-topic-home>',
        })
        .state('app.chatRoom', {
            url: '/chat/:topicId',
            template: '<app-chat-room></app-chat-room>',
        });
}

topicRoutingConfig.$inject = [
    '$stateProvider',
];

export default topicRoutingConfig;
