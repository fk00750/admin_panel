import { Schema, model } from "mongoose";

interface IPepper {
  userId: string;
  pepperValue: string;
}

const PepperSchema = new Schema<IPepper>({
  userId: {
    type: String,
    unique: true,
    required:true
  },
  pepperValue: {
    type: String,
    unique: true,
    required:true,
  },
});

const Pepper = model("Peppers", PepperSchema);

export default Pepper;