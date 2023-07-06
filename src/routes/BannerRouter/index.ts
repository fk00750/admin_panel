/**
 * Express router for handling banner-related routes.
 *
 * @module BannerRouter
 */

import express from "express";
import {
  CreateBanner,
  DeleteBanner,
  GetBanner,
  GetBanners,
  UpdateBanner,
} from "../../controller";
import passport from "passport";
import verifyRefreshToken from "../../utils/helpers/verify.refreshtoke";

/**
 * Express router instance for banner routes.
 *
 * @type {express.Router}
 */
const BannerRouter = express.Router();

/**
 * Route for retrieving a specific banner.
 *
 * @name GET /get-banner
 * @function
 * @memberof module:BannerRouter
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
BannerRouter.get(
  "/get-banner/:id",
  [
    passport.authenticate("jwt-refresh-admin", { session: false }),
    verifyRefreshToken,
  ],
  GetBanner
);

/**
 * Route for retrieving a list of banners.
 *
 * @name GET /get-banners
 * @function
 * @memberof module:BannerRouter
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
BannerRouter.get(
  "/get-banners",
  [
    passport.authenticate("jwt-refresh-admin", { session: false }),
    verifyRefreshToken,
  ],
  GetBanners
);

/**
 * Route for creating a new banner.
 *
 * @name POST /create-banner
 * @function
 * @memberof module:BannerRouter
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
BannerRouter.post(
  "/create-banner",
  [
    passport.authenticate("jwt-refresh-admin", { session: false }),
    verifyRefreshToken,
  ],
  CreateBanner
);

/**
 * Route for updating an existing banner.
 *
 * @name PATCH /update-banner
 * @function
 * @memberof module:BannerRouter
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
BannerRouter.patch(
  "/update-banner/:id",
  [
    passport.authenticate("jwt-refresh-admin", { session: false }),
    verifyRefreshToken,
  ],
  UpdateBanner
);

/**
 * Route for deleting a banner.
 *
 * @name DELETE /delete-banner
 * @function
 * @memberof module:BannerRouter
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
BannerRouter.delete(
  "/delete-banner/:id",
  [
    passport.authenticate("jwt-refresh-admin", { session: false }),
    verifyRefreshToken,
  ],
  DeleteBanner
);

export default BannerRouter;
