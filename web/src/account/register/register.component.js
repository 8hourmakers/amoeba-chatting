import apiUrl from '../../constants/api-url';
import template from './register.component.html';
import './register.component.less';

class RegisterController {
    constructor($state, httpService, tokenService) {
        this.$state = $state;
        this.httpService = httpService;
        this.tokenService = tokenService;
    }

    $onInit() {
        this.isRequesting = false;
        this.isErrorCaught = false;

        this.username = '';
        this.email = '';
        this.password = '';
        this.passwordConfirm = '';
    }

    register() {
        this.isRequesting = true;

        if (this.password !== this.passwordConfirm) {
            this.isErrorCaught = true;
            return;
        }

        this.httpService
            .post(apiUrl.users, {
                ensureAuthorized: false,
                data: {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                },
            })
            .then((res) => {
                const tokenValue = res.data.token;

                this.tokenService.setToken(tokenValue);
                this.$state.go('home');
            })
            .catch(() => {
                this.isErrorCaught = true;
            })
            .finally(() => {
                this.isRequesting = false;
            })
    }

    backToMain() {
        this.$state.go('main');
    }
}

RegisterController.$inject = [
    '$state',
    'httpService',
    'tokenService',
];

const RegisterComponent = {
    template,
    controller: RegisterController,
};

export default RegisterComponent;
