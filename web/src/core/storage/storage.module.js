import angular from 'angular';
import StorageService from './storage.service';

const StorageModule = angular
    .module('app.core.storage', [])
    .service('storageService', StorageService)
    .name;

export default StorageModule;
