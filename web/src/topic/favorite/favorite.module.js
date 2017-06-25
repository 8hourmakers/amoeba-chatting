import angular from 'angular';
import AuthModule from '../../account/auth/auth.module';
import StateModule from '../../core/state/state.module';
import HttpModule from '../../core/http/http.module';
import FavoritePageComponent from './favorite-page.component';

const FavoriteModule = angular
    .module('app.favorite', [
        AuthModule,
        StateModule,
        HttpModule,
    ])
    .component('appFavoritePage', FavoritePageComponent)
    .name;

export default FavoriteModule;
