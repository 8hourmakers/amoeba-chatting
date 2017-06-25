import angular from 'angular';
import StateModule from '../../core/state/state.module';
import HttpModule from '../../core/http/http.module';
import HomeComponent from './home.component';

const HomeModule = angular
    .module('app.core.home', [
        StateModule,
        HttpModule,
    ])
    .component('appHome', HomeComponent)
    .name;

export default HomeModule;
