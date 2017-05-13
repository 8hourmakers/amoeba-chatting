import apiUrl from '../../constants/api-url';
import template from './create-topic-modal.component.html';
import './create-topic-modal.component.less';

class CreateTopicModalController {
    constructor(httpService) {
        this.httpService = httpService;
    }

    $onInit() {
        this.isRequesting = false;
        this.isErrorCaught = false;

        this.topicName = '';
    }

    createTopic() {
        this.isRequesting = true;

        this.httpService
            .post(apiUrl.topics, {
                data: {
                    name: this.topicName,
                    parent_id: this.parentTopicId,
                },
            })
            .then((res) => {
                this.closeModal({ value: res.data });
            })
            .catch(() => {
                this.isErrorCaught = true;
            })
            .finally(() => {
                this.isRequesting = false;
            });
    }
}

CreateTopicModalController.$inject = [
    'httpService',
];

const CreateTopicModalComponent = {
    template,
    bindings: {
        parentTopicId: '<?',
        closeModal: '&',
    },
    controller: CreateTopicModalController,
};

export default CreateTopicModalComponent;
