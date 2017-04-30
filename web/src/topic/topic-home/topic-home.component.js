import template from './topic-home.component.html';
import './topic-home.component.less';

class TopicHomeController {
    constructor($q, $state, CreateTopicModal, Topics) {
        this.$q = $q;
        this.$state = $state;
        this.createTopicModal = new CreateTopicModal();

        this.topicId = $state.params.topicId;
        this.topics = new Topics(this.topicId);
    }

    $onInit() {
        this.isInitialized = false;
        this.isErrorCaught = false;

        this.topicInfo = this.topics.topicInfo;
        this.subTopics = this.topics.subTopics;

        this.$q
            .all([
                this.topics.getTopicInfo(),
                this.topics.getSubTopics(),
            ])
            .then(() => { this.isInitialized = true; })
            .catch(() => { this.isErrorCaught = true; });
    }

    enterChatRoom() {
        this.$state.go('app.chatRoom', { topicId: this.topicId });
    }

    enterSubTopic(subTopic) {
        this.$state.go('app.topicHome', { topicId: subTopic.id });
    }

    createTopic() {
        this.createTopicModal
            .onResolve(this.topics.createTopic)
            .open();
    }
}

TopicHomeController.$inject = [
    '$q',
    '$state',
    'CreateTopicModal',
    'Topics',
];

const TopicHomeComponent = {
    template,
    controller: TopicHomeController,
};

export default TopicHomeComponent;
