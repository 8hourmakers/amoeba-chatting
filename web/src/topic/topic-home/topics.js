import apiUrl from '../../constants/api-url';
import inject from '../../utils/inject';

class Topics {
    constructor(topicId) {
        inject.get(Topics, this);

        this.topicId = topicId;
        this.topicInfo = {
            name: '',
            memberNum: 0,
        };
        this.subTopics = [];
    }

    getTopicInfo() {
        return this.httpService
            .get(apiUrl.topic({ topicId: this.topicId }))
            .then((res) => {
                this.topicInfo.name = res.data.name;
                this.topicInfo.member_num = res.data.member_num;
            });
    }

    getSubTopics() {
        return this.httpService
            .get(apiUrl.topics, { params: { parent: this.topicId } })
            .then((res) => {
                res.data.forEach(subTopic => this.subTopics.push(subTopic));
            });
    }

    createTopic(topicName) {
        return this.httpService
            .post(apiUrl.topics, { params: { parent: this.topicId } })
            .then(() => {
                this.subTopics.push({
                    name: topicName,
                    member_num: 0,
                });
            });
    }
}

Topics.$inject = [
    'httpService',
];

export default ['httpService', (httpService) => {
    inject.put(Topics, { httpService });
    return Topics;
}];
