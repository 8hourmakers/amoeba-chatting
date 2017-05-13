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
        this.errorMessage = '';

        this.username = '';
        this.email = '';
        this.password = '';
        this.passwordConfirm = '';
    }

    register() {
        if (this.password !== this.passwordConfirm) {
            this.isErrorCaught = true;
            this.errorMessage = '비밀번호가 일치하지 않습니다.';
            return;
        }

        this.isRequesting = true;

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
                this.errorMessage = '유효하지 않은 값입니다.';
            })
            .finally(() => {
                this.isRequesting = false;
            });
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
