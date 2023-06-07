import mongoose, { InferSchemaType } from "mongoose";
const Schema = mongoose.Schema;

export type TUser = InferSchemaType<typeof UserSchema>;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String },
});

UserSchema.virtual("url").get(function () {
  return "/user/" + this._id;
});

export default mongoose.model("UserSchema", UserSchema);
