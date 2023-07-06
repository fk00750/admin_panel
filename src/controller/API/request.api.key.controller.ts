import moment from "moment";
import OTPModel from "../../model/otp.model";
import RouteParamsHandler from "../../types/routeParams.type";
import generateAPIkeyAndClientId from "../../utils/api/generate.api.key.client.id";
import SendVerificationEmailOtp from "../../utils/helpers/send.otp.via.email";
import Joi from "joi";
import APIKeyRequestModel from "../../model/api.key.request.model";
import CustomErrorHandler from "../../utils/ErrorHandler/custom.errorHandler";

// Error
/**
E11000 duplicate key error collection: MKC_JEE_NEET_ADMIN_PANEL_DEV.apikeyrequests index: clientId_1 dup key: { clientId: null }
 */

const requestAPIkeyController: RouteParamsHandler = async (req, res, next) => {
  try {
    // Email Type Validation
    const EmailValidation = Joi.object({
      email: Joi.string().email().required().label("Email"),
    });

    const { error } = EmailValidation.validate(req.body);

    if (error)
      return next(new CustomErrorHandler(400, error.details[0].message));

    const { email } = req.body;

    // check if email already exists
    const isEmailExists = await APIKeyRequestModel.findOne({ email: email });

    if (isEmailExists?.email) {
      return next(CustomErrorHandler.alreadyExist("Email Already Exists"));
    }

    const { clientId: visitorId } = generateAPIkeyAndClientId();

    // generate one time password
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    // store one time password
    const NewOTP = new OTPModel({
      userId: visitorId,
      OTP: OTP,
      expiresIn: moment().add(15, "minutes").toDate(),
    });

    if (email && visitorId) {
      await SendVerificationEmailOtp(
        email,
        OTP,
        "Verify OTP",
        "Verify Your OTP",
        "Below is your OTP"
      );
    }

    await new APIKeyRequestModel({
      email: email,
      visitorId: visitorId,
    }).save();

    // save otp
    await NewOTP.save();

    res.status(200).send("Verify OTP send to your email");
  } catch (error) {
    next(error);
  }
};

export default requestAPIkeyController;
