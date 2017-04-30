import angular from 'angular';
import UIRouter from 'angular-ui-router';
import MainComponent from './main.component';

const MainModule = angular
    .module('app.core.main', [
        UIRouter,
    ])
    .component('appMain', MainComponent)
    .name;

export default MainModule;
