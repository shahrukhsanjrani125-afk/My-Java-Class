import mongoose, { Schema, Document } from 'mongoose';
export interface IInstitution extends Document {
  name: string; code: string; timezone: string; status: 'active'|'inactive';
}
const InstitutionSchema = new Schema<IInstitution>({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  timezone: { type: String, default: 'Asia/Karachi' },
  status: { type: String, enum: ['active','inactive'], default: 'active' }
}, { timestamps: true });
export const Institution = mongoose.model<IInstitution>('Institution', InstitutionSchema);
