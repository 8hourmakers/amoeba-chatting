function registerRoutingConfig($stateProvider) {
    $stateProvider.state('register', {
        url: '/register',
        template: '<app-register></app-register>',
    });
}

registerRoutingConfig.$inject = [
    '$stateProvider',
];

export default registerRoutingConfig;
