/**
 * Express router for handling notification-related routes.
 *
 * @module NotificationRouter
 */

import express from "express";
import {
  CreateNotification,
  DeleteNotification,
  GetNotification,
  GetNotifications,
  UpdateNotification,
} from "../../controller";
import passport from "passport";
import verifyRefreshToken from "../../utils/helpers/verify.refreshtoke";

/**
 * Express router instance for notification routes.
 *
 * @type {express.Router}
 */
const NotificationRouter = express.Router();

/**
 * Route for retrieving a specific notification by Id.
 *
 * @name GET /get-notification
 * @function
 * @memberof module:NotificationRouter
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
NotificationRouter.get(
  "/get-notification/:id",
  [
    passport.authenticate("jwt-refresh-admin", { session: false }),
    verifyRefreshToken,
  ],
  GetNotification
);

/**
 * Route for retrieving a list of notifications.
 *
 * @name GET /get-notifications
 * @function
 * @memberof module:NotificationRouter
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
NotificationRouter.get(
  "/get-notifications",
  [
    passport.authenticate("jwt-refresh-admin", { session: false }),
    verifyRefreshToken,
  ],
  GetNotifications
);

/**
 * Route for creating a new notification.
 *
 * @name POST /create-notification
 * @function
 * @memberof module:NotificationRouter
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
NotificationRouter.post(
  "/create-notification",
  [
    passport.authenticate("jwt-refresh-admin", { session: false }),
    verifyRefreshToken,
  ],
  CreateNotification
);

/**
 * Route for updating an existing notification.
 *
 * @name PATCH /update-notification
 * @function
 * @memberof module:NotificationRouter
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
NotificationRouter.patch(
  "/update-notification/:id",
  [
    passport.authenticate("jwt-refresh-admin", { session: false }),
    verifyRefreshToken,
  ],
  UpdateNotification
);

/**
 * Route for deleting a notification by Id.
 *
 * @name DELETE /delete-notification
 * @function
 * @memberof module:NotificationRouter
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
NotificationRouter.delete(
  "/delete-notification/:id",
  [
    passport.authenticate("jwt-refresh-admin", { session: false }),
    verifyRefreshToken,
  ],
   DeleteNotification
);

export default NotificationRouter;
