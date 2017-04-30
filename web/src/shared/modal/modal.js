import angular from 'angular';

const defaultOptions = {
    template: '',
    onResolve: angular.noop,
    bindings: {},
};

class Modal {
    constructor($compile, $timeout, $rootScope) {
        this.$compile = $compile;
        this.$timeout = $timeout;
        this.$rootScope = $rootScope;

        this.$containerElem = null;
        this.$modalElem = null;
        this.$modalScope = null;

        this.isModalOpened = false;

        this._createContainer();
    }

    _createContainer() {
        const containerElem = document.createElement('div');
        containerElem.id = 'modal-container';
        containerElem.classList.add('ModalContainer', 'ModalContainer--is-closed');

        const overlayElem = document.createElement('div');
        overlayElem.classList.add('ModalContainer__overlay');

        containerElem.appendChild(overlayElem);
        document.body.appendChild(containerElem);

        this.$containerElem = angular.element(containerElem);
    }

    open(options) {
        const modalServiceThis = this;
        const concatOptions = angular.extend({}, defaultOptions, options);

        this.close();

        this.$modalElem = angular.element(concatOptions.template);
        this.$modalElem.addClass('ModalContainer__modal');
        this.$modalElem.data('$modalOptions', concatOptions);
        this.$modalScope = this.$rootScope.$new(true);

        this.$modalScope.bindings = concatOptions.bindings;

        this.$modalScope.closeModal = function closeModal(value) {
            concatOptions.onResolve(value);
            modalServiceThis.close();
        };

        this.$timeout(() => {
            this.$compile(this.$modalElem)(this.$modalScope);
            this.$containerElem.append(this.$modalElem);

            this.isModalOpened = true;
            this.$containerElem.removeClass('ModalContainer--is-closed');
            this.$containerElem.addClass('ModalContainer--is-opened');
        });

        this.$rootScope.$on('$stateChangeStart', (event) => {
            event.preventDefault();
            this.close();
        });
    }

    close() {
        if (!this.isModalOpened) {
            return;
        }

        this.$modalElem.remove();
        this.$modalScope.$destroy();
        this.$modalScope = null;

        this.$containerElem.removeClass('ModalContainer--is-opened');
        this.$containerElem.addClass('ModalContainer--is-closed');

        this.isModalOpened = false;
    }
}

Modal.$inject = [
    '$compile',
    '$timeout',
    '$rootScope',
];

export default Modal;
