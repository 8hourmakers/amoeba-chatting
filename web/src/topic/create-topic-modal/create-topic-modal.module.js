import angular from 'angular';
import ModalModule from '../../shared/modal/modal.module';
import CreateTopicModalComponent from './create-topic-modal.component';
import CreateTopicModal from './create-topic-modal';

const CreateTopicModalModule = angular
    .module('app.topic.createTopicModal', [
        ModalModule,
    ])
    .component('appCreateTopicModal', CreateTopicModalComponent)
    .factory('CreateTopicModal', CreateTopicModal)
    .name;

export default CreateTopicModalModule;
