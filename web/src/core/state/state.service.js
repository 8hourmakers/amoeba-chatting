import { pullAll, last } from 'lodash';

class StateService {
    constructor($state) {
        this.$state = $state;
        this.history = [];
    }

    getLastHistory() {
        return last(this.history);
    }

    getParams() {
        return this.$state.params;
    }

    setParams(params) {
        this.$state.params = params;
    }

    go(name, params = {}, replace = false) {
        const previousStateName = this.$state.current.name;

        const previousState = {
            name: previousStateName,
            params: this.$state.params,
        };

        if (replace) {
            pullAll(this.history, this.history);

            this.$state.transitionTo(name, params, {
                location: 'replace',
                inherit: true,
                relative: this.$state.current,
                notify: true,
            });
        } else {
            this.history.push(previousState);
            this.$state.go(name, params);
        }
    }

    goForce(name, params = {}) {
        pullAll(this.history, this.history);

        this.go(name, params, true);
    }

    back() {
        let previousState;
        let toState;
        let toParams;

        if (this.history.length === 0) {
            toState = 'home';
            toParams = {};
        } else {
            previousState = this.history.pop();

            toState = previousState.name;
            toParams = previousState.params;
        }

        this.$state.go(toState, toParams);
    }
}

StateService.$inject = [
    '$state',
];

export default StateService;
