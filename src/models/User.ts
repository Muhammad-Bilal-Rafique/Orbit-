import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  code: string | null;
  expiration: Date | null;
  resetCode?: string | null;
  resetExpiration?: Date | null;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    isVerified: { type: Boolean, default: false },
    code: { type: String, default: null },
    expiration: { type: Date, default: null },
    resetCode: { type: String, default: null },
    resetExpiration: { type: Date, default: null },
  },
  { timestamps: true },
);

export const User =
  mongoose.models.User_accounts ||
  mongoose.model<IUser>("User_accounts", UserSchema);
