import mongoose, { Schema, Document } from 'mongoose';
export interface IStudent extends Document {
  institutionId: mongoose.Types.ObjectId;
  nicNumber: string;
  name: string;
  status: 'active'|'inactive';
}
const StudentSchema = new Schema<IStudent>({
  institutionId: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
  nicNumber: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, enum: ['active','inactive'], default: 'active' }
}, { timestamps: true });
StudentSchema.index({ institutionId: 1, nicNumber: 1 }, { unique: true });
export const Student = mongoose.model<IStudent>('Student', StudentSchema);
