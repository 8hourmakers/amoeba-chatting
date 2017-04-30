import angular from 'angular';
import ScrollManagerDirective from './scroll-manager.directive';

const ScrollManagerModule = angular
    .module('app.shared.scrollManager', [])
    .directive('appScrollManager', ScrollManagerDirective)
    .name;

export default ScrollManagerModule;
