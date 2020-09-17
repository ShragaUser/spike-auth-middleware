const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const addJwtStrategyToPassport = (secretOrKey, useBearerToken, verifyFunction, name = 'spike-auth-middleware-jwt') => {
    const jwtFromRequest = useBearerToken ? ExtractJwt.fromAuthHeaderAsBearerToken() : ExtractJwt.fromHeader('authorization');
    passport.use(name, new JwtStrategy({ secretOrKey, jwtFromRequest }, verifyFunction));
};

let jwtStrategyIndex = 0;

const getPassportAuthMiddleware = (secretOrKey, useBearerToken, verifyFunction) => {
    // ensure unique strategy name
    const strategyName = `spike-auth-middleware-jwt${jwtStrategyIndex++}`;

    addJwtStrategyToPassport(secretOrKey, useBearerToken, verifyFunction, strategyName);

    return passport.authenticate(strategyName, { session: false });
}

module.exports = getPassportAuthMiddleware;
