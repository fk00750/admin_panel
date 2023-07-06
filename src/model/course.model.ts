import mongoose, { Document, Schema } from "mongoose";

// Define the Course interface
interface ICourse extends Document {
  name: string;
  description: string;
  duration: number;
  registrationFee: number;
  admissionFee: number;
}

// Define the Course schema
const CourseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  registrationFee: {
    type: Number,
    required: true,
  },
  admissionFee: {
    type: Number,
    required: true,
  },
});

// Create the Course model
const CourseModel = mongoose.model<ICourse>("Course", CourseSchema);

export default CourseModel;
