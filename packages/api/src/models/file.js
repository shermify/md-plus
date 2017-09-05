import mongoose from 'mongoose';

const file = mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileName: String,
  id: String,
},
  {
    timestamps: true,
  });

export default mongoose.model('File', file);
