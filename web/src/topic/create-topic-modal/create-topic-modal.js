import inject from '../../utils/inject';

class CreateTopicModal {
    constructor() {
        inject.get(CreateTopicModal, this);

        this._options = {
            bindings: {},
            template: '<app-create-topic-modal></app-create-topic-modal>',
        };
    }

    onResolve(onResolveCallback) {
        this._options.onResolve = onResolveCallback;
        return this;
    }

    open() {
        this.modal.open(this._options);
        return this;
    }
}

export default ['modal', (modal) => {
    inject.put(CreateTopicModal, { modal });
    return CreateTopicModal;
}];
