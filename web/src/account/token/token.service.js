import logger from '../../utils/logger';

class TokenService {
    constructor(storageService, dateService, tokenConstants) {
        this.storageService = storageService;
        this.dateService = dateService;
        this.tokenConstants = tokenConstants;

        this.tokenValue = null;
    }

    parseToken(token) {
        const tokenObj = {
            isValid: true,
            value: null,
        };
        let parsedObj = null;

        try {
            parsedObj = JSON.parse(token);
            tokenObj.value = parsedObj.value;
        } catch (error) {
            logger.error('Error during parsing token.', error);
            tokenObj.isValid = false;
            return tokenObj;
        }

        // 만약 토큰의 유효기간이 만료된 경우, isValid 값을 false로 설정한다.
        if (this.dateService.isBeforeFromToday(parsedObj.expireDate)) {
            tokenObj.isValid = false;
        }

        return tokenObj;
    }

    isTokenExists() {
        const tokenValue = this.getTokenValue();

        return tokenValue !== null;
    }

    getTokenValue() {
        const TOKEN_KEY = this.tokenConstants.TOKEN_KEY;

        if (!this.storageService.isItemExists(TOKEN_KEY)) {
            this.tokenValue = null;
            return null;
        }

        const token = this.storageService.getItem(TOKEN_KEY);
        const tokenObj = this.parseToken(token);

        if (tokenObj.isValid) {
            this.tokenValue = tokenObj.value;
        } else {
            this.tokenValue = null;
        }

        return this.tokenValue;
    }

    setToken(tokenValue) {
        const TOKEN_KEY = this.tokenConstants.TOKEN_KEY;
        const expireDatePolicy = this.tokenConstants.expireDatePolicy;

        this.storageService.removeItemIfExists(TOKEN_KEY);

        const expireDate = this.dateService
            .addFromToday(expireDatePolicy.number, expireDatePolicy.unit)
            .format();

        const parsedTokenObj = {
            expireDate,
            value: tokenValue,
        };

        this.storageService.setItem(TOKEN_KEY, parsedTokenObj);
    }
}

TokenService.$inject = [
    'storageService',
    'dateService',
    'tokenConstants',
];

export default TokenService;
