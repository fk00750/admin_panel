import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the Notification document
interface INotification extends Document {
  title: string;
  message: string;
  date: Date;
}

// Define the schema for the Notification collection
const notificationSchema = new Schema<INotification>(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { collection: "notifications" }
);

// Create the Notification model
const NotificationModel = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);

export default NotificationModel;
