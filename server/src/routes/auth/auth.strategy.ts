// @ts-ignore
import passport from 'passport';
// @ts-ignore
import { Strategy } from 'passport-google-oidc';
import { userOAuth } from './auth.service';

import type { GoogleProfile, DoneCallback } from './auth.model';

export default passport.use(
  new Strategy(
    {
      clientID: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
      scope: ['openid', 'profile', 'email'],
    },
    async (issuer: string, profile: GoogleProfile, done: DoneCallback) => {
      if (!profile) {
        return done(new Error('No profile found'));
      }

      const emailValue = profile.emails?.[0]?.value;
      if (!emailValue || emailValue.trim() === '') {
        return done(new Error('No email found in profile'));
      }
      const email = emailValue.trim();

      const username = email.split('@')[0].trim(); // TODO: fix type error
      if (!username) {
        return done(new Error('Invalid username from email'));
      }

      const { session, sessionToken } = await userOAuth(email, username);

      return done(null, { session, sessionToken });
    }
  )
);
