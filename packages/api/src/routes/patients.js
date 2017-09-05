import User from '../models/user';
import Appointments from '../models/appointment';
import File from '../models/file';

export default(router) => {
  // GET a list of all patients in the system
  router.get('/patients', (req, res) => {
    User.find({ role: 'Patient' }).exec()
      .then((users) => {
        res.json(users.map(item => ({
          _id: item._id,
          firstName: item.firstName,
          lastName: item.lastName,
        })));
      })
      .catch((err) => { res.status(400).json({ success: false, message: err }); });
  });

  // GET details for single patient with attachments
  router.get('/patients/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id).exec()
      .then((patient) => {
        File.find({ patient: id }).exec()
        .then((files) => {
          res.json({ ...patient._doc, files });
        });
      })
      .catch((err) => { res.status(400).json({ success: false, message: err }); });
  });

  // GET all appointments for a patient
  router.get('/patients/:id/appointments', (req, res) => {
    const id = req.params.id;
    Appointments.find({ patient: id })
    .populate('patient')
    .populate('doctor')
    .sort({ scheduledOn: -1 })
    .exec()
      .then((appts) => { res.json(appts); })
      .catch((err) => { res.status(400).json({ success: false, message: err }); });
  });

  // POST save a new appointment for a patient
  router.post('/patients/:id/appointments', (req, res) => {
    const id = req.params.id;
    const appt = req.body;
    appt.patient = id;
    Appointments.create(appt)
      .then(() => { res.status(201).json({ success: true }); })
      .catch((err) => { res.status(400).json({ success: false, message: err }); });
  });

  // PUT update status and comment on an appointment
  router.put('/appointments/:id', (req, res) => {
    const id = req.params.id;
    const { status, comment } = req.body;

    Appointments.findById(id).exec()
    .then((appt) => {
      appt.status = status;
      appt.comment = comment;
      appt.save()
      .then(() => { res.status(200).json({ success: true }); });
    }).catch((err) => { res.status(400).json({ success: false, message: err }); });
  });
};
