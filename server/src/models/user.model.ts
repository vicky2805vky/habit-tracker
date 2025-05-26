import { hash } from "bcrypt";
import { HydratedDocument, Model, model, Schema } from "mongoose";

export interface IUser {
  userName: string;
  email: string;
  password: string;
}

type UserModel = Model<IUser>;

const userSchema = new Schema<IUser, UserModel>(
  {
    userName: {
      type: String,
      required: true,
      maxLength: 30,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

export const User = model("User", userSchema);

export type UserDoc = HydratedDocument<IUser>;
