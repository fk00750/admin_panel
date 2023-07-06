import RefreshTokenModel from "../../model/refreshToken.model";
import RouteParamsHandler from "../../types/routeParams.type";
import CustomErrorHandler from "../ErrorHandler/custom.errorHandler";

const verifyRefreshToken: RouteParamsHandler = async (req, res, next) => {
  try {
    const BearerRefreshToken = req.headers.authorization?.split(" ")[1];

    // find the refresh token
    const DatabaseRefreshToken = await RefreshTokenModel.findOne({
      refreshToken: BearerRefreshToken,
    });

    if (!DatabaseRefreshToken) {
      return next(CustomErrorHandler.notFound("Refresh Token Not Found"));
    }

    // check validity
    if (DatabaseRefreshToken.status === "invalid") {
      return next(
        CustomErrorHandler.nonVerified("Invalid Valid Refresh Token")
      );
    }

    req.body.refreshToken = DatabaseRefreshToken.refreshToken;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyRefreshToken;
