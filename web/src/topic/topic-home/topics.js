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
                this.topicInfo.backgroundImageUrl = res.data.background_image_url;
            });
    }

    getSubTopics() {
        return this.httpService
            .get(apiUrl.topics, { params: { parent_id: this.topicId } })
            .then((res) => {
                res.data.forEach(subTopic => this.subTopics.push(subTopic));
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
