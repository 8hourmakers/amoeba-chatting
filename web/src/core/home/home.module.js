import angular from 'angular';
import HomeComponent from './home.component';

const HomeModule = angular
    .module('app.core.home', [])
    .component('appHome', HomeComponent)
    .name;

export default HomeModule;
