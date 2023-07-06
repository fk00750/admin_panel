import { model, Schema, SchemaOptions } from "mongoose";
import generateSecurePassword from "../utils/helpers/generate.secure.password";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please Provide Name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please Provide Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
  },
  role: {
    type: String,
    default: "User",
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    if (typeof this.password !== "string") {
      throw new Error("Invalid password");
    }

    const hashedPassword: string = await generateSecurePassword(
      this.id,
      this.password
    );
    this.password = hashedPassword;
  } catch (error) {
    next(error);
  }
});

const UserModel = model("user", UserSchema);

export default UserModel;
