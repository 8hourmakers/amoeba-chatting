import angular from 'angular';
import HttpModule from '../../core/http/http.module';
import ModalModule from '../../shared/modal/modal.module';
import CreateTopicModalComponent from './create-topic-modal.component';
import CreateTopicModal from './create-topic-modal';

const CreateTopicModalModule = angular
    .module('app.topic.createTopicModal', [
        HttpModule,
        ModalModule,
    ])
    .component('appCreateTopicModal', CreateTopicModalComponent)
    .factory('CreateTopicModal', CreateTopicModal)
    .name;

export default CreateTopicModalModule;
