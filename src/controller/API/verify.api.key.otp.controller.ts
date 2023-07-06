import moment from "moment";
import OTPModel from "../../model/otp.model";
import RouteParamsHandler from "../../types/routeParams.type";
import CustomErrorHandler from "../../utils/ErrorHandler/custom.errorHandler";
import APIKeyRequestModel from "../../model/api.key.request.model";

const verifyAPIKeyOTP: RouteParamsHandler = async (req, res, next) => {
  try {
    const { otp } = req.body;

    // find the otp in database and verify it
    const OTP = await OTPModel.findOne({ OTP: otp });

    // if otp not found
    if (!OTP) {
      return next(CustomErrorHandler.notFound("OTP NOT FOUND"));
    }

    // otp expiration
    if (moment().isAfter(OTP.expiresIn?.getTime())) {
      return next(new CustomErrorHandler(400, "OTP Expired"));
    }

    // find the api request with client id associated to otp stored in apireqeust database
    const APIkeyRequest = await APIKeyRequestModel.findOne({
      visitorId: OTP.userId,
    });

    if (!APIkeyRequest)
      return next(CustomErrorHandler.notFound("No Request Found"));

    APIkeyRequest.verificationStatus = true;
    await APIkeyRequest.save();

    // delete the stored otp
    await OTPModel.deleteOne({ userId: OTP.userId });

    res.send("verified");
  } catch (error) {
    next(error);
  }
};

export default verifyAPIKeyOTP;
