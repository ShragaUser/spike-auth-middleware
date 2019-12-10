const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");


const getPassport = (secretOrKey, useBearerToken, verifyFunction) => {
    const jwtFromRequest = useBearerToken ? ExtractJwt.fromAuthHeaderAsBearerToken() : ExtractJwt.fromHeader('authorization');
    return passport.use(new JwtStrategy({ secretOrKey, jwtFromRequest }, verifyFunction));
};


module.exports = getPassport;
