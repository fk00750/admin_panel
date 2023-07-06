import Joi from "joi";
import RouteParamsHandler from "../../types/routeParams.type";
import CustomErrorHandler from "../../utils/ErrorHandler/custom.errorHandler";
import UserModel from "../../model/user.model";

// Write a postman test script for the following "RegisterController" route
const RegisterController: RouteParamsHandler = async (req, res, next) => {
  try {
    // Validate Login credentials type
    const RegisterValidationSchema = Joi.object({
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
      repeatPassword: Joi.ref("password"),
    });

    const { error } = RegisterValidationSchema.validate(req.body);

    if (error)
      return next(new CustomErrorHandler(400, error.details[0].message));

    // Find User in Database with Email
    try {
      // email
      const { email } = req.body;

      // check admin email
      if (email !== "bs780686@gmail.com")
        return next(CustomErrorHandler.unAuthorized("Access Denied"));

      const UserExist = await UserModel.exists({ email });

      if (UserExist) {
        return next(CustomErrorHandler.alreadyExist("Email is Not Available"));
      }
    } catch (error) {
      next(error);
    }

    // save user details into database
    try {
      const { username, email, password } = req.body;

      await new UserModel({
        username: username,
        email: email,
        password: password,
      }).save();
    } catch (error) {
      next(error);
    }

    res.status(200).send("User Registered Successfully");
  } catch (error) {
    next(error);
  }
};

export default RegisterController;
