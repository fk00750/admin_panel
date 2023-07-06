import crypto from "crypto";
import Pepper from "../../model/pepper.model";
import { genSalt, hash } from "bcrypt";

// Complete and refactor the following code:

const generateSecurePassword = async function (
  userId: string,
  password: string
): Promise<string> {
  try {
    // create a pepper value
    let cryptoPepperValue = crypto.randomBytes(32).toString("hex");

    const existingPepperValue = await Pepper.findOne({ userId });

    if (!existingPepperValue) {
      await new Pepper({ userId, pepperValue: cryptoPepperValue }).save();
    } else {
      throw new Error("User already exists"); // Throw an error suggesting the user already exists
    }

    // user normal password + pepper value
    const CombinePassword = password + cryptoPepperValue;

    // Generate a salt for password hashing
    const salt = await genSalt(12);

    // Hash the salted password
    const hashedPassword = await hash(CombinePassword, salt);

    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

export default generateSecurePassword;
