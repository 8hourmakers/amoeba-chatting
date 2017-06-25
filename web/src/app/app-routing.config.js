function appRoutingConfig($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            template: '<app-home></app-home>',
            resolve: {
                auth: ['authService', authService => authService.isAuthorized()],
            },
        })
        .state('main', {
            url: '/main',
            template: '<app-main></app-main>',
            resolve: {
                auth: ['authService', authService => authService.isNotAuthorized()],
            },
        });

    $locationProvider.html5Mode(true);

    $urlRouterProvider.when('', ['stateService', (stateService) => {
        stateService.go('home');
    }]);
}

appRoutingConfig.$inject = [
    '$stateProvider',
    '$locationProvider',
    '$urlRouterProvider',
];

export default appRoutingConfig;
