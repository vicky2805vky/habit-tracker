import { hash } from "bcrypt";
import { HydratedDocument, Model, model, Schema } from "mongoose";

interface IUser {
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
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const hashedPassword = await hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

export const User = model("User", userSchema);

export type UserDoc = HydratedDocument<IUser>;
