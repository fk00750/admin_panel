import Joi from "joi";
import RouteParamsHandler from "../../types/routeParams.type";
import CustomErrorHandler from "../../utils/ErrorHandler/custom.errorHandler";
import UserModel from "../../model/user.model";
import CheckPasswordValidity from "../../utils/helpers/check.password.validity";
import OTPModel from "../../model/otp.model";
import moment from "moment";
import SendVerificationEmailOtp from "../../utils/helpers/send.otp.via.email";

const LoginController: RouteParamsHandler = async (req, res, next) => {
  try {
    // Validate Login credentials type
    const loginValidationSchema = Joi.object({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .label("Username"),
      email: Joi.string().email().required().label("Email"),
      password: Joi.string()
        .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"))
        .message(
          "Password must be at least 8 characters long and contain at least one letter and one number."
        )
        .required()
        .label("Password"),
    });

    const { error } = loginValidationSchema.validate(req.body);

    if (error)
      return next(new CustomErrorHandler(400, error.details[0].message));

    // Find User in Database with Email
    const user = await UserModel.findOne({ email: req.body.email });

    // if user exists
    if (!user) return next(CustomErrorHandler.notFound("User Not Found"));

    // check admin email
    if (user.email !== "bs780686@gmail.com")
      return next(CustomErrorHandler.unAuthorized("Access Denied"));

    // Is user verified
    if (!user.verified)
      return next(CustomErrorHandler.nonVerified("User is Not Verified"));

    // Check User Role
    if (user.role === "User")
      return next(CustomErrorHandler.unAuthorized("Access Denied"));

    // Check Password Validity
    if (typeof user.password !== "string") {
      return next(new CustomErrorHandler(500, "Invalid password in database"));
    }

    // Check Password Validity
    const isPasswordValid = await CheckPasswordValidity(
      user.id,
      req.body.password,
      user.password
    );

    if (!isPasswordValid)
      return next(CustomErrorHandler.wrongCredentials("Password is wrong"));

    // verify email with otp
    try {
      // generate one time password
      const OTP = Math.floor(100000 + Math.random() * 900000).toString();

      // store one time password
      const NewOTP = new OTPModel({
        userId: user.id,
        OTP: OTP,
        expiresIn: moment().add(15, "minutes").toDate(),
      });

      // get user id and user email
      const userId = user.id;
      const userEmail = user.email;

      if (userId && userEmail) {
        await SendVerificationEmailOtp(
          userEmail,
          OTP,
          "Verify OTP",
          "Verify Your OTP",
          "Below is your one time password"
        );
      }

      // save otp
      await NewOTP.save();
    } catch (error) {
      next(error);
    }

    res.status(200).send("Verify OTP");
  } catch (error) {
    next(error);
  }
};

export default LoginController;
