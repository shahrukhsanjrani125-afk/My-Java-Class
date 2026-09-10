import mongoose, { Schema, Document } from 'mongoose';
export interface IEnrollment extends Document {
  classId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  status: 'active'|'dropped';
  joinedAt: Date;
}
const EnrollmentSchema = new Schema<IEnrollment>({
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  status: { type: String, enum: ['active','dropped'], default: 'active' },
  joinedAt: { type: Date, default: Date.now }
}, { timestamps: true });
EnrollmentSchema.index({ classId: 1, studentId: 1 }, { unique: true });
export const Enrollment = mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
