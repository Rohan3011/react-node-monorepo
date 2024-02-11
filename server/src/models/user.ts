import { Document, Schema, model } from "mongoose";
import argon2 from "argon2";
import log from "@/utils/logger";

export const privateFields = ["password", "__v"];

export interface User extends Document {
  email: string;
  name: string;
  password: string;
  onboarding: boolean;
  validatePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<User>(
  {
    email: { type: String, lowercase: true, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    onboarding: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (this: User, next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hash = await argon2.hash(this.password);
    this.password = hash;
    next();
  } catch (error: any) {
    log.error(error, "Could not hash password");
    next(error);
  }
});

userSchema.methods.validatePassword = async function (
  this: User,
  candidatePassword: string
) {
  try {
    return await argon2.verify(this.password, candidatePassword);
  } catch (error) {
    log.error(error, "Could not validate password");
    return false;
  }
};

const UserModel = model<User>("User", userSchema);

export default UserModel;
