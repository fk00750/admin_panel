/**
 * Express router for handling course-related routes.
 *
 * @module CourseRouter
 */

import express from "express";
import {
  CreateCourse,
  DeleteCourse,
  GetCourse,
  GetCourses,
  UpdateCourse,
} from "../../controller";
import passport from "passport";
import verifyRefreshToken from "../../utils/helpers/verify.refreshtoke";

/**
 * Express router instance for course routes.
 *
 * @type {express.Router}
 */
const CourseRouter = express.Router();

/**
 * Route for retrieving a specific course.
 *
 * @name GET /get-course
 * @function
 * @memberof module:CourseRouter
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
CourseRouter.get(
  "/get-course/:id",
  [
    passport.authenticate("jwt-refresh-admin", { session: false }),
    verifyRefreshToken,
  ],
  GetCourse
);

/**
 * Route for retrieving a list of courses.
 *
 * @name GET /get-courses
 * @function
 * @memberof module:CourseRouter
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
CourseRouter.get(
  "/get-courses",
  [
    passport.authenticate("jwt-refresh-admin", { session: false }),
    verifyRefreshToken,
  ],
  GetCourses
);

/**
 * Route for creating a new course.
 *
 * @name POST /create-course
 * @function
 * @memberof module:CourseRouter
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
CourseRouter.post(
  "/create-course",
  [
    passport.authenticate("jwt-refresh-admin", { session: false }),
    verifyRefreshToken,
  ],
  CreateCourse
);

/**
 * Route for updating an existing course.
 *
 * @name PATCH /update-course
 * @function
 * @memberof module:CourseRouter
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
CourseRouter.patch(
  "/update-course/:id",
  [
    passport.authenticate("jwt-refresh-admin", { session: false }),
    verifyRefreshToken,
  ],
  UpdateCourse
);

/**
 * Route for deleting a course.
 *
 * @name DELETE /delete-course
 * @function
 * @memberof module:CourseRouter
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the middleware chain.
 */
CourseRouter.delete(
  "/delete-course/:id",
  [
    passport.authenticate("jwt-refresh-admin", { session: false }),
    verifyRefreshToken,
  ],
  DeleteCourse
);

export default CourseRouter;
