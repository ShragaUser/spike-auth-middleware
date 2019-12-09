const getPassport = require("./passport");
const config = require("./config")();

const getSpikeAuthMiddleWare = (options) => {
    const { audience, pathToPublicKey, allowedScopes } = { ...config, ...options };

    if (!(pathToPublicKey && audience && allowedScopes)) {
        throw new Error('must provide pathToPublicKey && audience && allowedScopes to auth middleware');
    }

    const verifyAudience = (aud) => aud === audience;
    const verifyScopes = (scopes) => scopes.some(scope => allowedScopes.includes(scope));
    const getAndVerifiyAudienceFromJWT = jwt => jwt && jwt.aud && verifyAudience(jwt.aud);
    const getAndVerifiyScopesFromJWT = jwt => jwt && jwt.scope && verifyScopes(jwt.scope);

    const verify = (jwt, done) => {
        const verified = getAndVerifiyAudienceFromJWT(jwt) && getAndVerifiyScopesFromJWT(jwt);
        done(null, verified);
    };

    const passport = getPassport(secretOrKey, verify);

    return passport.authenticate('jwt', { session: false });
};


module.exports = { getSpikeAuthMiddleWare };
