const httpConstants = {
    defaultContexts: {
        headers: {
            common: {
                Accept: 'application/json',
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
            },
        },
    },

    errorCode: {
        TOKEN_EXPIRED: 401,
        UNAUTHORIZED: 403,
        INVALID: 406,
        DUPLICATED: 409,
    },
};

export default httpConstants;
