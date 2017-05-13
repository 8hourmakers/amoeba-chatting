import apiUrl from '../../constants/api-url';
import template from './home.component.html';
import './home.component.less';

class HomeController {
    constructor($state, httpService) {
        this.$state = $state;
        this.httpService = httpService;
    }

    $onInit() {
        this.topicItems = [];

        this.httpService
            .get(apiUrl.topics, {
                ensureAuthorized: true,
                params: {
                    parent_id: 1,
                },
            })
            .then((res) => {
                res.data.forEach((topic) => {
                    this.topicItems.push({
                        id: topic.id,
                        memberNum: topic.member_num,
                        name: topic.name,
                        parentId: topic.parent_id,
                    });
                });
            });
    }

    hrefTopicHome(topic) {
        this.$state.go('topicHome', {
            topicId: topic.id,
            previousState: {
                name: 'home',
                params: {},
            },
        });
    }
}

HomeController.$inject = [
    '$state',
    'httpService',
];

const HomeComponent = {
    template,
    controller: HomeController,
};

export default HomeComponent;
