import RefreshTokenModel from "../../model/refreshToken.model";
import RouteParamsHandler from "../../types/routeParams.type";
import CustomErrorHandler from "../../utils/ErrorHandler/custom.errorHandler";

const LogOutController: RouteParamsHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    // delete token
    const deleteRefreshToken = await RefreshTokenModel.findOneAndDelete({
      refreshToken,
    });

    if (!deleteRefreshToken)
      return next(CustomErrorHandler.unAuthorized("Unable to Logout"));

    res.status(200).json({
      message: "Logout",
    });
  } catch (error) {
    next(error);
  }
};

export default LogOutController;
