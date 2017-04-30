import angular from 'angular';
import TokenModule from '../../account/token/token.module';
import HttpService from './http.service';
import HttpConstants from './http.const';
import httpProviderConfig from './http-provider.config';

const HttpModule = angular
    .module('app.core.http', [
        TokenModule,
    ])
    .service('httpService', HttpService)
    .constant('httpConstants', HttpConstants)
    .config(httpProviderConfig)
    .name;

export default HttpModule;
