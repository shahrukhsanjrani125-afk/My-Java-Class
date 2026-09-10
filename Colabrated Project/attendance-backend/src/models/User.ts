import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  INSTITUTION_ADMIN = 'institution_admin',
  INSTRUCTOR = 'instructor'
}
export interface IUser extends Document {
  institutionId?: mongoose.Types.ObjectId;
  role: UserRole;
  name: string;
  email: string;
  passwordHash: string;
  status: 'active'|'inactive';
  comparePassword(candidate: string): Promise<boolean>;
}
const UserSchema = new Schema<IUser>({
  institutionId: { type: Schema.Types.ObjectId, ref: 'Institution' },
  role: { type: String, enum: Object.values(UserRole), required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  status: { type: String, enum: ['active','inactive'], default: 'active' }
}, { timestamps: true });
UserSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});
UserSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.passwordHash);
};
export const User = mongoose.model<IUser>('User', UserSchema);
