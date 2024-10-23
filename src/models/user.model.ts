import mongoose, { Document } from 'mongoose';
import { UserSchema } from 'src/schema/user.schema';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  screenProgress: {
    screen: number;
    point: number;
  }[];
}

export const UserModel = mongoose.model<User>('User', UserSchema);
