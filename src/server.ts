import { config } from "dotenv";
config({ path: ".env" });
import App from "./app";
import connectDatabase from "./config/config.database";
import CustomErrorHandler from "./utils/ErrorHandler/custom.errorHandler";

const PORT: any = process.env.PORT || 5000;

/*
 * @async
 * @function startServer - This function starts the server and listens to the specified port and also connects to the database
 * @throws {CustomErrorHandler} If there is an error starting the server.
 */
async function startServer() {
  try {
    App.listen(PORT, async () => {
      await connectDatabase(PORT);
    });
  } catch (error) {
    console.log(`Error Message in Server: ${error.message}`);
    CustomErrorHandler.serverError(error.message);
  }
}

startServer();
