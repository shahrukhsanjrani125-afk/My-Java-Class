import mongoose, { Schema, Document } from 'mongoose';
export interface IClass extends Document {
  institutionId: mongoose.Types.ObjectId;
  name: string;
  code: string;
  instructorIds: mongoose.Types.ObjectId[];
  timezone: string;
  room: string;
  schedule: { startTime: string; endTime: string; days: string[] };
  status: 'active'|'archived';
}
const ClassSchema = new Schema<IClass>({
  institutionId: { type: Schema.Types.ObjectId, ref: 'Institution', required: true },
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  instructorIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  timezone: { type: String, default: 'Asia/Karachi' },
  room: { type: String, required: true },
  schedule: {
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    days: [{ type: String }]
  },
  status: { type: String, enum: ['active','archived'], default: 'active' }
}, { timestamps: true });
export const Class = mongoose.model<IClass>('Class', ClassSchema);
