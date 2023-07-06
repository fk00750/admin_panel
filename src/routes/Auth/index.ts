import express from "express";
import {
  AuthDashboard,
  AuthLogIn,
  AuthLogOut,
  AuthRefreshToken,
  AuthRegister,
  AuthVerifyOTP,
} from "../../controller";
import passport from "passport";
import verifyRefreshToken from "../../utils/helpers/verify.refreshtoke";
import verifyAPIKeyMiddleware from "../../middleware/verify.api.key.middleware";
import rateLimit from "express-rate-limit";

const AdminRouter = express.Router();

const RateLimiterFunction = (maxRequest: number = 50) => {
  return rateLimit({
    windowMs: 28 * 60 * 1000, // 28 min
    max: maxRequest,
    message: "Too many requests. Please try again later",
  });
};

AdminRouter.get(
  "/dashboard",
  passport.authenticate("jwt-access-admin", { session: false }),
  AuthDashboard
)
  .post("/register", AuthRegister)
  .post("/login", RateLimiterFunction(5), AuthLogIn)
  .post(
    "/logout",
    [
      passport.authenticate("jwt-refresh-admin", { session: false }),
      verifyRefreshToken,
    ],
    AuthLogOut
  )
  .post("/verify-otp", AuthVerifyOTP)
  .get(
    "/refresh",
    [
      passport.authenticate("jwt-refresh-admin", { session: false }),
      verifyRefreshToken,
    ],
    AuthRefreshToken
  );

export default AdminRouter;
