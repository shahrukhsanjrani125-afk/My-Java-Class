import mongoose, { Schema, Document } from 'mongoose';
export interface IAttendanceEvent extends Document {
  sessionId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  deviceId: mongoose.Types.ObjectId;
  type: 'TIME_IN'|'TIME_OUT';
  recordedAt: Date;
  status: 'present'|'late'|'early'|'corrected';
  lateMinutes: number;
  earlyMinutes: number;
  clientIp: string;
  networkProfileId?: mongoose.Types.ObjectId;
  correctionInfo?: { correctedBy: mongoose.Types.ObjectId; reason: string; originalData: any; correctedAt: Date };
}
const EventSchema = new Schema<IAttendanceEvent>({
  sessionId: { type: Schema.Types.ObjectId, ref: 'AttendanceSession', required: true },
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  deviceId: { type: Schema.Types.ObjectId, ref: 'Device', required: true },
  type: { type: String, enum: ['TIME_IN','TIME_OUT'], required: true },
  recordedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['present','late','early','corrected'], default: 'present' },
  lateMinutes: { type: Number, default: 0 },
  earlyMinutes: { type: Number, default: 0 },
  clientIp: { type: String, required: true },
  networkProfileId: { type: Schema.Types.ObjectId, ref: 'NetworkProfile' },
  correctionInfo: {
    correctedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    reason: { type: String },
    originalData: { type: Schema.Types.Mixed },
    correctedAt: { type: Date }
  }
}, { timestamps: true });
EventSchema.index({ sessionId: 1, studentId: 1, type: 1 }, { unique: true });
export const AttendanceEvent = mongoose.model<IAttendanceEvent>('AttendanceEvent', EventSchema);
