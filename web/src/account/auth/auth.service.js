import apiUrl from '../../constants/api-url';

class AuthService {
    constructor($q, httpService, tokenService, authConstants) {
        this.$q = $q;
        this.httpService = httpService;
        this.tokenService = tokenService;
        this.authConstants = authConstants;

        this.authorizedState = this.authConstants.state.UNKNOWN;
    }

    isAuthorized() {
        const deferred = this.$q.defer();

        if (!this.tokenService.isTokenExists()) {
            this.authorizedState = this.authConstants.state.NOT_AUTHORIZED;
            return this.$q.reject(this.authConstants.rejectReason.NOT_AUTHORIZED);
        }

        this.httpService
            .get(apiUrl.userAuthToken)
            .then(() => {
                this.authorizedState = this.authConstants.state.AUTHORIZED;
                deferred.resolve();
            })
            .catch(() => {
                this.authorizedState = this.authConstants.state.NOT_AUTHORIZED;
                deferred.reject(this.authConstants.rejectReason.NOT_AUTHORIZED);
            });

        return deferred.promise;
    }

    isNotAuthorized() {
        const deferred = this.$q.defer();

        if (this.tokenService.isTokenExists()) {
            this.httpService
                .get(apiUrl.userAuthToken)
                .then(() => {
                    this.authorizedState = this.authConstants.state.AUTHORIZED;
                    deferred.reject(this.authConstants.rejectReason.ALREADY_AUTHORIZED);
                })
                .catch(() => {
                    this.authorizedState = this.authConstants.state.NOT_AUTHORIZED;
                    deferred.resolve();
                });
        } else {
            deferred.resolve();
        }

        return deferred.promise;
    }
}

AuthService.$inject = [
    '$q',
    'httpService',
    'tokenService',
    'authConstants',
];

export default AuthService;
