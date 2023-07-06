import APIKeyModel from "../../model/api.key.model";
import APIKeyRequestModel from "../../model/api.key.request.model";
import RouteParamsHandler from "../../types/routeParams.type";
import generateAPIkeyAndClientId from "../../utils/api/generate.api.key.client.id";
import SendVerificationEmailOtp from "../../utils/helpers/send.otp.via.email";

const manageAPIkeyStatusController: RouteParamsHandler = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    const { requestStatus } = req.body;

    let apikeyRequest;

    if (requestStatus === "REJECT") {
      apikeyRequest = await APIKeyRequestModel.findByIdAndDelete(id);
    } else if (requestStatus === "APPROVE") {
      // Find and update the API key request
      apikeyRequest = await APIKeyRequestModel.findByIdAndUpdate(
        id,
        { requestStatus },
        { new: true }
      );

      // Generate a new API key and client ID
      const { apiKey, clientId } = generateAPIkeyAndClientId();

      // Find if email exists in APIKeyModel
      const email = apikeyRequest?.email;
      let apiKeyRecord = await APIKeyModel.findOne({ allotedEmail: email });

      if (email && apiKey && clientId) {
        if (apiKeyRecord) {
          // Update the existing API key record
          apiKeyRecord.apiKey = apiKey;
          apiKeyRecord.clientId = clientId;
          await apiKeyRecord.save();
        } else {
          // Create a new API key record
          apiKeyRecord = new APIKeyModel({
            apiKey,
            clientId,
            allotedEmail: email,
          });
          await apiKeyRecord.save();
        }

        // Send client ID and API key via email
        await SendVerificationEmailOtp(
          email,
          `API Key: ${apiKey}, Client ID: ${clientId}`,
          "Your API Key Request has been approved",
          "API Key and Client Id",
          "Here is your API key and client ID"
        );
      }
    } else {
      apikeyRequest = await APIKeyRequestModel.findById(id);
    }

    res.status(200).json({ apikeyRequest });
  } catch (error) {
    next(error);
  }
};

export default manageAPIkeyStatusController;
