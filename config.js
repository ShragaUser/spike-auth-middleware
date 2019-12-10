const config = () => {
    return {
        allowedScopes: ['read'],
        audience: 'audience',
        useBearerToken: true
    }
};

module.exports = config;