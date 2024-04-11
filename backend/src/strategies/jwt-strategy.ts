import { Strategy, ExtractJwt } from 'passport-jwt';
import { envs } from '../config/constants';

export const JwtStrategy = new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: envs.ACCESS_TOKEN_SECRET,
}, (payload, done) => {
    return done(null, payload)
})