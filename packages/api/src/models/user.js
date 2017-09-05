// User model
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const user = mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  age: Number,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  phone: String,
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  avatarUrl: String,
  role: {
    type: String,
    enum: ['Doctor', 'Patient'],
    default: 'Patient',
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
},
  {
    timestamps: true,
  });

// generate a hash
user.pre('save', function hashPassword(next) {
  if (!this.isModified('password')) next();

  bcrypt.genSalt(8, (err, salt) => {
    if (err) next(err);

    bcrypt.hash(this.password, salt, null, (hashErr, hash) => {
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});

/**
 * [comparePassword description]
 * @param  {[type]}   password [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
user.methods.validPassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

export default mongoose.model('User', user);
