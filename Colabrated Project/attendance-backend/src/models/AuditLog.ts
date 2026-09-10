import mongoose, { Schema, Document } from 'mongoose';
export interface IAuditLog extends Document {
  institutionId: mongoose.Types.ObjectId;
  actorId: mongoose.Types.ObjectId;
  action: string;
  entityType: string;
  entityId: mongoose.Types.ObjectId;
  timestamp: Date;
  reason?: string;
  metadata?: any;
}
const AuditSchema = new Schema<IAuditLog>({
  institutionId: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
  actorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  entityType: { type: String, required: true },
  entityId: { type: Schema.Types.ObjectId, required: true },
  timestamp: { type: Date, default: Date.now },
  reason: { type: String },
  metadata: { type: Schema.Types.Mixed }
}, { timestamps: false });
AuditSchema.index({ institutionId: 1, timestamp: -1 });
export const AuditLog = mongoose.model<IAuditLog>('AuditLog', AuditSchema);
