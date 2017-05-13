import angular from 'angular';
import UIRouter from 'angular-ui-router';
import HttpModule from '../../core/http/http.module';
import TokenModule from '../token/token.module';
import RegisterComponent from './register.component';
import registerRoutingConfig from './register-routing.config';

const RegisterModule = angular
    .module('app.account.register', [
        UIRouter,
        HttpModule,
        TokenModule,
    ])
    .component('appRegister', RegisterComponent)
    .config(registerRoutingConfig)
    .name;

export default RegisterModule;
