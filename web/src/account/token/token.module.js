import angular from 'angular';
import StorageModule from '../../core/storage/storage.module';
import DateModule from '../../shared/date/date.module';
import TokenService from './token.service';
import TokenConstants from './token.const';

const TokenModule = angular
    .module('app.account.token', [
        StorageModule,
        DateModule,
    ])
    .service('tokenService', TokenService)
    .constant('tokenConstants', TokenConstants)
    .name;

export default TokenModule;
