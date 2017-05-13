import keyMaker from '../../utils/key-maker';

const authConstants = {
    state: keyMaker('auth:state', {
        UNKNOWN: 'UNKNOWN',
        AUTHORIZED: 'AUTHORIZED',
        NOT_AUTHORIZED: 'NOT_AUTHORIZED',
    }),

    rejectReason: keyMaker('auth:rejectReason', {
        ALREADY_AUTHORIZED: 'ALREADY_AUTHORIZED',
        NOT_AUTHORIZED: 'NOT_AUTHORIZED',
    }),
};

export default authConstants;
