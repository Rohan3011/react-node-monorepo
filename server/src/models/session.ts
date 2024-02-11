import { Document, Schema, model } from "mongoose";
import { User } from "./user";

export interface Session extends Document {
  user: User["_id"];
  valid: boolean;
}

const sessionSchema = new Schema<Session>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    valid: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const SessionModel = model<Session>("Session", sessionSchema);

export default SessionModel;
