import angular from 'angular';
import UIRouter from 'angular-ui-router';
import HomeModule from '../core/home/home.module';
import MainModule from '../core/main/main.module';
import StateModule from '../core/state/state.module';
import AuthModule from '../account/auth/auth.module';
import LoginModule from '../account/login/login.module';
import RegisterModule from '../account/register/register.module';
import TopicModule from '../topic/topic.module';
import AppComponent from './app.component';
import appRoutingConfig from './app-routing.config';
import appRoutingRun from './app-routing.run';

const AppModule = angular
    .module('app', [
        UIRouter,
        HomeModule,
        MainModule,
        StateModule,
        AuthModule,
        LoginModule,
        RegisterModule,
        TopicModule,
    ])
    .component('appRoot', AppComponent)
    .config(appRoutingConfig)
    .run(appRoutingRun)
    .name;

export default AppModule;
