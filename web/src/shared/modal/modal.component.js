import template from './modal.component.html';
import './modal.component.less';

class ModalController {
    $onInit() {
        this.title = this.modalTitle || '';
    }
}

const ModalComponent = {
    template,
    bindings: {
        modalTitle: '@',
    },
    controller: ModalController,
    transclude: true,
};

export default ModalComponent;
