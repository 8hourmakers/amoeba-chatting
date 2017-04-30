/* eslint no-console:0 */
import env from './env';

const logger = {
    log(...args) {
        if (env.isProduction()) {
            return;
        }

        console.log(...args);
    },

    error(...args) {
        console.error(...args);
    },
};

export default logger;
