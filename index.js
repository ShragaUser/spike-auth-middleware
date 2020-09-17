const fs = require("fs");
const getPassportAuthMiddleware = require("./passport");
const config = require("./config")();

const getSpikeAuthMiddleWare = (options) => {
    const { audience, pathToPublicKey, allowedScopes, useBearerToken } = { ...config, ...options };

    if (!(pathToPublicKey && audience && allowedScopes)) {
        throw new Error('must provide pathToPublicKey && audience && allowedScopes to auth middleware');
    }

    const getPublicKey = function () {
        if (this.key)
            return this.key;
        this.key = fs.readFileSync(pathToPublicKey);
        return this.key;
    };

    const verifyAudience = (aud) => aud === audience;
    const verifyScopes = (scopes) => scopes.some(scope => allowedScopes.includes(scope));
    const getAndVerifiyAudienceFromJWT = jwt => jwt && jwt.aud && verifyAudience(jwt.aud);
    const getAndVerifiyScopesFromJWT = jwt => jwt && jwt.scope && verifyScopes(jwt.scope);

    const verify = (jwt, done) => {
        const verified = getAndVerifiyAudienceFromJWT(jwt) && getAndVerifiyScopesFromJWT(jwt);
        done(null, verified);
    };

    return getPassportAuthMiddleware(getPublicKey(), useBearerToken, verify);
};

module.exports = { getSpikeAuthMiddleWare };
