const NODE_ENV = process.env.NODE_ENV || 'development';

const env = {
    isProduction() {
        return NODE_ENV === 'production';
    },
};

export default env;
