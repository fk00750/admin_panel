import APIKeyRequestModel from "../../model/api.key.request.model";
import RouteParamsHandler from "../../types/routeParams.type";
import CustomErrorHandler from "../../utils/ErrorHandler/custom.errorHandler";

const getAPIKeyRequestsController: RouteParamsHandler = async (
  req,
  res,
  next
) => {
  try {
    const apikeyRequests = await APIKeyRequestModel.find().sort({ date: -1 });

    if (!apikeyRequests) {
      return next(CustomErrorHandler.notFound("No API Key Requests"));
    }

    res.status(200).send(apikeyRequests);
  } catch (error) {
    next(error);
  }
};

export default getAPIKeyRequestsController;
