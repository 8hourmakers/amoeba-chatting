import angular from 'angular';
import UIRouter from 'angular-ui-router';
import HttpModule from '../../core/http/http.module';
import TokenModule from '../../account/token/token.module';
import MainComponent from './main.component';

const MainModule = angular
    .module('app.core.main', [
        UIRouter,
        HttpModule,
        TokenModule,
    ])
    .component('appMain', MainComponent)
    .name;

export default MainModule;
