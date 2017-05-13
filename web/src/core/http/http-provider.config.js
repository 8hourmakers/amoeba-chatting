/* eslint no-param-reassign:0 */
function httpProviderConfig($httpProvider, httpConstants) {
    $httpProvider.defaults.headers.common =
        httpConstants.defaultContexts.headers.common;
}

httpProviderConfig.$inject = [
    '$httpProvider',
    'httpConstants',
];

export default httpProviderConfig;
