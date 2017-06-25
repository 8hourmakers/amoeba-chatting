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

    upload(imageData) {
        if (!imageData) {
            this.isErrorCaught = true;
            this.errorMessage = '이미지를 업로드해 주세요.';
            return;
        }

        this.httpService
            .post(apiUrl.image, {
                data: {
                    file: imageData,
                },
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
                this.errorMessage = '유효하지 않은 토픽입니다. 다른 이름을 사용해 주세요.';
            })
            .finally(() => {
                this.isRequesting = false;
            });
    }

    createTopic() {
        this.isRequesting = true;

        const fileReader = new FileReader();
        let encodedFile = null;

        fileReader.onload = (event) => {
            encodedFile = event.target.result;
            this.upload(encodedFile);
        };

        fileReader.readAsDataURL(this.imageFile);
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
