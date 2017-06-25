import angular from 'angular';
import StateModule from '../../core/state/state.module';
import CreateTopicModalModule from '../create-topic-modal/create-topic-modal.module';
import TopicHomeComponent from './topic-home.component';
import Topics from './topics';

const TopicHomeModule = angular
    .module('app.topic.topicHome', [
        StateModule,
        CreateTopicModalModule,
    ])
    .component('appTopicHome', TopicHomeComponent)
    .factory('Topics', Topics)
    .name;

export default TopicHomeModule;
