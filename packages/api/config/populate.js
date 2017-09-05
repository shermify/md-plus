import faker from 'faker';
import path from 'path';
import fs from 'fs';
import User from '../src/models/user';
import Appointment from '../src/models/appointment';
import logger from './logger';
import File from '../src/models/file';

/*
 Generate fake data just for demo purposes
 */
const createFiles = (id) => {
  const file = {
    patient: id,
    fileName: `${faker.system.commonFileName().split('.')[0]}.pdf`,
  };
  File.create(file).then((result) => {
    fs.createReadStream('files/fake.pdf')
      .pipe(fs.createWriteStream(`files/patient/${result._id}`));
  });
};
const removeAll = () => {
  fs.readdir('files/patient', (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      fs.unlink(path.join('files/patient', file), (delerr) => {
        if (delerr) throw delerr;
      });
    });
  });
};
const createAppts = (id, doctors) => {
  for (let i = 0; i < 8; i += 1) {
    const pending = {
      patient: id,
      doctor: faker.helpers.shuffle(doctors)[0]._id,
      purpose: faker.lorem.sentences(),
      scheduledOn: faker.date.future(),
      status: 'Pending',
    };
    const future = {
      patient: id,
      doctor: faker.helpers.shuffle(doctors)[0]._id,
      purpose: faker.lorem.sentences(),
      scheduledOn: faker.date.future(),
      status: 'Approved',
    };
    const past = {
      patient: id,
      doctor: faker.helpers.shuffle(doctors)[0]._id,
      purpose: faker.lorem.sentences(),
      scheduledOn: faker.date.past(),
      status: 'Approved',
      completed: true,
    };
    const appt = faker.helpers.shuffle([pending, future, past])[0];
    Appointment.create(appt);
  }
};

const getUser = (role) => {
  const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    address: {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
    },
    phone: faker.phone.phoneNumber(),
    age: faker.random.number(100),
    gender: faker.helpers.shuffle('Male', 'Female'),
    password: 'test',
    role,
    // avatar: getFile(faker.image.avatar(), `files/avatars/${faker.random.uuid()}.jpg`),
  };
  return user;
};
export default ((n) => {
  removeAll();
  const doctorArray = [];
  for (let i = 0; i < 3; i += 1) {
    doctorArray.push(User.create(getUser('Doctor')));
  }

  Promise.all(doctorArray).then((doctors) => {
    doctors.forEach(doctor =>
      logger.log('info', `Created a new DOCTOR: Email: ${doctor.email}, Password: test`));
    for (let i = 0; i < n; i += 1) {
      User.create(getUser('Patient'))
      .then((newUser) => {
        logger.log('info', `Created a new PATIENT: Email: ${newUser.email}, Password: test`);
        createAppts(newUser._id, doctors);
        createFiles(newUser._id);
      });
    }
  });
});
