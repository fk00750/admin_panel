import crypto from "crypto";

const generateAPIkeyAndClientId = () => {
  try {
    // api key
    const apiKeyLength = 32; // Change the length as per your requirement
    const apiKey = crypto.randomBytes(apiKeyLength).toString("hex");

    // client id
    const clientIdLength = 16;
    const clientId = crypto.randomBytes(clientIdLength).toString("hex");

    return { apiKey, clientId };
  } catch (error) {
    throw error
  }
};

export default generateAPIkeyAndClientId