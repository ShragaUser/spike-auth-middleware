const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");


const getPassport = (key, verifyFunction) => passport.use(new JwtStrategy({ key, jwtFromRequest: ExtractJwt.fromHeader('authorization') }, verifyFunction));


module.exports = getPassport;
