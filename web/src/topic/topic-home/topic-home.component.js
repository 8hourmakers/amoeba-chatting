import template from './topic-home.component.html';
import './topic-home.component.less';

class TopicHomeController {
    constructor($q, stateService, CreateTopicModal, Topics) {
        this.$q = $q;
        this.stateService = stateService;
        this.createTopicModal = new CreateTopicModal();
        this.Topics = Topics;
    }

    $onInit() {
        this.isInitialized = false;
        this.isErrorCaught = false;

        this.topicId = this.stateService.getParams().topicId;
        this.topics = new this.Topics(this.topicId);

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
        if (this.topicInfo.parentId === 1) {
            this.stateService.go('home');
        } else {
            this.stateService.go('topicHome', {
                topicId: this.topicInfo.parentId,
            });
        }
    }

    enterChatRoom() {
        this.stateService.go('chatRoom', {
            topicId: this.topicId,
        });
    }

    enterSubTopic(subTopic) {
        this.stateService.go('topicHome', {
            topicId: subTopic.id,
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
    'stateService',
    'CreateTopicModal',
    'Topics',
];

const TopicHomeComponent = {
    template,
    controller: TopicHomeController,
};

export default TopicHomeComponent;
