import angular from 'angular';
import SocketFactory from './socket.factory';
import socketConstants from './socket.const';

const SocketModule = angular
    .module('app.core.socket', [])
    .factory('Socket', SocketFactory)
    .constant('socketConstants', socketConstants)
    .name;

export default SocketModule;
