import mongoose from 'mongoose';

const appointment = mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  purpose: String,
  scheduledOn: Date,
  status: {
    type: String,
    enum: ['Approved', 'Declined', 'Pending'],
  },
  comment: String,
  completed: { type: Boolean, default: false },
},
  {
    timestamps: true,
  });

appointment.pre('save', function save(next) {
  if (this.status === 'Declined') { this.completed = true; }
  next();
});

export default mongoose.model('Appointment', appointment);
