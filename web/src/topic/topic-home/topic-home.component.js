import template from './topic-home.component.html';
import './topic-home.component.less';
import apiUrl from '../../constants/api-url';

class TopicHomeController {
    constructor($q, stateService, httpService, CreateTopicModal, Topics) {
        this.$q = $q;
        this.stateService = stateService;
        this.httpService = httpService;
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

    toggleFavorite() {
        const data = { topic_id: this.topicId };
        const callback = () => {
            this.topics.topicInfo.isFavorite = !this.topics.topicInfo.isFavorite;
        };

        if (this.topicInfo.isFavorite) {
            this.httpService
                .delete(`${apiUrl.topicFavorites}${this.topicId}/`)
                .then(callback);
        } else {
            this.httpService
                .post(apiUrl.topicFavorites, { data })
                .then(callback);
        }
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
    'httpService',
    'CreateTopicModal',
    'Topics',
];

const TopicHomeComponent = {
    template,
    controller: TopicHomeController,
};

export default TopicHomeComponent;
