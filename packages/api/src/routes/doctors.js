import User from '../models/user';

export default(router) => {
  // get a list of doctors for select list, no personal information
  router.get('/doctors', (req, res) => {
    User.find({ role: 'Doctor' }).exec()
      .then((users) => {
        res.json(users.map(user => ({
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        })));
      })
      .catch((err) => { res.status(400).json({ success: false, message: err }); });
  });
};
