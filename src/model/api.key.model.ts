import mongoose, { Document, Schema, model } from "mongoose";

// Define the database schema for storing API keys
interface ApiKeyDocument extends Document {
  apiKey: string;
  clientId: string;
  allotedEmail: string;
}

const APIKeySchema = new Schema<ApiKeyDocument>({
  apiKey: {
    type: String,
    required: true,
    unique: true,
  },
  clientId: {
    type: String,
    required: true,
    unique: true,
  },
  allotedEmail: {
    type: String,
    unique: true,
  },
});

const APIKeyModel = model<ApiKeyDocument>("apikey", APIKeySchema);

export default APIKeyModel;
