import angular from 'angular';
import UIRouter from 'angular-ui-router';
import StateService from './state.service';

const StateModule = angular
    .module('app.core.state', [
        UIRouter,
    ])
    .service('stateService', StateService)
    .name;

export default StateModule;
