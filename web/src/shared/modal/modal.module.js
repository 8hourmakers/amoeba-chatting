import angular from 'angular';
import ModalComponent from './modal.component';
import Modal from './modal';

const ModalModule = angular
    .module('app.shared.modal', [])
    .component('appModal', ModalComponent)
    .service('modal', Modal)
    .name;

export default ModalModule;
