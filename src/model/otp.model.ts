import { Schema, model } from "mongoose";

interface IOTP {
  userId: string;
  OTP: String;
  expiresIn: Date;
}

const OTPSchema = new Schema<IOTP>(
  {
    userId: {
      type: String,
      unique: true,
    },
    OTP: {
      type: String,
      unique: true,
    },
    expiresIn: {
      type: Date,
    },
  },
  { timestamps: true }
);

OTPSchema.pre("save", async function (next) {
  try {
    const existingOTP = await OTPModel.findOne({ userId: this.userId });

    if (existingOTP) {
      // Delete the existing OTP if found
      await OTPModel.findOneAndDelete({ OTP: existingOTP.OTP });
    }
  } catch (error) {
    next(error);
  }
});

const OTPModel = model<IOTP>("OTPs", OTPSchema);

export default OTPModel;
