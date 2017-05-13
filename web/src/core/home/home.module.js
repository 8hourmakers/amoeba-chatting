import angular from 'angular';
import UIRouter from 'angular-ui-router';
import HttpModule from '../../core/http/http.module';
import HomeComponent from './home.component';

const HomeModule = angular
    .module('app.core.home', [
        UIRouter,
        HttpModule,
    ])
    .component('appHome', HomeComponent)
    .name;

export default HomeModule;
