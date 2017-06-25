import last from 'lodash/last';

function appRoutingRun(stateService, $rootScope, authConstants) {
    $rootScope.$on('$stateChangeError', (...rest) => {
        const error = last(rest);

        switch (error) {
            case authConstants.rejectReason.NOT_AUTHORIZED:
                stateService.go('main');
                break;
            case authConstants.rejectReason.ALREADY_AUTHORIZED:
                stateService.go('home');
                break;
            default:
                break;
        }
    });
}

appRoutingRun.$inject = [
    'stateService',
    '$rootScope',
    'authConstants',
];

export default appRoutingRun;
