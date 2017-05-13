import angular from 'angular';
import ScrollManagerDirective from './scroll-manager.directive';
import scrollManagerConstants from './scroll-manager.const';

const ScrollManagerModule = angular
    .module('app.shared.scrollManager', [])
    .directive('appScrollManager', ScrollManagerDirective)
    .constant('scrollManagerConstants', scrollManagerConstants)
    .name;

export default ScrollManagerModule;
