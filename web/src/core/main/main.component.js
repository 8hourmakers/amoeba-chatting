import apiUrl from '../../constants/api-url';
import template from './main.component.html';
import './main.component.less';

class MainController {
    constructor($state, httpService, tokenService) {
        this.$state = $state;
        this.httpService = httpService;
        this.tokenService = tokenService;
    }

    $onInit() {
        this.isRequesting = false;
        this.isErrorCaught = false;

        this.email = '';
        this.password = '';
    }

    login() {
        this.isRequesting = true;

        this.httpService
            .post(apiUrl.userAuth, {
                ensureAuthorized: false,
                data: { email: this.email, password: this.password },
            })
            .then((res) => {
                const tokenValue = res.data.token;

                this.tokenService.setToken(tokenValue);
                this.$state.go('home');
            })
            .catch(() => {
                this.errorMessage = '이메일 또는 비밀번호를 확인해주세요.';
                this.isErrorCaught = true;
            })
            .finally(() => {
                this.email = '';
                this.password = '';
                this.isRequesting = false;
            });
    }
}

MainController.$inject = [
    '$state',
    'httpService',
    'tokenService',
];

const MainComponent = {
    template,
    controller: MainController,
};

export default MainComponent;
