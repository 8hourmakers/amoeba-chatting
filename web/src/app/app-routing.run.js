import last from 'lodash/last';

function appRoutingRun($state, $rootScope, authConstants) {
    $rootScope.$on('$stateChangeError', (...rest) => {
        const error = last(rest);

        switch (error) {
            case authConstants.rejectReason.NOT_AUTHORIZED:
                $state.go('main');
                break;
            case authConstants.rejectReason.ALREADY_AUTHORIZED:
                $state.go('home');
                break;
            default:
                break;
        }
    });
}

appRoutingRun.$inject = [
    '$state',
    '$rootScope',
    'authConstants',
];

export default appRoutingRun;
