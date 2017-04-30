import angular from 'angular';
import InputComponent from './input.component';

const InputModule = angular
    .module('app.shared.input', [])
    .component('appInput', InputComponent)
    .name;

export default InputModule;
