import moment from "moment";
import OTPModel from "../../model/otp.model";
import RouteParamsHandler from "../../types/routeParams.type";
import CustomErrorHandler from "../../utils/ErrorHandler/custom.errorHandler";
import UserModel from "../../model/user.model";
import RefreshTokenModel from "../../model/refreshToken.model";
import IssueAccessAndRefreshToken from "../../utils/helpers/issue.jwt.token";
import { JwtPayload, decode } from "jsonwebtoken";

enum ROLE {
  ADMIN = "Admin",
  OTHER = "Other",
}

// Can you spot a Bug in the following Code:
const verifyOtpController: RouteParamsHandler = async (req, res, next) => {
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

    // find the user in database with userid associated to otp
    const user = await UserModel.findOne({ _id: OTP.userId });

    if (!user) return next(CustomErrorHandler.notFound("User Not Found"));

    // find the refresh token stored in database for specific user
    const ExistingRefreshToken = await RefreshTokenModel.findOne({
      userId: OTP.userId,
    });

    // Delete All Previous Existing Refresh Token of a specific User
    if (ExistingRefreshToken) {
      await RefreshTokenModel.deleteMany({
        userId: ExistingRefreshToken.userId,
      });
    }

    let accessToken, refreshToken;

    if (user.role === ROLE.ADMIN) {
      accessToken = await IssueAccessAndRefreshToken.issueAdminAccessToken(
        user.id
      );

      refreshToken = await IssueAccessAndRefreshToken.issueAdminRefreshToken(
        user.id
      );
    }

    // decoding refresh token to check it's validity
    const decoded = decode(refreshToken as string, { complete: true });

    // if decoded token is not valid
    if (!decoded) {
      return next(
        new CustomErrorHandler(400, "Invalid Generated Refresh Token")
      );
    }

    const { payload } = decoded as { payload: JwtPayload };

    const expiresAt = payload.exp;

    // save new refresh token in database
    await new RefreshTokenModel({
      refreshToken,
      expiresAt,
      status: "valid",
      userId: user.id,
    }).save();

    // delete the stored OTP
    await OTPModel.deleteOne({ userId: user.id });

    // issue Access and Refresh Token
    res.status(200).json({
      message: "Success",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export default verifyOtpController;
