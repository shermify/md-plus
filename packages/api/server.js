import mongoose from 'mongoose';
import express from 'express';
import parser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import localLogin from './src/passport/local-login';
import routes from './src/routes';
import logger from './config/logger';
import populate from './config/populate';
import config from './config';
import patientAuthMiddleware from './src/middleware/auth-patient';
import authRoutes from './src/routes/auth';

const app = express();

app.use(morgan('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true })
  .then(() => {
    if (config.populate) {
        // drop database, then populate with 15 patients
      mongoose.connection.db.dropDatabase(() => {
        logger.log('collection dropped');
        populate(15);
      });
    }
  })
  .catch(() => { logger.log('error', 'Please check that mongodb is installed with appropriate permissions'); });

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use(passport.initialize());
passport.use('local-login', localLogin);

const router = express.Router();

// secure private routes with middleware
app.use('/api/patients', patientAuthMiddleware);
app.use('/auth', authRoutes);

// load routes
routes(router);
app.use('/api', router);
app.listen(3000);

export default app;
