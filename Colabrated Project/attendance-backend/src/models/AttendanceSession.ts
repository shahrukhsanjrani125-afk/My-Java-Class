import mongoose, { Schema, Document } from 'mongoose';
export interface IAttendanceSession extends Document {
  classId: mongoose.Types.ObjectId;
  date: Date;
  type: 'TIME_IN'|'TIME_OUT';
  scheduledStart: Date;
  scheduledEnd: Date;
  allowedFrom: Date;
  allowedUntil: Date;
  refreshInterval: number;
  status: 'active'|'ended'|'expired';
  createdBy: mongoose.Types.ObjectId;
  startedAt: Date;
  endedAt?: Date;
}
const SessionSchema = new Schema<IAttendanceSession>({
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['TIME_IN','TIME_OUT'], required: true },
  scheduledStart: { type: Date, required: true },
  scheduledEnd: { type: Date, required: true },
  allowedFrom: { type: Date, required: true },
  allowedUntil: { type: Date, required: true },
  refreshInterval: { type: Number, default: 20 },
  status: { type: String, enum: ['active','ended','expired'], default: 'active' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date }
}, { timestamps: true });
export const AttendanceSession = mongoose.model<IAttendanceSession>('AttendanceSession', SessionSchema);
