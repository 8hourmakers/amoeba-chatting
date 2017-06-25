import apiUrl from '../../constants/api-url';
import template from './home.component.html';
import './home.component.less';

class HomeController {
    constructor(stateService, httpService) {
        this.stateService = stateService;
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
                    this.topicItems.push(topic);
                });
            });
    }

    hrefFavorite() {
        this.stateService.go('favorite');
    }

    hrefTopicHome(topic) {
        this.stateService.go('topicHome', {
            topicId: topic.id,
        });
    }
}

HomeController.$inject = [
    'stateService',
    'httpService',
];

const HomeComponent = {
    template,
    controller: HomeController,
};

export default HomeComponent;
