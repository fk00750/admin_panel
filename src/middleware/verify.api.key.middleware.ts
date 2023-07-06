import APIKeyModel from "../model/api.key.model";
import RouteParamsHandler from "../types/routeParams.type";
import CustomErrorHandler from "../utils/ErrorHandler/custom.errorHandler";

const verifyAPIKeyMiddleware: RouteParamsHandler = async (req, res, next) => {
  try {
    const apiKey = req.header("x-api-key");
    const clientId = req.query.clientId;

    const apiKeyData = await APIKeyModel.findOne({ apiKey, clientId });

    if (apiKeyData) {
      next();
    } else {
      return next(
        CustomErrorHandler.unAuthorized("Wrong API Key OR Client Id")
      );
    }
  } catch (error) {
    return next(new CustomErrorHandler(400, "Error in API Key Verification"));
  }
};

export default verifyAPIKeyMiddleware