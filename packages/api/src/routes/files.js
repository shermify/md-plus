import multer from 'multer';
import File from '../models/file';

// multer configuration for saving files
// save a record in database, then store file by objectId
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'files/patient');
  },
  filename(req, file, cb) {
    const patientId = req.params.id;
    File.create({ patient: patientId, fileName: file.originalname })
    .then((f) => {
      const id = f._id.toString();
      cb(null, id);
    });
  },
});

const upload = multer({ storage });

export default(router) => {
  // Find file by id in database and return the actual file with filename
  router.get('/files/:id', (req, res) => {
    const id = req.params.id;
    File.findById(id).exec()
      .then((file) => {
        res.download(`files/patient/${file._id}`, file.fileName);
      })
      .catch((err) => { res.status(400).json({ success: false, message: err }); });
  });
  // upload a single file
  router.post('/patients/:id/files', upload.single('file'), (req, res) => {
    res.status(200).json({ success: true });
  });
};
