import mongoose, { Document, Schema } from "mongoose";

// Define the Banner interface
interface IBanner extends Document {
  imageUrl: string;
  caption: string;
  isActive: boolean;
}

// Define the Banner schema
const BannerSchema = new Schema<IBanner>({
  imageUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// Create the Banner model
const BannerModel = mongoose.model<IBanner>("Banner", BannerSchema);

export default BannerModel;
