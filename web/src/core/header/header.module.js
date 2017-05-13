import angular from 'angular';
import HeaderComponent from './header.component';

const HeaderModule = angular
    .module('app.core.header', [])
    .component('appHeader', HeaderComponent)
    .name;

export default HeaderModule;
