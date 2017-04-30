import angular from 'angular';
import logger from '../../utils/logger';

const defaultOptions = {
    headers: {},
    ensureAuthorized: true,
};

class HttpService {
    constructor($q, $http, tokenService) {
        this.$q = $q;
        this.$http = $http;
        this.tokenService = tokenService;
    }

    parseOptionsAsContext(options) {
        const copiedOptions = angular.copy(options);

        if (options.ensureAuthorized) {
            const tokenValue = this.tokenService.getTokenValue();

            copiedOptions.headers.Authorization = `JWT ${tokenValue}`;
        }

        return copiedOptions;
    }

    request(method, url, options) {
        const deferred = this.$q.defer();
        const combinedOptions = angular.extend({
            method,
            url,
        }, defaultOptions, options);
        const httpContext = this.parseOptionsAsContext(combinedOptions);

        logger.log('request:', method, url);

        this.$http(httpContext)
            .then((result) => {
                logger.log(method, url, result);
                deferred.resolve(result);
            })
            .catch((error) => {
                logger.error(method, url, error);
                deferred.reject(error);
            });

        return deferred.promise;
    }

    get(url, options) {
        return this.request('GET', url, options);
    }

    post(url, options) {
        return this.request('POST', url, options);
    }

    put(url, options) {
        return this.request('PUT', url, options);
    }
}

HttpService.$inject = [
    '$q',
    '$http',
    'tokenService',
];

export default HttpService;
