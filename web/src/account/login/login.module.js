import angular from 'angular';
import UIRouter from 'angular-ui-router';
import HttpModule from '../../core/http/http.module';
import TokenModule from '../token/token.module';
import LoginComponent from './login.component';
import loginRoutingConfig from './login-routing.config';

const LoginModule = angular
    .module('app.account.login', [
        UIRouter,
        HttpModule,
        TokenModule,
    ])
    .component('appLogin', LoginComponent)
    .config(loginRoutingConfig)
    .name;

export default LoginModule;
