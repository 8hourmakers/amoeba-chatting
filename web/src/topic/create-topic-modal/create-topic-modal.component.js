import apiUrl from '../../constants/api-url';
import template from './create-topic-modal.component.html';
import './create-topic-modal.component.less';

class CreateTopicModalController {
    constructor($scope, httpService) {
        this.$scope = $scope;
        this.httpService = httpService;
    }

    $onInit() {
        this.isRequesting = false;
        this.isErrorCaught = false;

        this.imageFile = null;
        this.imageFileSrc = '/amoeba_chatting/assets/images/dummy.png';
        this.topicName = '';
    }

    close() {
        this.closeModal();
    }

    onFileSelect(file) {
        const that = this;

        this.imageFile = file;

        const reader = new FileReader();

        reader.onload = function onFileLoad(event) {
            that.imageFileSrc = event.target.result;
            that.$scope.$apply();
        };

        reader.readAsDataURL(this.imageFile);
    }

    createTopic() {
        this.isRequesting = true;

        const formData = new FormData();
        formData.append('file', this.imageFile);

        this.httpService
            .post(apiUrl.image, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: formData,
            })
            .then((res) => {
                const imageUrl = res.data.image_url;

                return this.httpService
                    .post(apiUrl.topics, {
                        data: {
                            name: this.topicName,
                            parent_id: this.parentTopicId,
                            background_image_url: imageUrl,
                        },
                    });
            })
            .then((res) => {
                this.resolveModal({ value: res.data });
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
    '$scope',
    'httpService',
];

const CreateTopicModalComponent = {
    template,
    bindings: {
        parentTopicId: '<?',
        closeModal: '&',
        resolveModal: '&',
    },
    controller: CreateTopicModalController,
};

export default CreateTopicModalComponent;
