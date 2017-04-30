import angular from 'angular';
import HttpModule from '../../core/http/http.module';
import TokenModule from '../token/token.module';
import AuthService from './auth.service';
import authConstants from './auth.const';

const AuthModule = angular
    .module('app.account.auth', [
        HttpModule,
        TokenModule,
    ])
    .service('authService', AuthService)
    .constant('authConstants', authConstants)
    .name;

export default AuthModule;
