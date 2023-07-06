import { compare } from "bcrypt";
import Pepper from "../../model/pepper.model";

const CheckPasswordValidity = async (
  userId: any,
  passwordUserEntered: string,
  hashedPasswordStoredInDatabase: string
): Promise<boolean> => {
  // Get User Password Pepper Value from DB
  const UserPasswordPepperValue = await Pepper.findOne({ userId });

  if (!UserPasswordPepperValue) {
    throw new Error("Invalid User");
  }

  // combine complete password
  const CompletePassword =
    passwordUserEntered + UserPasswordPepperValue.pepperValue;

  // comparing the password
  const isPasswordValid = await compare(
    CompletePassword,
    hashedPasswordStoredInDatabase
  );

  return isPasswordValid;
};

export default CheckPasswordValidity;
