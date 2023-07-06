import Joi from "joi";
import RouteParamsHandler from "../../types/routeParams.type";
import CustomErrorHandler from "../../utils/ErrorHandler/custom.errorHandler";
import { RefreshTokenRotation } from "../../utils/helpers/refresh.token.rotation";

const refreshTokenController: RouteParamsHandler = async (req, res, next) => {
  try {
    const { refreshToken: token } = req.body;

    // refresh token type validation
    const refreshTokenValidationSchema = Joi.string()
      .required()
      .label("Refresh Token");

    const { error } = refreshTokenValidationSchema.validate(token);

    if (error)
      return next(new CustomErrorHandler(400, "Invalid Refresh Token Type"));

    // user
    const user = (<any>req).user;

    // Implementing refresh token rotation
    const { accessToken, refreshToken } = await RefreshTokenRotation.refresh(
      token,
      user
    );

    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

export default refreshTokenController
