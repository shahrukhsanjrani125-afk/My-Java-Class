import mongoose, { Schema, Document } from 'mongoose';
export interface IQRToken extends Document {
  sessionId: mongoose.Types.ObjectId;
  tokenHash: string;
  issuedAt: Date;
  expiresAt: Date;
  status: 'active'|'expired';
}
const QRSchema = new Schema<IQRToken>({
  sessionId: { type: Schema.Types.ObjectId, ref: 'AttendanceSession', required: true },
  tokenHash: { type: String, required: true, unique: true },
  issuedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  status: { type: String, enum: ['active','expired'], default: 'active' }
}, { timestamps: true });
QRSchema.index({ sessionId: 1, expiresAt: 1 });
export const QRToken = mongoose.model<IQRToken>('QRToken', QRSchema);
