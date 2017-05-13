import template from './app.component.html';
import './app.component.less';

class AppController {
    constructor($state) {
        this.$state = $state;
    }
}

AppController.$inject = [
    '$state',
];

const AppComponent = {
    template,
    controller: AppController,
};

export default AppComponent;
