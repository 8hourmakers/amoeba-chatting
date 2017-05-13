import angular from 'angular';
import IconButtonComponent from './icon-button.component';

const IconButtonModule = angular
    .module('app.shared.iconButton', [])
    .component('appIconButton', IconButtonComponent)
    .name;

export default IconButtonModule;
