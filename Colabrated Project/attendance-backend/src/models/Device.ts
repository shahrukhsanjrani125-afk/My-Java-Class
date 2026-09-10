import mongoose, { Schema, Document } from 'mongoose';
export interface IDevice extends Document {
  institutionId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  deviceTokenHash: string;
  status: 'active'|'revoked'|'rebind-required';
  userAgent?: string;
  registeredAt: Date;
  lastSeenAt: Date;
}
const DeviceSchema = new Schema<IDevice>({
  institutionId: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  deviceTokenHash: { type: String, required: true },
  status: { type: String, enum: ['active','revoked','rebind-required'], default: 'active' },
  userAgent: { type: String },
  registeredAt: { type: Date, default: Date.now },
  lastSeenAt: { type: Date, default: Date.now }
}, { timestamps: true });
DeviceSchema.index({ studentId: 1, status: 1 });
export const Device = mongoose.model<IDevice>('Device', DeviceSchema);
