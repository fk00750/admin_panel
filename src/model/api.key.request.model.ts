import { Schema, model } from "mongoose";

const APIKeyRequestSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  visitorId: {
    type: String,
    required: true,
    unique: true,
  },
  requestStatus: {
    type: String,
    default: "PENDING",
  },
  verificationStatus: {
    type: Boolean,
    default: false,
  },
});

const APIKeyRequestModel = model("apikeyrequest", APIKeyRequestSchema);

export default APIKeyRequestModel;
