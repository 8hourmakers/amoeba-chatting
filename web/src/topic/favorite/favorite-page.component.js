import template from './favorite-page.component.html';
import './favorite-page.component.less';
import apiUrl from '../../constants/api-url';

class FavoritePageController {
    constructor(httpService, stateService) {
        this.httpService = httpService;
        this.stateService = stateService;
    }

    $onInit() {
        this.topics = [];

        this.httpService
            .get(apiUrl.favorites)
            .then((res) => {
                this.topics = res.data;
            });
    }

    back() {
        this.stateService.back();
    }

    enterSubTopic(topic) {
        this.stateService.go('topicHome', {
            topicId: topic.id,
        });
    }
}

FavoritePageController.$inject = [
    'httpService',
    'stateService',
];

const FavoritePageComponent = {
    template,
    controller: FavoritePageController,
};

export default FavoritePageComponent;
