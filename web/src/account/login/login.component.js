import apiUrl from '../../constants/api-url';
import template from './login.component.html';
import './login.component.less';

class LoginController {
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

    login(event) {
        event.preventDefault();

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
                this.isErrorCaught = true;
                this.email = '';
                this.password = '';
            })
            .finally(() => {
                this.isRequesting = false;
            });
    }

    backToMain() {
        this.$state.go('main');
    }
}

LoginController.$inject = [
    '$state',
    'httpService',
    'tokenService',
];

const LoginComponent = {
    template,
    controller: LoginController,
};

export default LoginComponent;
