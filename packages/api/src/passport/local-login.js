import jwt from 'jsonwebtoken';
import { Strategy } from 'passport-local';
import User from '../models/user';
import config from '../../config';

/**
 * Return the Passport Local Strategy object.
 */
const local = new Strategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
  };

  // find a user by email address
  return User.findOne({ email: userData.email }, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      const error = new Error('Incorrect email or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    // check if a hashed user's password is equal to a value saved in the database
    return user.validPassword(userData.password, (passwordErr, isMatch) => {
      if (err) { return done(err); }

      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      const payload = {
        sub: user._id,
        role: user.role,
      };

      // create a token string
      const token = jwt.sign(payload, config.secret);
      const data = {
        id: user.id,
        role: user.role,
      };

      return done(null, token, data);
    });
  });
});

export default local;
