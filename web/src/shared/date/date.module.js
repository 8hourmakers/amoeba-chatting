import angular from 'angular';
import DateService from './date.service';

const DateModule = angular
    .module('app.shared.date', [])
    .service('dateService', DateService)
    .name;

export default DateModule;
