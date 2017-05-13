import template from './topic-home.component.html';
import './topic-home.component.less';

class TopicHomeController {
    constructor($q, $state, CreateTopicModal, Topics) {
        this.$q = $q;
        this.$state = $state;
        this.createTopicModal = new CreateTopicModal();
        this.Topics = Topics;
    }

    $onInit() {
        this.isInitialized = false;
        this.isErrorCaught = false;

        this.topicId = this.$state.params.topicId;
        this.topics = new this.Topics(this.topicId);

        if (this.$state.params.previousState.name) {
            this.previousState = this.$state.params.previousState;
        } else {
            this.previousState = { name: 'home', params: {} };
        }

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

    back() {
        this.$state.go(this.previousState.name, this.previousState.params);
    }

    enterChatRoom() {
        this.$state.go('chatRoom', {
            topicId: this.topicId,
            previousState: {
                name: 'topicHome',
                params: this.$state.params,
            },
        });
    }

    enterSubTopic(subTopic) {
        this.$state.go('topicHome', {
            topicId: subTopic.id,
            previousState: {
                name: 'topicHome',
                params: this.$state.params,
            },
        });
    }

    createTopic() {
        this.createTopicModal
            .setParentTopicId(this.topicId)
            .onResolve((newTopic) => {
                this.topics.subTopics.push(newTopic);
            })
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
