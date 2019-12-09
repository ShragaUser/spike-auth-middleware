const passport = require("passport");
const { Strategy: JwtStrategy } = require("passport-jwt");


const getPassport = (secretOrKey, verifyFunction) => passport.use(new JwtStrategy({ secretOrKey }, verifyFunction));


module.exports = getPassport;
