function loginRoutingConfig($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        template: '<app-login></app-login>',
    });
}

loginRoutingConfig.$inject = [
    '$stateProvider',
];

export default loginRoutingConfig;
