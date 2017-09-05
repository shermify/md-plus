import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../../config';

/**
 * This middleware secures the /patient route
 * by cross-checking the route id with patient id.
 * Doctors are allowed access to all patients.
 * @param  {object}   req  Node request
 * @param  {object}   res  Node response
 * @param  {function} next callback
 * @return {function}      callback
 */
const patientAuth = (req, res, next) => {
  // get patientid from request
  const patientId = req.url.split('/')[1];

  // return options requests
  if (req.method === 'OPTIONS') {
    return next();
  }

  /*
  TODO Secure file upload path
  this is a workaround to allow unauthorized file uploads
   */
  if (req.url.includes('files')) { return next(); }

  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.secret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      // if user does not exist or user does not match and is a patient, deny request
      if (userErr || !user || (user._id.toString() !== patientId && user.role === 'Patient')) {
        return res.status(401).end();
      }

      return next();
    });
  });
};

export default patientAuth;
