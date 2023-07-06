/**
 * Express application for handling API routes and middleware.
 *
 * @module App
 */

import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import errorHandler from "./middleware/error.middleware";
import AuthenticationRouter from "./routes/Auth";
import NotificationRouter from "./routes/NotificationRouter";
import CourseRouter from "./routes/CourseRouter";
import BannerRouter from "./routes/BannerRouter";
import passportConfig from "./config/passport.config";
import passport from "passport";
import verifyAPIKeyMiddleware from "./middleware/verify.api.key.middleware";
import APIKeyRouter from "./routes/API";
import PermittedRoutesRouter from "./routes/Permitted";

/**
 * Express application instance.
 *
 * @type {express.Application}
 */
const App: Application = express();

/**
 * @function passportConfig - Initialize the passport configuration
 * @param {Object} passport - the passport object
 */
passportConfig(passport);

// Logging middleware
App.use(morgan("dev"));

// express.json middleware for parsing JSON
App.use(express.json());

// express.urlencoded middleware for parsing URL-encoded bodies
App.use(express.urlencoded({ extended: false }));

/**
 * Middleware for setting Access-Control-Allow-Origin and Access-Control-Allow-Headers headers.
 *
 * @name AccessControlMiddleware
 * @function
 * @memberof module:App
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
App.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/**
 * Router for handling api key routes.
 *
 * @type {APIKeyRouter}
 */
App.use("/v1/api", APIKeyRouter);

/**
 * Router for handling admin routes.
 *
 * @type {AuthenticationRouter}
 */
App.use("/v1/auth", AuthenticationRouter);

/**
 * Router for handling notification routes.
 *
 * @type {NotificationRouter}
 */
App.use("/v1/notification", NotificationRouter);

/**
 * Router for handling course routes.
 *
 * @type {CourseRouter}
 */
App.use("/v1/course", CourseRouter);

/**
 * Router for handling banner routes.
 *
 * @type {BannerRouter}
 */
App.use("/v1/banner", BannerRouter);

/**
 * Router for handling permitted routes.
 *
 * @type {Permitted}
 */
App.use("/v1/mkc", verifyAPIKeyMiddleware, PermittedRoutesRouter);

// Write a postman test script for the following route
App.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "Welcome to Admin Panel API" });
  }
);

/**
 * Error handler middleware for handling errors.
 *
 * @name ErrorHandlerMiddleware
 * @function
 * @memberof module:App
 * @param {Error} err - The error object.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
App.use(errorHandler);

export default App;
