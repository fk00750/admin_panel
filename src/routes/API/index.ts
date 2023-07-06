import express from "express";
import { rateLimit } from "express-rate-limit";
import {
  RequestAPIkey,
  getAPIKeyRequests,
  manageAPIkeyStatus,
  verifyAPIKeyOTP,
} from "../../controller";
import passport from "passport";
import verifyRefreshToken from "../../utils/helpers/verify.refreshtoke";

const APIKeyRouter = express.Router();

const RateLimiterFunction = (maxRequest: number = 50) => {
  return rateLimit({
    windowMs: 28 * 60 * 1000, // 28 min
    max: maxRequest,
    message: "Too many requests. Please try again later",
  });
};

APIKeyRouter.post("/request-api-key", RateLimiterFunction(10), RequestAPIkey)
  .post("/verify-api-key-otp", verifyAPIKeyOTP)
  .get(
    "/get-api-key-requests",
    [
      passport.authenticate("jwt-refresh-admin", { session: false }),
      verifyRefreshToken,
    ],
    getAPIKeyRequests
  )
  .patch(
    "/manage-api-key-requests-status/:id",
    [
      passport.authenticate("jwt-refresh-admin", { session: false }),
      verifyRefreshToken,
    ],
    manageAPIkeyStatus
  );
export default APIKeyRouter;
