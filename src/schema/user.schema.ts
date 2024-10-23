import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String },
    screenProgress: [{ screen: { type: Number }, point: { type: Number } }],
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

UserSchema.pre('save', function (next) {
  if (this.password !== this.confirmPassword) {
    return next(new Error('Passwords do not match'));
  }
  next();
});

export { UserSchema };
