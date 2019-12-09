const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");


const getPassport = (secretOrKey, verifyFunction) => passport.use(new JwtStrategy({ secretOrKey, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() }, verifyFunction));


module.exports = getPassport;
