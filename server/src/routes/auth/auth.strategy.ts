// @ts-ignore
import passport from 'passport';
// @ts-ignore
import { Strategy } from 'passport-google-oidc';
import { userOAuth } from './auth.service';

export default passport.use(
  new Strategy(
    {
      clientID: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
      scope: ['openid', 'profile', 'email'],
    },
    async (issuer, profile, done) => {
      console.log('Google issuer:', issuer);
      console.log('Google profile:', profile);
      console.log('Profile keys:', Object.keys(profile || {}));
      if (profile && profile._json) {
        console.log('Profile _json:', profile._json);
      }
      if (profile && profile.displayName) {
        console.log('Profile displayName:', profile.displayName);
      }
      if (profile && profile.emails) {
        console.log('Profile emails:', profile.emails);
      }

      const { session, sessionToken } = await userOAuth(
        profile.emails,
        profile.displayName
      );

      return done(null, { session, sessionToken });
    }
  )
);
