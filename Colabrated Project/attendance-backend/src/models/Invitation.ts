import mongoose, { Schema, Document } from 'mongoose';
export interface IInvitation extends Document {
  classId: mongoose.Types.ObjectId;
  studentId?: mongoose.Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  status: 'pending'|'used'|'expired';
  createdBy: mongoose.Types.ObjectId;
  usedAt?: Date;
}
const InvitationSchema = new Schema<IInvitation>({
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student' },
  tokenHash: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  status: { type: String, enum: ['pending','used','expired'], default: 'pending' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  usedAt: { type: Date }
}, { timestamps: true });
export const Invitation = mongoose.model<IInvitation>('Invitation', InvitationSchema);
